<template>
    <div class="canvas" ref="root" @mouseup="stopMove">
        <div v-for="(i, index) in canvasElements" 
            :key="index" 
            :class="index === actveIndex ? 'active' : ''"
            :style="{ ...i.style }"
            @mousemove.stop="activeMove" 
            @mouseup="stopMove"
            @mousedown.stop="e => { activeAct(i, index, e) }">{{ i.text }}</div>
    </div>
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { dragElements } from './dragType';
import { pxToNumber } from "./dragService"

const props = defineProps<{
    canvasElements: Array<dragElements>
}>()
const emit = defineEmits<{
    (event: "setEage", topMin: number, topMax: number, leftMin: number, leftMax: number): void,
    (event: "setActiveElement", el: dragElements, index: number): void
}>()
const root = ref()
const activeElement = ref<dragElements>({ type: "", text: "", style: { top: "0px", left: "0px", background: '#fff' } })
const actveIndex = ref(-1)
const isMove = ref(false)

const fixX = ref(0)
const fixY = ref(0)

onMounted(() => {
    emit("setEage",
        root.value.offsetTop,
        root.value.offsetHeight + root.value.offsetTop,
        root.value.offsetLeft,
        root.value.offsetWidth + root.value.offsetLeft
    )
})

function activeAct(el: dragElements, index: number, ev: MouseEvent) {

    console.log(props.canvasElements);


    isMove.value = true
    activeElement.value = el
    actveIndex.value = index
    emit("setActiveElement", el, index)

    fixX.value = fix(ev.x, pxToNumber(el.style.left))
    fixY.value = fix(ev.y, pxToNumber(el.style.top))


}
function activeMove(ev: MouseEvent) {
    if (!isMove.value) {
        return
    }

    if (ev.x - fixX.value < root.value.offsetLeft ||
        ev.x - fixX.value + 200 > root.value.offsetWidth + root.value.offsetLeft ||
        ev.y - fixY.value < root.value.offsetTop ||
        ev.y - fixY.value + 50 > root.value.offsetHeight + root.value.offsetTop
    ) {
        console.log("over eage");

        return
    }

    activeElement.value.style.left = (ev.x - fixX.value).toString() + "px"
    activeElement.value.style.top = (ev.y - fixY.value).toString() + "px"
}
function stopMove(ev: MouseEvent) {

    isMove.value = false
}

function fix(num1: number, num2: number) {
    return num1 - num2
}

</script>
<style lang="scss" scoped>
.canvas {
    width: 1000px;
    height: 750px;
    border-radius: 10px;
    border: 1px solid #000;
    overflow: hidden;

    * {
        position: absolute;
        width: 200px;
        height: 50px;
        border: 1px solid #ccc;
    }

    .active {
        border: 3px solid sienna;
    }
}
</style>