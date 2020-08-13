<template>
    <div class="card">
        <div class="card-header">
            <h1 class="title">Pins</h1>
        </div>
        <div class="card-body">
            <EditForm />
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm'

export default {
    name: 'CreatePin',
    components: {
        EditForm
    }
}
</script>

<style>

</style>