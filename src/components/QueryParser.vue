<template>
    <div>
        <h1>Query Parser Component</h1>
    </div>
</template>

<script>
    export default {
        // data() {
        //     return {
        //         params: this.$route.params
        //     }
        // },
        created: function() {
            console.log(this.$route.query)
        }
    }
</script>

