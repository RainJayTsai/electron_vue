<template>
    <div>
        <form @submit.prevent="onSubmit">
        <input type="file" name="points" @change="onFileChange"/>
        <div>You Select File is <input type="text" v-model="file_path"></div>
        <div><span class="has-header">Has csv header: <input type=checkbox v-model="has_header"></span><input type=submit value="Submit"></div>
        </form>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                file_path: "",
                has_header: false
            }
        },
        methods:{
            onFileChange(e){
                this.file_path = e.target.files[0].path;
            },
            onSubmit(e){
                this.$emit('submit', this.file_path, this.has_header);
            }
        }
    }
</script>

<style>
.has-header
{
    margin: 1em;
}
</style>
