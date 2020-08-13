<template>
    <div class="card">
        <div class="card-header">
            <h1 class="title">Lentes</h1>
        </div>
        <div class="card-body">
            <EditForm />
            <!-- La info le llega al  componente por Vuex -->
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'EditLense',
    components: {EditForm},
    mounted(){
        // obtenemos el parametro de la ruta si es que viene uno
        // si no viene uno entonces el formulario se queda para crear
        // un lente en lugar de editar uno
        if(this.$route.params.id){
            this.itemId = this.$route.params.id;
            console.log("Id: ", this.itemId)
            this.getGlass(this.itemId)
        }
    },
    computed: {
        ...mapState('glasses',{
            glass: 'glass'
        })
    },
    data: () => ({
        itemId: null,
    }),
    methods: {
        ...mapActions('glasses',{
            getGlass: 'getGlass'
        })
    }
}
</script>

<style>

</style>