<template>
    <div class="userlist">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="userlist_con">
            <el-input placeholder="请输入内容" v-model="pageinfo.query" class="input_seach">
                <el-button slot="append" icon="el-icon-search" @click="onSeach"></el-button>
            </el-input>
            <!-- ===============点击添加用户信息================= -->
            <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名称" prop="username">
                  <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                  <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-on:click="open" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <!-- ================================ -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" ></el-table-column>
                <el-table-column prop="username" label="姓名" ></el-table-column>
                <el-table-column prop="email" label="邮箱" ></el-table-column>
                <el-table-column prop="mobile" label="电话" ></el-table-column>
                <el-table-column prop="role_name" label="角色" ></el-table-column>
                <el-table-column label="注册时间" >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time | date }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="mg_state" label="状态" >
                  <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                  <el-button type="primary" icon="el-icon-edit" circle></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageinfo.pagenum"
                :page-sizes="[2, 5, 10, 15]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
// import { getUsers, setUsers } from '../../http/api'
import { getUsers, setUsers } from '../../http/api'

export default {
  data () {
    return {
      value: true,
      pageinfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      tableData: [],
      currentPage: 1,
      total: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 添加用户信息
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
      // ====================
    }
  },

  created () {
    this.getUsers()
  },
  methods: {
    // 获取用户信息
    async getUsers () {
      const result = await getUsers(this.pageinfo)
      console.log(result)
      const { data: { pagenum, total }, meta: { msg, status } } = result.res.data
      console.log(pagenum, total, msg, status)
      console.log(result.res.data.data.users)
      if (result.flag === 1) {
        this.tableData = result.res.data.data.users
        this.pageinfo.pagenum = pagenum
        this.total = total
      }
    },
    handleSizeChange (val) {
      this.pageinfo.pagesize = val
      console.log(`每页 ${val} 条`)
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.pageinfo.pagenum = val
      console.log(`当前页: ${val}`)
      this.getUsers()
    },
    onSeach () {
      this.getUsers()
    },
    open () {
      // const token = localStorage.getItem('token')
      setUsers(this.ruleForm).then((res) => {
        const { meta: { status, msg } } = res.data
        if (status === 201) {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
        if (status === 400) {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.userlist{
    width: 100%;
}
.userlist_con{
    width: 100%;
    background-color: white;
    margin-top: 20px;
}
.input_seach{
    width: 300px;
    margin: 0 10px 10px 0;
}
</style>
