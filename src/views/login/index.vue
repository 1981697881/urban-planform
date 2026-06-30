<template>
  <div class="login-container">
    <div class="login-shell">
      <section class="brand-panel">
        <div class="brand-top">
          <div class="brand-mark">
            <img src="@/assets/logo/logo.png" alt="logo">
          </div>
          <span class="brand-name">Urban Planform</span>
        </div>

        <div class="brand-copy">
          <p class="brand-kicker">Digital Operation Center</p>
          <h1>城市服务管理平台</h1>
          <p>组织、人员、薪酬、社保与报表的一体化工作台。</p>
        </div>

        <div class="module-grid">
          <div class="module-item">
            <span>组织档案</span>
            <strong>统一维护</strong>
          </div>
          <div class="module-item">
            <span>薪酬社保</span>
            <strong>精准核算</strong>
          </div>
          <div class="module-item">
            <span>报表中心</span>
            <strong>快速汇总</strong>
          </div>
        </div>

        <div class="visual-board">
          <div class="board-header">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="board-body">
            <div class="board-line board-line-long"></div>
            <div class="board-line"></div>
            <div class="board-row">
              <div class="board-tile board-tile-green"></div>
              <div class="board-tile board-tile-blue"></div>
              <div class="board-tile board-tile-orange"></div>
            </div>
            <div class="chart-bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
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
            <h3 class="title">登录系统</h3>
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
    margin-bottom: 22px;
  }

  .login-field {
    position: relative;
    border: 1px solid #dfe7f1;
    border-radius: 8px;
    background: #f8fafc;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:focus-within {
      border-color: #2f8f83;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(47, 143, 131, 0.12);
    }

    .el-form-item__content {
      display: flex;
      align-items: center;
      min-height: 52px;
      line-height: 52px;
    }

    .el-input {
      display: block;
      width: 100%;

      input {
        height: 52px;
        padding: 0 42px 0 10px;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: $input_text;
        caret-color: #2f8f83;
        font-size: 15px;
        line-height: 52px;
        -webkit-appearance: none;

        &::placeholder {
          color: $input_placeholder;
        }

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px #f8fafc inset !important;
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
$panel_green: #2f8f83;
$ink: #17212b;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: auto;
  background:
    linear-gradient(90deg, rgba(47, 143, 131, 0.06) 1px, transparent 1px),
    linear-gradient(0deg, rgba(47, 143, 131, 0.05) 1px, transparent 1px),
    linear-gradient(120deg, #f8fbfd 0%, #eef4f7 52%, #f6f8fb 100%);
  background-size: 36px 36px, 36px 36px, auto;
}

.login-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) 460px;
  gap: 56px;
  width: calc(100% - 48px);
  max-width: 1180px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 56px 0;
  align-items: center;
}

.brand-panel {
  position: relative;
  min-height: 640px;
  padding: 46px;
  overflow: hidden;
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(150deg, #0e4e4b, #182630 58%, #583630);
  background-size: 52px 52px, 52px 52px, auto;
  color: #fff;
  box-shadow: 0 28px 70px rgba(26, 45, 54, 0.22);

  &:before {
    position: absolute;
    inset: 26px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    content: '';
  }

  &:after {
    position: absolute;
    right: -88px;
    bottom: 54px;
    width: 280px;
    height: 118px;
    border: 1px solid rgba(231, 121, 79, 0.28);
    background: rgba(231, 121, 79, 0.12);
    content: '';
    transform: rotate(-28deg);
  }
}

.brand-top,
.brand-copy,
.module-grid,
.visual-board {
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
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
}

.brand-copy {
  max-width: 560px;
  margin-top: 86px;

  .brand-kicker {
    margin: 0 0 18px;
    color: #87dfce;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: #fff;
    font-size: 42px;
    line-height: 1.18;
    font-weight: 700;
    letter-spacing: 0;
  }

  p:last-child {
    max-width: 430px;
    margin: 20px 0 0;
    color: rgba(255, 255, 255, 0.74);
    font-size: 16px;
    line-height: 1.8;
  }
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 560px;
  margin-top: 56px;
}

.module-item {
  min-height: 88px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);

  span,
  strong {
    display: block;
  }

  span {
    color: rgba(255, 255, 255, 0.62);
    font-size: 13px;
  }

  strong {
    margin-top: 10px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  }
}

