export default {
    methods: {
        openItem(pageName, id){
            this.$router.push({name: pageName, params: {id}})
        },
        goTo(pageName){
            this.$router.push({name: pageName})
        }
    }
}