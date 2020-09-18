<template>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="g in glasses" :key="g.id" @click="onProductSelect(g)">
            <md-card class="product-card">
                <md-card-media>
                    <img :src="g.designs[0].mainImage" />
                </md-card-media>
                <md-card-content>
                    {{g.name}}
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ProductSelector',
    computed: {
        ...mapState('glasses',{
            glasses: 'glasses'
        })
    },
    async mounted(){
        try {
            await this.getGlasses()
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        ...mapActions('glasses', {
           getGlasses: 'getGlasses' 
        }),
        onProductSelect(product){
            this.$emit('product-selected', product)
        }
    }
}
</script>

<style lang="scss" scoped>
.product-card{
    transition: all .3s;
    position: relative;
    cursor: pointer;
    &:hover{
        transform: scale(1.05);
    }
}
</style>