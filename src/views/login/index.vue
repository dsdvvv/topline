<template>
  <div class="login">
    <!-- 使用elementUI组件 el-card -->
    <el-card class="login-card">
      <!-- 匿名插槽 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 => el-form包裹 -->
      <el-form style="margin-top:20px">
        <!-- 每一个表单域由一个 Form-Item 组件构成 -->
        <el-form-item>
          <!-- 表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker -->
          <!-- 手机号 -->
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 验证码 -->
          <el-input style="width:65%"></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 同意选项 -->
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {}
}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
