<template>
    <div class="card edit-banner">
        <div class="card-header">
            <h1 class="title">Banner</h1>
        </div>
        <div class="card-body">
            <EditForm />
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm'
export default {
    name: 'EditBanner',
    components: { EditForm }
}
</script>

<style>

</style>