<template>
    <div class="card">
        <div class="card-header">
            <h1 class="title">Lentes</h1>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <base-button @click="create()" class="animation-on-hover" type="default">
                        <i class="tim-icons icon-simple-add"></i>
                        Agregar lente
                    </base-button>
                </div>
                <div class="col-12">
                    <md-button @click="openGlass(g.id)" :key="g.id" v-for="g in glasses">
                        Lente con el id {{g.id}}
                    </md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGlasses } from '@/api/glasses'
import store from '@/store'

export default {
    name: 'Leneses',
    data: ()=>({
        title: 'Lenses',
        start: 1,
        limit: 20,
        glasses: []
    }),
    mounted(){
        this.getData()
    },
    methods: {
        create(){
            this.$router.push({name: 'Create-Lense'});
        },
        getData(){
            store.dispatch('loading/isLoading',null,{root:true})
            getGlasses(this.start, this.limit)
                .then(resp=>{
                    console.log(resp)
                    this.glasses = resp.data
                })
                .catch(err=>{
                    console.log(err)
                })
                .finally(()=>{
                    store.dispatch('loading/notLoading',null,{root:true})
                })
        },
        openGlass(id){
            this.$router.push({name: 'Edit-Lense', params: {id: id}})
        }
    }
}
</script>

<style>

</style>