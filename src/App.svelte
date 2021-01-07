<script>
    import {db} from "./firebase";
    import toastr from 'toastr'

    let task = {
        name: "",
        description: ""
    };

    let tasks = [];
    let editStatus = false;
    let currentId;

    db.collection('tasks').onSnapshot(querySnapshot => {
        let docs = [];
        querySnapshot.forEach(doc => {
            docs.push({...doc.data(), id: doc.id})
        })
        tasks = [...docs]
    });

    const addTask = async () => {
        await db.collection('tasks').doc().set({
            ...task, createdAt: Date.now()
        });
        toastr.success('Criado com sucesso!', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!editStatus){
            addTask();
        }
        else{
            updateTask();
        }

        task = {name: '', description: ''};

    };

    const updateTask = async() => {
        await db.collection('tasks').doc(currentId).update(task);
        toastr.success('Atualizado com sucesso!', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        })
    }

    const deleteTask = async(id) => {
        await db.collection('tasks').doc(id).delete();
        toastr.success('Removido com sucesso!', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        })
    }

    const editTask = (currentTask) => {
        editStatus = true;
        task.name = currentTask.name;
        task.description = currentTask.description;
        currentId = currentTask.id;
    }

    const onCancel = () => {
        editStatus = false;
        task = {name: '', description: ''}
    }
</script>

<form on:submit="{handleSubmit}" class="card card-body">
    <div class="form-group">
        <input bind:value={task.name} type="text" placeholder="Nome" class="form-control">
    </div>
    <div class="form-group">
        <textarea bind:value={task.description} rows="3" placeholder="Descrição" class="form-control"></textarea>
    </div>
    <button class="btn btn-primary">
        {#if editStatus}Salvar{:else}Criar{/if}
    </button>
    {#if editStatus}
        <button on:click={onCancel} class="btn btn-info">Cancelar</button>
    {/if}
</form>

{#each tasks as task}
    <div class="card card-body mt-2">
    <div class="d-flex justify-content-between">
        <h5>{task.name}</h5>
        <i class="material-icons" on:click={editTask(task)} style="vertical-align: middle">edit</i>
    </div>
        <p>{task.description}</p>
        <button on:click={deleteTask(task.id)} class="btn btn-danger" style="vertical-align: middle;"><i class="material-icons">delete_forever</i></button>
    </div>
{/each}

<style>
</style>