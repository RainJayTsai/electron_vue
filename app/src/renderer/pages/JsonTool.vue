<template>
  <div>
    <Editor v-model="yaml"></Editor>
    <!--<div style="white-space: pre">{{context}}</div>-->
    <FileInput v-on:submit="doSubmit"></FileInput>
  </div>
</template>

<script>
  import Editor from 'components/Editor'
  import FileInput from 'components/FileInput'
  //import dialog from 'electron'
  import rename from 'fs'
  const {dialog} = require('electron').remote

  export default{
    data() {
      return {
        yaml: "test yaml"
      }
    },
    components: {
      Editor,
      FileInput
    },
    methods: {
        doSubmit(file_path, has_header) {
            {
                this.$http.post('http://98e5945f.ngrok.io', {yaml: this.yaml, file_path, has_header}).then(response => {
                // get body data
                console.log(response.body.file_path);
                dialog.showSaveDialog({
                    title: 'Save to location'
                }, (dstpath) => {
                    rename(file_path, dstpath, () => {
                        console.log('OK');
                    });
                });

              }, response => {
                // error callback
                console.assert(false, "Server response failed");
              });
            }
        }
    }
  }
</script>

<style>
</style>
