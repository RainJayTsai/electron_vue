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
    function getCursortPosition(textDom) {
        var cursorPos = 0;
        if (document.selection) {
            // IE Support
            textDom.focus();
            var selectRange = document.selection.createRange();
            selectRange.moveStart('character', -textDom.value.length);
            cursorPos = selectRange.text.length;
        } else if (textDom.selectionStart || textDom.selectionStart == '0') {
            // Firefox support
            cursorPos = textDom.selectionStart;
        }
        return cursorPos;
    }

    function setCaretPosition(textDom, pos) {
        if (textDom.setSelectionRange) {
            // IE Support
            textDom.focus();
            textDom.setSelectionRange(pos, pos);
        } else if (textDom.createTextRange) {
            // Firefox support
            var range = textDom.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    function getSelectText() {
        var userSelection, text;
        if (window.getSelection) {
            // Firefox support
            userSelection = window.getSelection();
        } else if (document.selection) {
            // IE Support
            userSelection = document.selection.createRange();
        }
        if (!(text = userSelection.text)) {
            text = userSelection;
        }
        return text;
    }
    function insertAfterText(textDom, value) {
        var selectRange;
        if (document.selection) {
            // IE Support
            textDom.focus();
            selectRange = document.selection.createRange();
            selectRange.text = value;
            textDom.focus();
        } else if (textDom.selectionStart || textDom.selectionStart == '0') {
            // Firefox support
            var startPos = textDom.selectionStart;
            var endPos = textDom.selectionEnd;
            var scrollTop = textDom.scrollTop;
            textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
            textDom.focus();
            textDom.selectionStart = startPos + value.length;
            textDom.selectionEnd = startPos + value.length;
            textDom.scrollTop = scrollTop;
        } else {
            textDom.value += value;
            textDom.focus();
        }
    }
    function insertContent(val, that) {
        let textareaDom = document.querySelector('.mdEditor');
        let value = textareaDom.value;
        console.log(value)
        let point = getCursortPosition(textareaDom);
        let lastChart = value.substring(point - 1, point);
        let lastFourCharts = value.substring(point - 4, point);
        insertAfterText(textareaDom, val);
        that.context = document.querySelector('.mdEditor').value  ;
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
                insertContent("    ",this);
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
        width: 600px;
        height: 80%;
        min-height: 450px;
        resize: none;
        font-size: 20px;
        text-rendering: optimizeSpeed;
    }
</style>
