<template>
    <div class="container">
    <!--https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component-->
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
//                _context: this.context
            }
        },
        props: {
            context: String
        },
        methods: {
            indent(e) {
                this.context = this.context.slice(0, e.srcElement.selectionStart) +
                    '    ' + this.context.slice(e.srcElement.selectionStart);

                e.srcElement.selectionEnd = 0;
            }
        },
        watch: {
            'context': function () {
                this.$emit('context_changed', this.context);
            }
        },
        created(){

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
