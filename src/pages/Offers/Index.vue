<template>
    <div>
        <!-- <md-dialog-confirm
            :md-active.sync="isDeleting"
            md-title="¿Deseas eliminar la oferta?"
            md-content="Al eliminar este banner, este no podrá ser recuperado posteriormente. <br>Consulta con tu persona a cargo está opción."
            md-confirm-text="Borrar"
            md-cancel-text="Cancelar"
        /> -->
        <div class="card">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'OffersLayout',
}
</script>

<style lang="scss" scoped>

</style>