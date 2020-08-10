export default {
    data: () => ({
        isDeleting: false,
        itemToDelete: {}
    }),
    methods: {
        attemptDelete(item){
            this.isDeleting = true
            this.itemToDelete = item
        },
        onCancel(itemType){
            this.isDeleting = false
            this.itemToDelete = {}
            this.$notify({
                verticalAlign: 'top',
                horizontalAlign: 'right',
                message: `El ${itemType} no ha sido eliminado por acción del usuario`,
                type: 'warning'
            });
        },
        onAccept(callback){
            this.isDeleting = false
            callback()
        }
    }
}