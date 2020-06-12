<template>
  <div class="home">
    <el-container style="height: 100%">
      <el-header>
        <el-row :gutter="20">
          <el-col :span="3"><div class="grid-content bg-purple" style="color: white">111</div></el-col>
          <el-col :span="19"><h3 style="color: white">电商后台管理系统</h3></el-col>
          <el-col :span="2">
            <el-button type="info" @click="onQuit">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Nav />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from '../views/nav/index'

export default {
  name: 'Home',
  components: {
    Nav
  },
  methods: {
    onQuit () {
      localStorage.removeItem('token')

      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.home{
  width: 100vw;height: 100vh;
}
  .el-header, .el-footer {
    background-color: #343D3F;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 100%;
  }

  .el-aside {
    background-color: #313542;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }

  .el-main {
    background-color: #E7EBEF;
  }
</style>
