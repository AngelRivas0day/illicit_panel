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
                    <table></table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Leneses',
    data: ()=>({
        title: 'Lenses'
    }),
    methods: {
        create(){
            this.$router.push({name: 'Create-Lense'});
        }
    }
}
</script>

<style>

</style>