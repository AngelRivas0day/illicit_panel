<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar el lente con todos sus diseños?"
            md-content="Al eliminar este lente con todos sus diseños, estos no podrán ser recuperados posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
            @md-cancel="onCancel"
            @md-confirm="deleteGlass(attemptDeleteItem.id)"
        >
        </md-dialog-confirm>
        <div class="card">
            <div class="card-header">
                <h1 class="title">Lentes</h1>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <md-button @click="create()" class="md-primary md-raised md-dense" type="default">
                            <i class="tim-icons icon-simple-add"></i>
                            Agregar lente
                        </md-button>
                    </div>
                    <!-- <div class="col-12">
                        <el-input v-model="filters[0].value"></el-input>
                    </div> -->
                    <div class="col-12 mt-4">
                        <data-tables-server :filters="filters" :data="glasses" :total="total" :pagination-props="{ pageSizes: [5, 10, 15] }">
                            <el-table-column label="Imagen" min-width="60px">
                                <template slot-scope="scope">
                                    <img :src="scope.row.designs.length > 0 ? scope.row.designs[0].mainImage : 'https://source.unsplash.com/200x200?empty,nothing'" class="table-image">
                                </template>
                            </el-table-column>
                            <el-table-column :key="t.prop" v-for="t in titles" :prop="t.prop" :label="t.label">
                            </el-table-column>
                            <el-table-column label="Diseños disponibles" min-width="100px">
                                <template slot-scope="scope">
                                    <div class="text-center w-100">{{ (scope.row.designs).length }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="Actions" min-width="100px">
                                <template slot-scope="scope">
                                    <md-button @click="openGlass(scope.row.id)" class="md-primary md-raised">Editar</md-button>
                                    <md-button @click="attemptDelete(scope.row)" class="md-accent md-raised">Eliminar</md-button>
                                </template>
                            </el-table-column>
                        </data-tables-server>
                    </div>
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
            }
        ],
        filters: [{
            value: '',
            'search_prop': 'name' // define search_prop for backend usage.
        }],
        isDeleting: false,
        attemptDeleteItem: null
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
        },
        deleteGlass(id){
            store.dispatch('editor/deleteGlass', id, {root:true})
                .then(resp=>{
                    this.getData()
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'El lente ha sido eliminado con éxito',
                        type: 'success'
                    });
                })
                .catch(err=>{
                    console.log(err)
                    this.$notify({
                        verticalAlign: 'top',
                        horizontalAlign: 'right',
                        message: 'El lente no ha sido eliminado debido a un error',
                        type: 'warning'
                    });
                })
        },
        attemptDelete(glass){
            this.attemptDeleteItem = glass
            this.isDeleting = true
        },
        onCancel(){
            this.$notify({
                verticalAlign: 'top',
                horizontalAlign: 'right',
                message: 'El lente no ha sido eliminado por acción del usuario',
                type: 'warning'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.card{
    .table-image{
        width: 160px;
        height: 200px;
        object-fit: contain;
    }
}
</style>