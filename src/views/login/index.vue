<template>
    <div class="login">
        <div class="login_box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item_btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { goLogin } from '../../http/api'

export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await goLogin(this.ruleForm)
          console.log(result)
          if (result.flag === 1) {
            // 跳转页面
            this.$router.push({ name: 'Home' })
          }
        } else {
          console.log('登录失败')
          return false
        }
      })
    },
    // 重置按钮
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.login{
    width: 100vw;height: 100vh;
    background-color: #2D3A4B;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login_box{
    width: 450px;height: 335px;
    background-color: white;
}
.demo-ruleForm{
    margin: 120px 0px auto;
}
.el-form-item_btn{
    text-align: center;
    margin-left: -80px;
}
.el-input{
    width: 90%;
}

</style>
