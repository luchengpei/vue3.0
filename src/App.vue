<template>
    <div class="app">
        <a-spin :spinning="loading" :tip="tip">
            <div id="nav">
                <router-view />
            </div>
        </a-spin>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        const store = useStore();
        let loading = ref<boolean>(store.state.isLoading);
        const tip = ref<string>("玩命加载中....");
        watch(
            () => store.state.isLoading,
            (val) => {
                loading.value = val;
            }
        );
        return {
            loading,
            tip,
        };
    },
});
</script>
<style lang="scss" scope>
.app {
    height: 100vh;
}
</style>
