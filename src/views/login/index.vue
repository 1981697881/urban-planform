<template>
  <div class="login-container">
    <div class="login-shell">
      <section class="brand-panel">
        <div class="brand-top">
          <div class="brand-mark">
            <img src="@/assets/logo/logo.png" alt="logo">
          </div>
          <div class="brand-title">
            <strong>服务平台</strong>
            <span>URBAN PLANFORM</span>
          </div>
        </div>

        <div class="overview-card">
          <div class="overview-toolbar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="overview-content">
            <div class="metric-row">
              <div class="metric-item metric-main">
                <span>档案</span>
                <strong>86%</strong>
              </div>
              <div class="metric-item">
                <span>薪酬</span>
                <strong>24</strong>
              </div>
            </div>
            <div class="flow-line"></div>
            <div class="flow-line flow-line-short"></div>
            <div class="panel-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="bar-chart">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div class="module-grid">
          <div class="module-item">
            <span>组织</span>
            <strong>档案</strong>
          </div>
          <div class="module-item">
            <span>人员</span>
            <strong>台账</strong>
          </div>
          <div class="module-item">
            <span>报表</span>
            <strong>汇总</strong>
          </div>
        </div>
      </section>

      <section class="login-panel">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <p>欢迎回来</p>
            <h3 class="title">账号登录</h3>
          </div>

          <el-form-item prop="username" class="login-field">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入登录账号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password" class="login-field">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入登录密码"
              name="password"
              tabindex="2"
              auto-complete="on"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            class="login-button"
            @click.native.prevent="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback()
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于 6 位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('keypress', this.handleEnterLogin)
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.handleEnterLogin)
  },
  methods: {
    handleEnterLogin(e) {
      if (e.which === 13 || e.keyCode === 13) {
        this.handleLogin()
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log(res)
            if (res.flag) {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            } else {
              this.loading = false
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$input_text: #17212b;
$input_placeholder: #8a96a8;

.login-container {
  .el-form-item {
    margin-bottom: 20px;
  }

  .login-field {
    position: relative;
    border: 1px solid #dde6ef;
    border-radius: 8px;
    background: #f8fbfd;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:focus-within {
      border-color: #2c8f84;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(44, 143, 132, 0.12);
    }

    .el-form-item__content {
      display: flex;
      align-items: center;
      min-height: 50px;
      line-height: 50px;
    }

    .el-input {
      display: block;
      width: 100%;

      input {
        height: 50px;
        padding: 0 42px 0 8px;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: $input_text;
        caret-color: #2c8f84;
        font-size: 14px;
        line-height: 50px;
        -webkit-appearance: none;

        &::placeholder {
          color: $input_placeholder;
        }

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px #f8fbfd inset !important;
          -webkit-text-fill-color: $input_text !important;
        }
      }
    }
  }

  .el-form-item__error {
    padding-top: 6px;
    color: #d94f45;
  }
}
</style>

<style lang="scss" scoped>
$green: #2c8f84;
$green_dark: #176b64;
$ink: #17212b;
$muted: #778396;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: auto;
  background:
    linear-gradient(90deg, rgba(21, 42, 54, 0.045) 1px, transparent 1px),
    linear-gradient(0deg, rgba(21, 42, 54, 0.04) 1px, transparent 1px),
    linear-gradient(135deg, #f5f8fb 0%, #eef5f3 48%, #f8fafc 100%);
  background-size: 40px 40px, 40px 40px, auto;
}

.login-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430px;
  width: calc(100% - 64px);
  max-width: 1120px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 56px 0;
  align-items: center;
}

.brand-panel {
  position: relative;
  min-height: 600px;
  padding: 42px;
  overflow: hidden;
  border: 1px solid rgba(214, 226, 232, 0.9);
  border-right: 0;
  border-radius: 8px 0 0 8px;
  background:
    linear-gradient(90deg, rgba(44, 143, 132, 0.08) 1px, transparent 1px),
    linear-gradient(0deg, rgba(44, 143, 132, 0.06) 1px, transparent 1px),
    linear-gradient(145deg, rgba(236, 248, 246, 0.96), rgba(255, 255, 255, 0.86) 54%, rgba(245, 241, 235, 0.9));
  background-size: 44px 44px, 44px 44px, auto;

  &:before {
    position: absolute;
    right: -120px;
    top: 64px;
    width: 360px;
    height: 360px;
    border: 1px solid rgba(44, 143, 132, 0.14);
    border-radius: 50%;
    content: '';
  }

  &:after {
    position: absolute;
    left: 62px;
    bottom: -80px;
    width: 300px;
    height: 180px;
    border: 1px solid rgba(212, 116, 72, 0.22);
    background: rgba(212, 116, 72, 0.08);
    content: '';
    transform: rotate(-22deg);
  }
}

.brand-top,
.overview-card,
.module-grid {
  position: relative;
  z-index: 1;
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(44, 143, 132, 0.16);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 12px 24px rgba(24, 58, 70, 0.08);

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
}

.brand-title {
  strong,
  span {
    display: block;
  }

  strong {
    color: $ink;
    font-size: 18px;
    line-height: 1.2;
  }

  span {
    margin-top: 5px;
    color: $muted;
    font-size: 11px;
    letter-spacing: 0;
  }
}

.overview-card {
  width: 100%;
  max-width: 470px;
  margin-top: 64px;
  overflow: hidden;
  border: 1px solid rgba(214, 226, 232, 0.95);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 22px 55px rgba(29, 63, 75, 0.12);
}

.overview-toolbar {
  display: flex;
  gap: 7px;
  padding: 16px 18px;
  border-bottom: 1px solid #e6eef2;
  background: rgba(248, 251, 253, 0.9);

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d46f4a;

    &:nth-child(2) {
      background: #d9b84f;
    }

    &:nth-child(3) {
      background: #4aa97a;
    }
  }
}

