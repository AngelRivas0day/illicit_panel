<template>
    <div class="loading-component">
        <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
</template>

<script>
export default {
    name: 'BaseLoading'
}
</script>

<style lang="scss">
@import '@/assets/css/_vars';

.loading-component{
    position: absolute;
    z-index: 999;
    height: 100vH;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 0;
}
</style>