<template>
    <div style="width: 100%">
        <!-- https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events -->
        <textarea
            :value="value"
            placeholder="Config Data"
            @input="setContext($event.target.value)"
            @keydown.tab.prevent="indent"
        ></textarea>
    </div>
</template>

<script>
export default{
    props: {
        value: String,
    },
    methods: {
        indent(e) {
            const indent_text = "    ";
            console.log(e.target.selectionStart);
            const start = e.target.selectionStart;
            this.setContext(
                this.value.slice(0, start) +
                indent_text +
                this.value.slice(start)
            );
            this.$nextTick(() => {
                e.target.selectionStart = e.target.selectionEnd = start+indent_text.length;
            });
        },
        setContext(new_value) {
            this.$emit('input', new_value);
        },
    },
}
</script>

<style>
textarea {
    width: 100%;
    height: 80%;
    min-height: 450px;
    resize: none;
    font-size: 20px;
    text-rendering: optimizeSpeed;
}
</style>