.overview-content {
  padding: 24px;
}

.metric-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 14px;
  margin-bottom: 24px;
}

.metric-item {
  min-height: 92px;
  padding: 18px;
  border: 1px solid #e0e9ee;
  border-radius: 8px;
  background: #f9fcfd;

  span,
  strong {
    display: block;
  }

  span {
    color: $muted;
    font-size: 13px;
  }

  strong {
    margin-top: 12px;
    color: $ink;
    font-size: 28px;
    line-height: 1;
  }
}

.metric-main {
  background: linear-gradient(135deg, #eaf8f5, #fff);

  strong {
    color: $green_dark;
  }
}

.flow-line {
  width: 78%;
  height: 10px;
  margin-bottom: 12px;
  border-radius: 999px;
  background: #dce7ec;
}

.flow-line-short {
  width: 52%;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 24px 0;

  span {
    height: 58px;
    border-radius: 8px;
    background: #e8f1f4;

    &:nth-child(1) {
      background: rgba(44, 143, 132, 0.82);
    }

    &:nth-child(2) {
      background: rgba(80, 131, 203, 0.78);
    }

    &:nth-child(3) {
      background: rgba(212, 111, 74, 0.74);
    }
  }
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 92px;
  padding-top: 8px;

  span {
    width: 100%;
    border-radius: 8px 8px 0 0;
    background: linear-gradient(180deg, #4ab7bd, rgba(74, 183, 189, 0.2));

    &:nth-child(1) {
      height: 46%;
    }

    &:nth-child(2) {
      height: 70%;
    }

    &:nth-child(3) {
      height: 54%;
    }

    &:nth-child(4) {
      height: 82%;
    }

    &:nth-child(5) {
      height: 60%;
    }
  }
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 470px;
  margin-top: 22px;
}

.module-item {
  min-height: 78px;
  padding: 16px;
  border: 1px solid rgba(214, 226, 232, 0.95);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.74);

  span,
  strong {
    display: block;
  }

  span {
    color: $muted;
    font-size: 13px;
  }

  strong {
    margin-top: 8px;
    color: $ink;
    font-size: 18px;
  }
}

.login-panel {
  display: flex;
  align-items: center;
  min-height: 600px;
  padding: 0 46px;
  border: 1px solid rgba(214, 226, 232, 0.9);
  border-radius: 0 8px 8px 0;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 60px rgba(28, 42, 58, 0.12);
}

.login-form {
  width: 100%;
}

.title-container {
  margin-bottom: 34px;

  p {
    margin: 0 0 9px;
    color: $green;
    font-size: 13px;
    font-weight: 700;
  }

  .title {
    margin: 0;
    color: $ink;
    font-size: 30px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: 0;
  }
}

.svg-container {
  flex: 0 0 46px;
  width: 46px;
  color: #8a96a8;
  text-align: center;
  font-size: 16px;
}

.show-pwd {
  position: absolute;
  right: 16px;
  top: 0;
  z-index: 2;
  height: 50px;
  color: #8a96a8;
  cursor: pointer;
  font-size: 16px;
  line-height: 50px;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: $green;
  }
}

.login-button {
  width: 100%;
  height: 50px;
  margin-top: 6px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, $green, $green_dark);
  box-shadow: 0 14px 24px rgba(44, 143, 132, 0.22);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #34a196, #1d7b72);
    box-shadow: 0 16px 28px rgba(44, 143, 132, 0.28);
  }
}

@media (max-width: 1080px) {
  .login-shell {
    grid-template-columns: 1fr;
    width: calc(100% - 40px);
    max-width: 720px;
    padding: 34px 0;
  }

  .brand-panel {
    min-height: auto;
    border-right: 1px solid rgba(214, 226, 232, 0.9);
    border-radius: 8px 8px 0 0;
  }

  .login-panel {
    min-height: auto;
    padding: 42px;
    border-top: 0;
    border-radius: 0 0 8px 8px;
  }
}

@media (max-width: 640px) {
  .login-shell {
    width: calc(100% - 28px);
    padding: 18px 0 28px;
  }

  .brand-panel {
    padding: 24px;
  }

  .brand-top {
    gap: 12px;
  }

  .overview-card {
    margin-top: 30px;
  }

  .overview-content {
    padding: 18px;
  }

  .metric-row,
  .module-grid {
    grid-template-columns: 1fr;
  }

  .panel-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bar-chart {
    display: none;
  }

  .login-panel {
    padding: 34px 24px 30px;
  }

  .title-container .title {
    font-size: 26px;
  }
}
</style>
