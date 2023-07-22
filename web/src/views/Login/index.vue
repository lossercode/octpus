<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getVerifyCode } from '@/api/user'
import { ElMessage } from 'element-plus'
import { throttle } from '@/utils/throttle'
import { useUserStore } from '@/stores/user'
import type { User } from '@/api'
const { getUserInfo } = useUserStore()
const router = useRouter()

const user = reactive<User>({
  userAccount: '',
  verifyCode: ''
})

// 是否同意用户协议
const protocol = ref(false)

const verifyCode = throttle(async () => {
  if (!user.userAccount) {
    ElMessage.error('手机号不能为空')
    return
  }
  const verify = await getVerifyCode(user.userAccount)
  console.log(verify.code)
  ElMessage({
    showClose: true,
    message: `验证码为${verify.code}`,
    type: 'success'
  })
}, 3000)

//登录验证
const submit = async () => {
  if (!protocol.value) {
    ElMessage({
      message: '请同意用户协议',
      type: 'warning',
      showClose: true
    })
    return
  }
  if (user.userAccount.length > 0 && user.verifyCode.length > 0) {
    await getUserInfo(user)
    router.push({ path: '/user/tasks' })
  } else {
    ElMessage({
      message: '手机号或密码不能为空',
      type: 'warning',
      showClose: true
    })
  }
}
</script>
<template>
  <div class="container">
    <el-row align="middle" justify="center" class="top">
      <el-col :span="20">
        <el-row align="middle" justify="center">
          <el-col :span="12">
            <ElImage src="https://www.bazhuayu.com/images/bzy-logo.png" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="top form" align="middle" justify="center">
      <el-col :span="20">
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入手机号" v-model="user.userAccount" />
          </el-form-item>
          <el-form-item>
            <el-col :span="14">
              <el-input placeholder="请输入验证码" v-model="user.verifyCode" />
            </el-col>
            <el-col :span="8" :push="2">
              <el-button style="width: 100%" @click="verifyCode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-checkbox v-model="protocol" label="我已同意用户协议" size="large" />
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
  width: 350px;
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
