<template>
    <div>
        <form @submit.prevent="onSubmit">

            <input type="file" name="points" @change="onFileChange" class="custom-file-input"/>
            <!--<div>You Select File is <input type="text" v-model="file_path"></div>-->
            <div>
                <span class="has-header" style="font-size: 20px">Has csv header:
                    <input type=checkbox v-model="has_header">
                </span>
                <!--<input class="btn btn-success" type=submit value="Default">-->
                <!--<input class="btn btn-primary" type=submit value="Submit">-->
                <input type=submit value="Default">
                <input type=submit value="Submit">
            </div>
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
                console.log(e);
                if(document.activeElement.value == "Default"){
                    this.$emit('get_default_yaml',this.file_path);
                }else{
                    this.$emit('submit', this.file_path, this.has_header);
                }
            }
        }
    }
</script>

<style>
.has-header {
    margin: 1em;
}
</style>
