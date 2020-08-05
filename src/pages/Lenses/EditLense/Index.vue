<template>
    <div class="card">
        <div class="card-header">
            <h1 class="title">Lentes</h1>
        </div>
        <div class="card-body">
            <EditForm />
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm'
import { getGlass } from '@/api/glasses'

export default {
    name: 'EditLense',
    components: {EditForm},
    beforeMount(){
        // obtenemos el parametro de la ruta si es que viene uno
        // si no viene uno entonces el formulario se queda para crear
        // un lente en lugar de editar uno
        if(this.$route.params.id){
            this.itemId = this.$route.params.id;
            console.log("Id: ", this.itemId)
            this.getData()
        }
    },
    data: () => ({
        itemId: null
    }),
    methods: {
        getData(){
            getGlass(this.itemId)
                .then(resp=>{
                    console.log(resp)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>