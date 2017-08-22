<template>
    <div style="position: relative; margin: 0 auto;">
        <form @submit.prevent="onSubmit" class="form-group">
            <div style="position:absolute; left: 0; top: 0;padding: 0.375rem">
                <input type="file" name="points" @change="onFileChange"/>
            </div>
            <div style="position:absolute; right: 0; top: 0;">
                <div class="div-float" style="padding: 0 1em;">
                    Has csv header: 
                    <input type=checkbox v-model="has_header">
                </div>
                <input class="btn btn-success" type=submit value="Default">
                <input class="btn btn-primary" type=submit value="Submit">
            </div>
        </form>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                file_path: "",
                has_header: false,
                progress: 0,
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
</style>
