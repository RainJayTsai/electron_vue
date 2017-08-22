<template>
    <div style="margin: 10%">
        <!-- https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events -->
        <Editor v-model="yaml"></Editor>
        <!--<div style="white-space: pre">{{context}}</div>-->
        <FileInput v-show="flow_id == 1" @submit="doSubmit" @get_default_yaml="doDefaultYaml"></FileInput>
        <div v-show="flow_id == 2" class="pbar-background">
            <div class="pbar-finish" :style="{width: progress+'%'}">
                {{progress}}% Complete
            </div>
        </div>
    </div>
</template>

<script>
import Editor from 'components/Editor'
import FileInput from 'components/FileInput'
//import dialog from 'electron'
//  import rename from 'fs'
//http://stackoverflow.com/questions/37994441/how-to-use-fs-module-inside-electron-atom-webpack-application
const {dialog} = require('electron').remote
var remote = require('electron').remote;
//  var fs = remote.require('fs');
var fs = require('fs-extra')

export default{
    data() {
        return {
            yaml: 'name: ',
            flow_id: 1,
            progress: 0,
        }
    },
    components: {
        Editor,
        FileInput
    },
    methods: {
        doSubmit(file_path, has_header) {
            {
                this.progress = 0;
                this.flow_id = 2;
                this.$http.post(
                    'http://127.0.0.1:8787/api',
                    {yaml: this.yaml, file_path, has_header}
                ).then(response => {
                    // get body data
                    console.log(response.body.file_path);
                    dialog.showSaveDialog({
                        title: 'Save to location'
                    }, (dstpath) => {
                        fs.move(response.body.file_path, dstpath, { overwrite: true }, () => {
                            console.log('OK');
                            this.flow_id = 1;
                        });
                    });

                }, response => {
                    // error callback
                    this.flow_id = 1;
                    console.assert(false, "Server response failed");
                });

                const PollingProgress = ()=>{
                    this.$http.get('http://127.0.0.1:8787/progress')
                    .then(response => {
                        this.progress = parseFloat(response.body);
                        if(this.flow_id == 2) {
                            PollingProgress();
                        }
                    });
                };

                PollingProgress();
            }
        },
        doDefaultYaml(file_path){
            this.$http.post('http://127.0.0.1:8787/get_default', {file_path}).then(response => {
                console.log('response.body.default_yaml');
                console.log(response.body.default_yaml);
                this.yaml = response.body.default_yaml;
            }, response => {
                console.assert(false, "Server response failed");
            });

        },
    }
}
</script>

<style>
.div-center {
    margin: 0 auto;
}
.div-float {
    display: inline-block;
}
.pbar-background {
    height: 2em;
    width: 100%;
    box-shadow: inset 0 0.2em 0.4em rgba(0,0,0,.1);
    background-color: #f5f5f5;
    border-radius: 0.2em;

}
.pbar-finish {
    height: 100%;
    padding: 0.2em;
    background: limegreen;
    border-radius: 0.2em;
    text-align: center;
}
</style>
