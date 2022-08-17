<template>
    <div class="aside">
        <div class="elements" v-for="(i, index) in elements" :key="index" @mousedown="e => { mousedown(i, e) }">{{
                i.type
        }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { dragElements } from "./dragType"
import { Ref, ref } from "vue"

const emit = defineEmits<{
    (event: 'onChooseElement', ele: dragElements): void
}>()
const elementList: Array<dragElements> = [
    {
        type: "div",
        text: "",
        style: {
            top: '0px',
            left: '0px',
            background: ''
        }
    },
    {
        type: "div", text: "", style: {
            top: '0px',
            left: '0px',
            background: '#fff'
        }
    }

]
const elements: Ref<Array<dragElements>> = ref(elementList)

//新增元素
function mousedown(el: dragElements, ev: MouseEvent) {

    el.style.left = ev.x.toString() + "px"
    el.style.top = ev.y.toString() + "px"
    emit('onChooseElement', el)

}
</script>
<style lang="scss" scoped>
.aside {
    padding: 0 20px;

    width: 400px;
    height: 100%;

    box-sizing: border-box;
    border-right: 1px solid #ccc;

}

.elements {
    height: 80px;

    border-bottom: 1px solid #ccc;

    line-height: 80px;
    text-align: center;

    user-select: none;
}
</style>