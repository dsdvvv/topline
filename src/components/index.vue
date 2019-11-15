<template>
  <!-- 头部组件 -->
  <el-row type="flex" justify="space-between">
    <!-- 左侧 -->
    <el-col :span="21" class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="3" class="right">
      <!-- 头像 -->
      <img style="width: 30px" src="../assets/img/lv.png" alt />
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span style="margin-left: 8px">
          汤汤
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <!-- 如果想给组件注册一个原生js事件需要使用.native修饰符 -->
          <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    onLogout () {
      this.$confirm('您确定退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认退出删除token跳转登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 26px;
  }
  span {
    margin-left: 6px;
  }
}
.right {
  display: flex;
  align-items: center;
}
</style>
