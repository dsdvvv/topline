<template>
  <div class="login">
    <!-- 登录框背景板 -->
    <el-card class="login-card">
      <!-- 登录框logo -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form ref="formObj" style="margin-top: 20px" :model="loginForm" :rules="loginRules">
        <!-- 一个表单域就是一个form-item -->
        <el-form-item prop="mobile">
          <!-- 输入手机号 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="code">
          <!--验证码  -->
          <el-input v-model="loginForm.code" style="width: 280px" placeholder="验证码" />
          <!-- 发送验证码 -->
          <el-button style="float: right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div ref="box"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 需要校验的整个表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 协议
      },
      //   校验规则对象
      loginRules: {
        mobile: [
          {
            required: true, message: '请输入您的手机号'
          },
          {
            pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'
          }
        ],
        code: [
          {
            required: true, message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/, message: '请输入正确的验证码'
          }
        ],
        checked: [
          {
            validator: function (rule, value, callback) {
              /*
                    rele: 代表当前的规则(用处较小)
                    value: 代表当前的值(表单字段checked的值)
                    callback: 回调函数
                    */
              if (value) {
                callback() // 直接执行callback(表示直接通过)
              } else {
                callback(new Error('您需要同意用户协议与隐私条款'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      //   console.log(this.$refs.box)
    //   eslint-disable-next-line no-unused-expressions
      this.$refs.formObj.validate(function (issuccess) {
        if (issuccess) {
          //   如果为true调用接口登录

        }
      })
    }
  }
}
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
