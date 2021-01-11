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
        <a-menu-item :key="item.children[0].path" v-if="hasOneChildren(item)">
          <pie-chart-outlined />
          <span>{{ item.children[0].meta &&  item.children[0].meta.title }}</span>
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
    const selectMenu = ({ key, keyPath }: MenuInfo) => {
      console.log(key,'selectedKeys')
      console.log(keyPath,'selectedKeys')
      selectedKeys[0] = key
      // console.log(selectedKeys,'selectedKeys')
      currentPage.value = keyPath.reverse().join("").replace("/", "");
      router.push(key);
    };
    const hasOneChildren = (data:any) => {
      //不存在子级的情况
      if(!data.children) return false
      //过滤隐藏的路由
      const routers = data.children.filter((item:any)=>item.meta.hidden?false:true)
      if(routers.length===1) return true
      return false
    }
    return {
      collapsed,
      selectedKeys,
      routes,
      currentPage,
      selectMenu,
      hasOneChildren
    };
  },
});
</script>

<style scoped>
</style>