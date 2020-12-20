<template>
    <a-sub-menu :key="menu.path">
        <template #title>
            <span>{{ menu.meta && menu.meta.title }}</span>
        </template>
        <template v-if="menu.children.length">
            <template v-for="item in menu.children">
                <!-- 不存在子级栏目 -->
               <a-menu-item v-if="!item.children" :key="item.path">
                   {{ item.meta && item.meta.title }}
               </a-menu-item>
               <!-- 存在子级栏目 -->
               <Menu v-else :menu="item" :key="item.path"></Menu>
            </template>
        </template>
    </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        menu:{
            type:Object,
            default:() => []
        }
    },
    name:"Menu",
    setup () {
        return {}
    }
})
</script>

<style scoped>

</style>