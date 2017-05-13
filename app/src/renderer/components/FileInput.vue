<template>
    <div>
        <input type="file" name="points" @change="onFileChange"/>
        <p>You Select File is <input type="text" v-model="file_path"></p>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                file_path: ""
            }
        },
        methods:{
            onFileChange(e){
                this.file_path = e.target.value
            }
        }
    }
</script>

<style>

</style>