.visual-board {
  max-width: 430px;
  margin-top: 42px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(11, 22, 28, 0.42);
}

.board-header {
  display: flex;
  gap: 7px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e7794f;

    &:nth-child(2) {
      background: #f0ca59;
    }

    &:nth-child(3) {
      background: #55c78a;
    }
  }
}

.board-body {
  padding: 22px;
}

.board-line {
  width: 58%;
  height: 10px;
  margin-bottom: 13px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.board-line-long {
  width: 82%;
}

.board-row {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr 1fr;
  gap: 12px;
  margin: 22px 0;
}

.board-tile {
  height: 66px;
  border-radius: 8px;
}

.board-tile-green {
  background: rgba(47, 143, 131, 0.72);
}

.board-tile-blue {
  background: rgba(95, 149, 255, 0.72);
}

.board-tile-orange {
  background: rgba(231, 121, 79, 0.78);
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 86px;

  span {
    width: 100%;
    border-radius: 8px 8px 0 0;
    background: linear-gradient(180deg, #87dfce, rgba(135, 223, 206, 0.18));

    &:nth-child(1) {
      height: 48%;
    }

    &:nth-child(2) {
      height: 72%;
    }

    &:nth-child(3) {
      height: 56%;
    }

    &:nth-child(4) {
      height: 86%;
    }

    &:nth-child(5) {
      height: 64%;
    }
  }
}

.login-panel {
  position: relative;
}

.login-form {
  width: 100%;
  padding: 44px 42px 40px;
  border: 1px solid rgba(216, 226, 238, 0.9);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 70px rgba(28, 42, 58, 0.16);
  backdrop-filter: blur(14px);
}

.title-container {
  margin-bottom: 34px;

  p {
    margin: 0 0 10px;
    color: $panel_green;
    font-size: 14px;
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
  flex: 0 0 48px;
  width: 48px;
  color: #8a96a8;
  text-align: center;
  font-size: 16px;
}

.show-pwd {
  position: absolute;
  right: 16px;
  top: 0;
  z-index: 2;
  height: 52px;
  color: #8a96a8;
  cursor: pointer;
  font-size: 16px;
  line-height: 52px;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: $panel_green;
  }
}

.login-button {
  width: 100%;
  height: 52px;
  margin-top: 4px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, #2f8f83, #25756d);
  box-shadow: 0 14px 24px rgba(47, 143, 131, 0.24);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #36a395, #2a837a);
    box-shadow: 0 16px 28px rgba(47, 143, 131, 0.3);
  }
}

@media (max-width: 1080px) {
  .login-shell {
    grid-template-columns: 1fr;
    gap: 28px;
    width: calc(100% - 40px);
    max-width: 760px;
    padding: 36px 0;
  }

  .brand-panel {
    min-height: auto;
    padding: 36px;
  }

  .brand-copy {
    margin-top: 52px;
  }
}

@media (max-width: 640px) {
  .login-container {
    overflow: auto;
  }

  .login-shell {
    width: calc(100% - 28px);
    padding: 18px 0 28px;
  }

  .brand-panel {
    padding: 28px 24px;
  }

  .brand-panel:before {
    inset: 14px;
  }

  .brand-copy {
    margin-top: 36px;

    h1 {
      font-size: 30px;
    }

    p:last-child {
      font-size: 14px;
    }
  }

  .module-grid {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }

  .visual-board {
    display: none;
  }

  .login-form {
    padding: 34px 24px 30px;
  }

  .title-container .title {
    font-size: 26px;
  }
}
</style>
