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
  //http://stackoverflow.com/questions/37994441/how-to-use-fs-module-inside-electron-atom-webpack-application
  const {dialog} = require('electron').remote
  var remote = require('electron').remote;
  var fs = remote.require('fs');

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
                this.$http.post('http://127.0.0.1:8787/api', {yaml: this.yaml, file_path, has_header}).then(response => {
                // get body data
                console.log(response.body.file_path);
                dialog.showSaveDialog({
                    title: 'Save to location'
                }, (dstpath) => {
                    fs.rename(response.body.file_path, dstpath, () => {
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
