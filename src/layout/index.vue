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
           <Aside/>
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
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from "vue";
import { getList } from "../apis/user";
import Aside from './components/Aside.vue'
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
        Aside
    },
    setup() {
        onMounted(async () => {
            // let data = await getList();
            // console.log(data, "xxxx111");
            getList().then((res) => {
                console.log(res, "res111");
            });
        });
        const userInfo = reactive<UserInfo>({
            // avatar: "https://2x.antdv.com/logo.svg?42c11bfdd0f3e3c36e0f89a94769e2f7",
            avatar: "",
            userName: "admin",
        });
        const logout = () => {
            console.log("logout");
        };
        return {
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
