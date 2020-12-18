<!--
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2020-12-03 09:09:49
-->
<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo">
                <img src="https://2x.antdv.com/logo.svg?42c11bfdd0f3e3c36e0f89a94769e2f7" alt="" />
                <span>Ant Desigin Vue</span>
            </div>
            <a-menu theme="dark" v-model:selectedKeys="selectedKeys" @click="selectMenu" mode="inline">
                <template v-for="item in routes">
                    <a-menu-item :key="item.path" v-if="!item.children">
                        <pie-chart-outlined />
                        <span>{{ item.meta && item.meta.title }}</span>
                    </a-menu-item>
                    <a-sub-menu :key="item.path" v-else>
                        <template #title>
                            <span
                                ><user-outlined /><span>{{ item.meta.title }}</span></span
                            >
                        </template>
                        <a-menu-item v-for="child in item.children" :key="child.path">
                            {{ child.meta && child.meta.title }}
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header">
                <a-avatar :src="userInfo.avatar" :class="{ 'defalut-style': !userInfo.avatar }" class="avatar">
                    <template #icon>
                        <UserOutlined />
                    </template>
                </a-avatar>
                <!-- <span>{{ userInfo.userName }}</span> -->
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()"> admin <DownOutlined /> </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;" @click="logout">logout</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <CaretDownOutlined style="color:#ccc" />
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>{{ currentPage }}</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', height: 'calc(100vh - 134px)' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2020 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    CaretDownOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { getList } from "../apis/user";
interface MenuInfo {
    //点击菜单返回的参数
    item: any;
    key: string;
    keyPath: Array<string>;
}
interface UserInfo {
    //用户信息
    avatar?: string;
    isLogin?: boolean;
    userName?: string;
}
export default defineComponent({
    components: {
        PieChartOutlined,
        DesktopOutlined,
        UserOutlined,
        TeamOutlined,
        FileOutlined,
        CaretDownOutlined,
    },
    setup() {
        onMounted(async () => {
            // let data = await getList();
            // console.log(data, "xxxx111");
            getList().then((res) => {
                console.log(res, "res111");
            });
            console.log(routes, "routes");
        });
        let collapsed = ref<boolean>(false); //菜单折叠
        let selectedKeys: Array<string> = reactive(["/tip"]); //菜单默认选中项
        const router = useRouter();
        let currentPage = ref<string>("tip");
        const routes = router.options.routes;
        const userInfo = reactive<UserInfo>({
            // avatar: "https://2x.antdv.com/logo.svg?42c11bfdd0f3e3c36e0f89a94769e2f7",
            avatar: "",
            userName: "admin",
        });
        const selectMenu = ({ key, keyPath }: MenuInfo) => {
            currentPage.value = keyPath
                .reverse()
                .join("")
                .replace("/", "");
            router.push(key);
        };
        const logout = () => {
            console.log("logout");
        };
        return {
            collapsed,
            selectedKeys,
            routes,
            selectMenu,
            currentPage,
            logout,
            userInfo,
        };
    },
});
</script>

<style lang="scss" scope>
#components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    margin: 16px;
    img {
        // width: 100%;
        height: 100%;
    }
}
.header {
    background: #fff;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    align-items: center;
    .avatar {
        margin-right: 10px;
    }
}
.ant-dropdown-link {
    // position: absolute;
    // opacity: 0;
    // width: 32px;
    // height: 32px;
    // right: 90px;
    // top: 20px;
    color: #666;
}
.defalut-style {
    background-color: #87d068;
}
.anticon-caret-down {
    margin-top: 4px;
}
</style>
