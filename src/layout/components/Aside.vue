<template>
  <div>
    <a-menu
      theme="dark"
      v-model:selectedKeys="selectedKeys"
      @click="selectMenu"
      mode="inline"
    >
      <template v-for="item in routes">
          <!-- 一级 -->
        <a-menu-item :key="item.path" v-if="!item.children && !item.meta.hidden">
          <pie-chart-outlined />
          <span>{{ item.meta && item.meta.title }}</span>
        </a-menu-item>
        <!-- 有子级 -->
        <Menu v-else-if="item.children" :key="item.path" :menu="item"/>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import Menu from "./Menu.vue";
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
interface MenuInfo {
  //点击菜单返回的参数
  item: any;
  key: string;
  keyPath: Array<string>;
}
export default defineComponent({
  components: {
    Menu,
  },
  setup() {
    let collapsed = ref<boolean>(false); //菜单折叠
    let selectedKeys: Array<string> = reactive(["/tip"]); //菜单默认选中项
    const router = useRouter();
    let currentPage = ref<string>("tip");
    const routes = router.options.routes;
    console.log(routes,'wocac')
    const selectMenu = ({ key, keyPath }: MenuInfo) => {
      currentPage.value = keyPath.reverse().join("").replace("/", "");
      router.push(key);
    };
    return {
      collapsed,
      selectedKeys,
      routes,
      currentPage,
      selectMenu
    };
  },
});
</script>

<style scoped>
</style>