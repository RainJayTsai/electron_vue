<template>
    <div class="container">
    <!--https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component-->
    <textarea class="mdEditor"
              v-model="context"
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
    function insertContent(val, that) {
        let textareaDom = document.querySelector('.mdEditor');
        let value = textareaDom.value;
        let point = range.getCursortPosition(textareaDom);
        let lastChart = value.substring(point - 1, point);
        let lastFourCharts = value.substring(point - 4, point);
        if (lastChart != '\n' && value != '' && lastFourCharts != '    ') {
            val = '\n' + val;
            range.insertAfterText(textareaDom, val);
        } else {
            range.insertAfterText(textareaDom, val);
        }
        that.input = document.querySelector('.mdEditor').value;
    }
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
//                this.context = this.context.slice(0, e.srcElement.selectionStart) +
//                    '    ' + this.context.slice(e.srcElement.selectionStart);
//
//                e.srcElement.selectionEnd = 0;
                insertContent("    ",this)
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
