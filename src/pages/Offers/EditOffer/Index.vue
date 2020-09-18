<template>
    <div class="offers">
        <div class="card-header">
            <h1 class="title">Editar Oferta</h1>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <EditForm mode="create" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditForm from '../EditForm'
import { mapActions } from 'vuex'
export default {
    name: 'EditOffer',
    components: {
        EditForm
    },
    async mounted(){
        try {
            await this.getOffer(this.$route.params.id)
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        ...mapActions('offers',{
            getOffer: 'getOffer'
        })
    }
}
</script>

<style>

</style>