<template>
    <div class="canvas" ref="root" @mouseup="stopMove" @click="unactive">
        <div v-for="(i, index) in canvasElements" :key="index" :class="index === actveIndex ? 'active' : ''"
            :style="{ ...i.style }" @mousemove.stop="activeMove" @mouseup="stopMove" @click.stop=""
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
//修正鼠标位置不然每次点击都在左上角
const fixX = ref(0)
const fixY = ref(0)
//获取元素边界
onMounted(() => {
    emit("setEage",
        root.value.offsetTop,
        root.value.offsetHeight + root.value.offsetTop,
        root.value.offsetLeft,
        root.value.offsetWidth + root.value.offsetLeft
    )
})
//开始移动
function activeAct(el: dragElements, index: number, ev: MouseEvent) {

    isMove.value = true
    activeElement.value = el
    actveIndex.value = index
    emit("setActiveElement", el, index)

    fixX.value = fix(ev.x, pxToNumber(el.style.left + root.value.offsetLeft))
    fixY.value = fix(ev.y, pxToNumber(el.style.top + root.value.offsetTop))


}
//移动时修改位置
function activeMove(ev: MouseEvent) {

    if (!isMove.value) {
        return
    }
    //防止越过边界
    if (ev.x - fixX.value < 0 ||
        ev.x - fixX.value + (activeElement.value.style?.width ? pxToNumber(activeElement.value.style.width) : 200) > root.value.offsetWidth ||
        ev.y - fixY.value < 0 ||
        ev.y - fixY.value + (activeElement.value.style?.height ? pxToNumber(activeElement.value.style.height) : 50) > root.value.offsetHeight
    ) {
        console.log("over eage");

        return
    }

    activeElement.value.style.left = (ev.x - fixX.value).toString() + "px"
    activeElement.value.style.top = (ev.y - fixY.value).toString() + "px"
}
//停止移动
function stopMove() {

    isMove.value = false
}
//修正位置函数
function fix(num1: number, num2: number) {
    console.log(num1, num2);

    return num1 - num2
}

function unactive() {
    actveIndex.value = -1
    activeElement.value = { type: "", text: "", style: { top: "0px", left: "0px", background: '#fff' } }
    emit("setActiveElement", activeElement.value, actveIndex.value)
}

</script>
<style lang="scss" scoped>
.canvas {
    position: relative;
    width: 1000px;
    height: 750px;
    border: 1px solid #000;
    overflow: hidden;

    * {
        position: absolute;
        width: 200px;
        height: 50px;
        border: 1px solid #ccc;
        user-select: none;
        overflow: hidden;
    }

    .active {
        border: 1px dashed #000;
    }
}
</style>