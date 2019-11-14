<template>
  <div class="home">
    <!-- <h3>主页</h3> -->
    <!-- 页面布局:左右布局 -->
    <!-- 整体布局: -->
    <el-container>
      <!-- 左侧内容 -->
      <el-aside>Aside</el-aside>
      <!-- 右侧内容 -->
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
}
</script>
