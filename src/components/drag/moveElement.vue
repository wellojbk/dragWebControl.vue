<template>
    <div class="move-element" :style="{...style}">
    </div>
</template>
<script lang="ts" setup>
import { dragElementsStyle } from './dragType';

defineProps<{
    style:dragElementsStyle
}>()
</script>
<style scoped>
.move-element {
    position: absolute;
    width: 200px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #000;
}
</style>