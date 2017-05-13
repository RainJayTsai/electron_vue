<template>
    <div class="container">
    <textarea v-model="context"
              placeholder="Config Data"
              @keydown.tab="indent"
              @keydown.tab.prevent>
    </textarea>
    </div>
    <!--<div @keyup.right="test">-->
    <!--<vue-editor :v-model="raw_data"></vue-editor>-->
    <!--</div>-->
</template>

<script>
    export default{
        data(){
            return {
                context: "name: "
            }
        },
        props: {
            raw_data: String
        },
        methods: {
            indent(e) {
                this.context = this.context.slice(0, e.srcElement.selectionEnd) +
                    '    ' + this.context.slice(e.srcElement.selectionEnd)
            }
        },
        watch: {
            'context': function () {
                this.$emit('input', this.context);
            }
        },
        catread(){
            this.context = this.raw_data
        }
    }
</script>

<style>
    textarea {
        width: 80%;
        max-width: 400px;
        height: 80%;
        min-height: 450px;
        resize: none;
        font-size: 20px;
        text-rendering: optimizeSpeed;
    }
</style>
