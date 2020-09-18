<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar el lente con todos sus diseños?"
            md-content="Al eliminar este lente con todos sus diseños, estos no podrán ser recuperados posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
            @md-cancel="onCancel('lente')"
            @md-confirm="onAccept(deleteGlass)"
        >
        </md-dialog-confirm>
        <div class="card">
            <div class="card-header">
                <h1 class="title">Lentes</h1>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <md-button @click="goTo('Create-Lense')" class="md-primary md-raised md-dense" type="default">
                            <i class="tim-icons icon-simple-add"></i>
                            Agregar lente
                        </md-button>
                    </div>
                    <div class="col-12 mt-4">
                        <el-input v-model="filters[0].value"></el-input>
                    </div>
                    <div class="col-12 mt-2">
                        <data-tables-server :filters="filters" :loading="loading" :data="glasses" :pagination-props="{ pageSizes: [5, 10, 15] }" @query-change="loadData">
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
                                    <md-button @click="openItem('Edit-Lense',scope.row.id)" class="md-primary md-raised">Editar</md-button>
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
import { mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import attemptDelete from '@/mixins/attemptDelete'
import goTo from '@/mixins/goTo'
import store from '@/store'

export default {
    name: 'Leneses',
    mixins: [attemptDelete,goTo],
    computed:{
        ...mapState('glasses',{
            loading: 'isLoading',
            glasses: 'glasses'
        }),
        ...mapFields('glasses',{
            searchPatter: 'searchPatter',
            error: 'error'
        })
    },
    data: ()=>({
        titles: [
            {
                prop: "name",
                label: "Nombre modelo"
            }
        ],
        filters: [{
            value: '',
            'search_prop': 'name' // define search_prop for backend usage.
        }]
    }),
    async mounted(){
        try {
            await this.getData()
        } catch (error) {
            console.log(error)
            this.error = error
        }
    },
    destroyed(){
        store.dispatch('loading/notLoading',null,{root:true})
    },
    methods: {
        ...mapActions('glasses',{
            getData: 'getGlasses',
            delete: 'deleteGlass'
        }),
        async deleteGlass(){
            try {
                await this.delete(this.itemToDelete.id)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El lente ha sido eliminado con éxito',
                    type: 'success'
                });
                await this.getData()
            } catch (error) {
                console.log(error)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El lente no ha sido eliminado debido a un error',
                    type: 'warning'
                });
            }
        },
        loadData(queryInfo){
            queryInfo.type === 'filter'
            this.searchPatter = queryInfo.filters[0].value
            console.log(this.searchPatter)
            this.getData()
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