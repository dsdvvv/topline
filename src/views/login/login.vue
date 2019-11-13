<template>
  <div class="login">
    <!-- 登录框背景板 -->
    <el-card class="login-card">
      <!-- 登录框logo -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form style="margin-top: 20px">
        <!-- 一个表单域就是一个form-item -->
        <el-form-item>
          <!-- 输入手机号 -->
          <el-input placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <!--验证码  -->
          <el-input style="width: 280px" placeholder="验证码" />
          <!-- 发送验证码 -->
            <el-button style="float: right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
            <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
            <el-button style="width: 100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login {
  background-image: url(../../assets/img/login_bg.jpg);
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  // 登录框背景板
  .login-card {
    width: 450px;
    height: 340px;
    // 登录框logo
    .title {
      text-align: center;
      // 登录logo
      img {
        height: 40px;
      }
    }
  }
}
</style>
