<template>
    <div class="option">
        内容：<input type="text" v-model="activeElement.text" /><br />
        背景色<input type="color" v-model="activeElement.style.background" /><br />
        左侧距离<input type="text" v-model="activeElement.style.left" /><br />
        顶部距离<input type="text" v-model="activeElement.style.top" /><br />
        宽度<input type="text" v-model="activeElement.style.width" /><br />
        高度<input type="text" v-model="activeElement.style.height" /><br />
        字体大小<input type="text" v-model="activeElement.style.fontSize" /><br />
    </div>
</template>
<script lang="ts" setup>

import { dragElements } from './dragType';


const props = defineProps<{
    activeElement: dragElements
}>()

</script>
<style lang="scss" scoped>
.option {
    width: 400px;
    height: 100%;
}
</style>