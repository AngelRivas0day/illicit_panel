<template>
    <div>
        <div class="banners">
            <div class="card-header">
                <h1 class="title">Ofertas</h1>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <md-button @click="goTo('Create-Offer')" class="md-primary md-raised md-dense" type="default">
                            <i class="tim-icons icon-simple-add"></i>
                            Agregar oferta
                        </md-button>
                    </div>
                    <!-- <div v-id="total" class="col-12 mt-4">
                        <data-tables-server :filters="filters" :loading="isLoading" :data="offers" :total="total" :pagination-props="{ pageSizes: [5, 10, 15] }">
                            <el-table-column label="Imagen" min-width="60px">
                                <template slot-scope="scope">
                                    <img :src="scope.row.image ? scope.row.image : 'https://source.unsplash.com/200x200?empty,nothing'" class="table-image">
                                </template>
                            </el-table-column>
                            <el-table-column :key="t.prop" v-for="t in titles" :prop="t.prop" :label="t.label">
                            </el-table-column>
                            <el-table-column label="Actions" min-width="100px">
                                <template slot-scope="scope">
                                    <md-button @click="attemptDelete(scope.row)" class="md-accent md-raised">Eliminar</md-button>
                                </template>
                            </el-table-column>
                        </data-tables-server>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import attemptDelete from '@/mixins/attemptDelete'
import goTo from '@/mixins/goTo'

export default {
    name: 'Offers',
    mixins: [attemptDelete, goTo],
    computed: {
        ...mapState('offers',{
            offers: 'offers',
            isLoading: 'isLoading'
        }),
        total(){
            return null
        }
    },
    mounted(){
        // this.getOffers()
    },
    data: () => ({
        titles: [],
        filters: [{
            value: '',
            'search_prop': 'name' // define search_prop for backend usage.
        }]
    }),
    methods: {
        ...mapActions('offers',{
            getOffers: 'getOffers'
        })
    }
}
</script>

<style>

</style>