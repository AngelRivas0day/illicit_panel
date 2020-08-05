<template>
    <div class="design-card row">
        <div class="col-xs-12 col-sm-12 col-md-6">
            <md-field>
                <label>Nombre del estilo</label>
                <md-input disabled v-model="design.color.name"></md-input>
            </md-field>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 text-left">
            <div class="color-sample" :style="'background-color:' + design.color.hex + ';'" >
                <span>{{ design.color.hex }}</span>
            </div>
        </div>
        <div v-for="url in design.images" :key="url" class="col-xs-12 col-sm-6 col-md-4 design-images">
            <img :src="url" alt="" />
        </div>
        <div class="col-12 text-right">
            <md-button @click="deleteDesign(design.color.name)" class="md-dense md-raised md-accent mx-0 mt-3">
                Eliminar estilo
            </md-button>
        </div>
    </div>
</template>

<script>
export default {
  name: "DesignCard",
  props: {
    design: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteDesign(id) {
      console.log("deleted design with id: ", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.design-card{
    .color-sample{
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
        @media #{$break-medium}{
            height: 70%;
            margin-bottom: 0px;
        }
        span{
            color: white;
            font-weight: bold;
        }
    }
    .design-images{
        margin-bottom: 25px;
        @media #{$break-medium}{
            margin-bottom: 0px;
        }
        &:last-of-type{
            margin-bottom: 0px !important;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
