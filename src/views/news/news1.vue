<template>
  <div @click="toDetail">信息1</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const rouoter = useRouter();
    const toDetail = () => {
      rouoter.push("/user/detail");
    };
    return {
      toDetail,
    };
  },
});
</script>

<style scoped>
</style>