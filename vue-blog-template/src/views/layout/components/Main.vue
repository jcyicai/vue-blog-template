<template>
  <el-main>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </el-main>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style lang="scss" scoped></style>
