<template>
    <div>
        <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar el banner?"
            md-content="Al eliminar este banner, este no podrá ser recuperado posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
            @md-cancel="onCancel('banner')"
            @md-confirm="onAccept(onDelete)"
        />
        <div class="card banners">
            <div class="card-header">
                <h1 class="title">Banners</h1>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <md-button @click="goTo('Create-Banner')" class="md-primary md-raised md-dense" type="default">
                            <i class="tim-icons icon-simple-add"></i>
                            Agregar banner
                        </md-button>
                    </div>
                     <div class="col-12 mt-4">
                        <data-tables-server :loading="isLoading" :filters="filters" :data="banners" :total="total" :pagination-props="{ pageSizes: [5, 10, 15] }">
                            <el-table-column label="Imagen" min-width="60px">
                                <template slot-scope="scope">
                                    <img :src="scope.row.image ? scope.row.image : 'https://source.unsplash.com/200x200?empty,nothing'" class="table-image">
                                </template>
                            </el-table-column>
                            <el-table-column :key="t.prop" v-for="t in titles" :prop="t.prop" :label="t.label">
                            </el-table-column>
                            <el-table-column label="Actions" min-width="100px">
                                <template slot-scope="scope">
                                    <md-button class="md-primary md-raised">Vista previa</md-button>
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
import store from '@/store'
import { mapState, mapActions } from 'vuex'
import attemptDelete from '@/mixins/attemptDelete'
import goTo from '@/mixins/goTo'

export default {
    name: 'Banners',
    mixins: [attemptDelete, goTo],
    async mounted(){
        try {
            await this.getItems()
        } catch (error) {
            console.log(error)
        }
    },
    data: () => ({
        titles: [
            {
                prop: "title",
                label: "Titulo del banner"
            },
            {
                prop: "buttonText",
                label: "Texto del boton"
            },
            {
                prop: "buttonUrl",
                label: "Enlace del boton"
            }
        ],
        filters: [{
            value: '',
            'search_prop': 'name' // define search_prop for backend usage.
        }]
    }),
    computed: {
        ...mapState('banners', {
            banners: 'banners',
            isLoading: 'isLoading'
        }),
        total(){
            return this.banners.length
        }
    },
    methods: {
        ...mapActions('banners',{
            getItems: 'getItems',
            deleteItem: 'deleteItem'
        }),
        async onDelete(){
            try {
                await this.deleteItem(this.itemToDelete.id)
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El lente ha sido eliminado con éxito',
                    type: 'success'
                });
                await this.getItems()
            } catch {
                this.$notify({
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    message: 'El lente no ha sido eliminado debido a un error',
                    type: 'warning'
                });
            }
        }
    }
}
</script>

<style>

</style>