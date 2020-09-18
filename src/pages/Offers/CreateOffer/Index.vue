<template>
    <div class="offers">
        <div class="card-header">
            <h1 class="title">Nueva Oferta</h1>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <EditForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditForm from '../EditForm'
import { mapActions } from 'vuex'

export default {
    name: 'CreateOffer',
    components: {
        EditForm
    },
    destroyed(){
        this.resetData()
    },
    methods: {
        ...mapActions('offers',{
            resetData: 'resetData'
        })
    }
}
</script>

<style>

</style>