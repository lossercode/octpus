<script setup lang="ts">
import { getShell } from '@/api/getShell'
import { useComponentStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const { componentList } = useComponentStore()
const token = ref<string>('null')
const showDialog = ref<boolean>(false)
const copy = () => {
  navigator.clipboard.writeText(token.value).then(
    function () {
      ElMessage({
        type: 'success',
        message: '复制成功'
      })
    },
    function () {
      ElMessage({
        type: 'error',
        message: '复制失败'
      })
    }
  )
}
const makeFile = async () => {
  //解析componentList
  const result = []
  for (let i = 0; i < componentList.length; i++) {
    let cur = componentList[i]
    //如果是循环结尾标记就跳过
    if (cur.typeName === 'nestedEnd') {
      continue
    }
    //先提取单独的信息
    let temp = {}
    //循环组件增加一个子节点信息
    if (cur.nestedEnd) {
      temp['child'] = []
    }
    cur.configs.forEach((element) => {
      //需要对value值进行序列化操作，因为会出现值为proxy的情况
      temp[element.propName] = JSON.parse(JSON.stringify(element.value))
    })
    //增加一个indent属性方便进行判断层级
    temp['indent'] = cur.indent
    //添加一个id字段方便后台判别
    temp['id'] = cur.id

    //根据缩进进行判断
    if (cur.indent > 0) {
      //找到当前队列的队尾元素
      cur = result[result.length - 1]
      while (Object.hasOwn(cur, 'child') && cur.indent !== temp.indent - 1) {
        //当当前节点有child属性，递归到最底层的最后一个元素
        if (cur['child'].length === 0) {
          break
        } else {
          cur = cur['child'][cur['child'].length - 1]
        }
      }
      cur['child'].push(temp)
    } else {
      result.push(temp)
    }
  }
  console.log(result)

  const message: any = await getShell(result)
  token.value = message
  showDialog.value = true
}
</script>
<template>
  <el-header>
    <el-row align="middle">
      <el-col :span="2">
        <el-icon :size="24">
          <Back />
        </el-icon>
        <span style="font-size: 14px"> 返回主页</span>
      </el-col>
      <!-- <el-col :span="2">
        <span>返回主页</span>
      </el-col> -->
      <el-col :span="2" :offset="18">
        <el-button type="primary" @click="makeFile">立即运行</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="() => (componentList.length = 0)">撤销重做</el-button>
      </el-col>
      <!-- <el-col :span="2">
        <el-button>代码预览</el-button>
      </el-col>
      <el-col :span="2">
        <a href="">私人定制</a>
      </el-col>
      <el-col :span="2">
        <a href="">文档教程</a>
      </el-col> -->
    </el-row>
  </el-header>
  <el-dialog v-model="showDialog" width="35%" title="运行项目">
    <p>项目token为：{{ token }}</p>
    <el-button @click="copy">复制</el-button>
  </el-dialog>
</template>
<style scoped>
.el-header {
  position: absolute;
  height: 50px;
  background: #fff;
  width: 100%;
  padding: 0;
}

.el-row {
  height: 50px;
}

.el-col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.el-col:first-child {
  cursor: pointer;
}

.el-col:nth-child(2) {
  justify-content: start;
  font-size: 14px;
}

.el-col:nth-child(6) {
  justify-content: end;
}

a {
  text-decoration: none;
  color: black;
  font-size: 14px;
}

a:hover {
  color: #409eff;
}

.el-icon:hover {
  color: #409eff;
}
</style>
