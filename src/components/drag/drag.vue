<template>
    <div class="main" @mousemove="mouseMove" @mouseup="mouseUp">
        <Aside @onChooseElement="onChooseElement"></Aside>
        <Canvas @setEage="setEage" @setActiveElement="setActiveElement" :canvasElements="canvasElements"></Canvas>
        <Option :activeElement="activeElement">
        </Option>
        <MoveElement v-if="isDrag" :style="newElement.style"></MoveElement>
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import Aside from "./aside.vue"
import Canvas from "./canvas.vue"
import { dragElements } from "./dragType";
import Option from "./option.vue"
import MoveElement from "./moveElement.vue";

//当前是否可以拖动
const isDrag: Ref<boolean> = ref<boolean>(false)
//默认添加一个空元素
const newElement: Ref<dragElements> = ref<dragElements>({
    type: "",
    style: {
        top: "0px",
        left: "0px",
    }
})

//默认的画布元素列表
const canvasElements: Ref<Array<dragElements>> = ref<Array<dragElements>>([])
//初始化边界数值
const eage = ref({
    topMin: 0,
    topMax: 0,
    leftMin: 0,
    leftMax: 0
})

//默认选中的元素
const activeElement = ref<dragElements>({
    type: "",
    style: {
        top: "0px",
        left: "0px",
    }
})
const activeIndex = ref(-1)

//当用户选中侧边栏新增元素时触发
function onChooseElement(ele: dragElements) {
    isDrag.value = true
    newElement.value = ele
}
//当用户移动鼠标时触发
function mouseMove(ev: MouseEvent) {
    //如果当前没有携带任何元素
    if (!isDrag.value) {
        return
    }


    newElement.value.style.left = ev.x.toString() + "px";
    newElement.value.style.top = ev.y.toString() + "px"

}

//当鼠标抬起时触发
function mouseUp(ev: MouseEvent) {
    if (!isDrag.value) {
        return
    }
    isDrag.value = false

    //如果拖动元素在.canvas元素上
    if (ev.x < eage.value.leftMax && ev.x > eage.value.leftMin && ev.y < eage.value.topMax && ev.y > eage.value.topMin) {
        //深拷贝
        let addtoElement = JSON.parse(JSON.stringify(newElement.value));

        addtoElement.style.left = (ev.x - eage.value.leftMin).toString() + "px"
        addtoElement.style.top = (ev.y - eage.value.topMin).toString() + "px"

        canvasElements.value.push(addtoElement)

    }


}
//.cavans 元素边界
function setEage(topMin: number, topMax: number, leftMin: number, leftMax: number) {
    eage.value = {
        topMax,
        topMin,
        leftMax,
        leftMin
    }
}

//设置当前编辑的元素
function setActiveElement(el: dragElements, index: number) {
    activeElement.value = el
    activeIndex.value = index
}



</script>

<style lang="scss" scoped>
.main {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 0 auto;

    width: 100%;
    height: 100vh;

    box-sizing: border-box;
}
</style>