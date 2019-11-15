<template>
  <div class="home">
    <!-- <h3>主页</h3> -->
    <!-- 页面布局:左右布局 -->
    <!-- 整体布局: -->
    <el-container>
      <!-- 左侧内容 -->
      <el-aside class="left" style="width: 230px">
        <div class="menu-title" style="background-color: #2e2f32">
          <img src="../../assets/img/logo_admin.png" alt />
        </div>
        <el-menu
          style="width:231px"
          background-color="#353b4e"
          text-color="#adafb5"
          active-text-color="#ffd04b"
          router
        >
          <!-- 一级菜单 -->
          <el-menu-item index="/">首页</el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu index="1">
            <template slot="title">内容管理</template>
            <el-menu-item index="/publish">发布文章</el-menu-item>
            <el-menu-item index="/article">内容列表</el-menu-item>
            <el-menu-item>评论列表</el-menu-item>
            <el-menu-item>素材管理</el-menu-item>
          </el-submenu>
          <!-- 二级菜单 -->
          <el-submenu index="2">
            <template slot="title">粉丝管理</template>
            <el-menu-item>图文数据</el-menu-item>
            <el-menu-item>粉丝概况</el-menu-item>
            <el-menu-item>粉丝画像</el-menu-item>
            <el-menu-item>粉丝列表</el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item>账户信息</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <index-layout></index-layout>
        </el-header>
        <el-main>
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import indexlayout from '../../components'
export default {
  name: 'home',
  components: {
    'index-layout': indexlayout
  }
}
</script>
<style lang="less" scoped>
.left {
  background-color: #353b4e;
  height: 100vh;
  overflow: hidden;
  .menu-title {
    text-align: center;
    padding: 20px 0;
    img {
      height: 30px;
    }
  }
}
</style>
