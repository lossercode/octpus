<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getVerifyCode } from '@/api/login'
import { ElMessage } from 'element-plus'
import { throttle } from '@/utils/throttle'
import { useUserStore } from '@/stores/user'
const { getUserInfo } = useUserStore()
const router = useRouter()

const user = reactive({
  telephone: '',
  verifyCode: ''
})

const verifyCode = throttle(async () => {
  const verifyCode = await getVerifyCode()
  localStorage.setItem('verifyCode', String(verifyCode))
  ElMessage({
    showClose: true,
    message: `验证码为${verifyCode}`,
    type: 'success'
  })
}, 3000)

//登录验证
const submit = async () => {
  if (user.telephone.length > 0 && user.verifyCode.length > 0) {
    if (user.verifyCode !== localStorage.getItem('verifyCode')) {
      ElMessage({
        message: '验证码错误',
        showClose: true,
        type: 'warning'
      })
    } else {
      await getUserInfo({ telephone: user.telephone })
      ElMessage({
        message: '登录成功',
        showClose: false,
        type: 'success'
      })
      router.push({ path: '/user/tasks' })
    }
  } else {
    ElMessage({
      message: '密码或密码不能为空',
      type: 'warning',
      showClose: true
    })
  }
}
</script>
<template>
  <div class="container">
    <el-row align="middle" justify="center" class="top">
      <el-col :span="12">
        <el-row align="middle" justify="center">
          <el-col :span="12">
            <ElImage src="https://www.bazhuayu.com/images/bzy-logo.png" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="top form" align="middle" justify="center">
      <el-col :span="16">
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入手机号/邮箱" v-model="user.telephone" />
          </el-form-item>
          <el-form-item>
            <el-col :span="16">
              <el-input placeholder="请输入验证码" v-model="user.verifyCode" />
            </el-col>
            <el-col :span="6" :push="2">
              <el-button style="width: 100%" @click="verifyCode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-radio>我已阅读并同意《用户协议》</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submit">登录</el-button>
          </el-form-item>
          <el-form-item>
            <span class="flex">未注册用户自动注册</span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.container {
  width: 500px;
  height: 350px;
  padding: 10px 20px;
  border-radius: 10px;
  position: absolute;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.top {
  margin-top: 20px;
}

.form {
  height: 100px;
  margin-top: 40px;
}

.flex {
  margin: 0 auto;
}
</style>
