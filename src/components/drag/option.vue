<template>
    <div class="option">
        <input type="text" v-model="activeElement.text"/><br/>
        <input type="color" v-model="activeElement.style.background"/><br/>
        <input type="text" v-model="activeElement.style.left"/><br/>
        <input type="text" v-model="activeElement.style.top"/><br/>
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