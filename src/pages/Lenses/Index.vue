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
                    <el-input v-model="filters[0].value"></el-input>
                </div>
                <div class="col-12 mt-4">
                    <data-tables-server :filters="filters" :data="glasses" :total="total" :loading="loading" :pagination-props="{ pageSizes: [5, 10, 15] }">
                        <el-table-column label="Actions" min-width="100px">
                            <template slot-scope="scope">
                                <img :src="scope.row.designs.length > 0 ? scope.row.designs[0].image : 'https://source.unsplash.com/40x40'" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column :key="t.prop" v-for="t in titles" :prop="t.prop" :label="t.label">
                        </el-table-column>
                        <el-table-column label="Actions" min-width="100px">
                            <template slot-scope="scope">
                                <md-button @click="openGlass(scope.row.id)" class="md-primary md-raised">Editar</md-button>
                                <md-button @click="openGlass(scope.row.id)" class="md-accent md-raised">Eliminar</md-button>
                            </template>
                        </el-table-column>
                    </data-tables-server>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGlasses } from '@/api/glasses'
import store from '@/store'
import { mapState } from 'vuex'

export default {
    name: 'Leneses',
    computed:{
        total(){
            return this.glasses.length
        },
        ...mapState('editor',{
            loading: 'isLoading'
        })
    },
    data: ()=>({
        title: 'Lenses',
        start: 1,
        limit: 20,
        glasses: [],
        titles: [
            {
                prop: "name",
                label: "Nombre modelo"
            }, 
            {
                prop: "description",
                label: "Desc."
            }
        ],
        filters: [{
            value: '',
            'search_prop': 'name' // define search_prop for backend usage.
        }]
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