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
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
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
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time | date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switc(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="onDelect(scope.row)"
              ></el-button>
              <el-button type="warning" icon="el-icon-star-off" circle size="mini"
              @click="onAssignRoles(scope.row)"></el-button>
              <!-- ==============分配角色================ -->
              <el-dialog title="分配角色" :visible.sync="dialogFormVisibles">
                <el-form :model="form">
                  <el-form-item label="当前用户" label-width="100px">{{assignRolesUsername}}</el-form-item>
                  <el-form-item label="分配角色" label-width="100px">
                    <el-select v-model="assignRolesid" placeholder="请选择角色">
                      <el-option label="请选择用户角色" :value="-1"></el-option>
                      <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibles = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisibles = false">确 定</el-button>
                </div>
              </el-dialog>
              <!-- ======================================= -->
            </el-row>
          </template>
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
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUsers, setUsers, alterUserState, deleUser, assignRoles } from '../../http/api'

export default {
  data () {
    return {
      dialogFormVisibles: false,
      form: {},
      pageinfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      tableData: [],
      currentPage: 1,
      total: 1,
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
      },
      assignRolesid: -1,
      assignRolesUsername: '',
      roles: []
      // ====================
    }
  },

  created () {
    this.getUsers()
  },
  methods: {
    // 分配角色
    async onAssignRoles (asasign) {
      this.dialogFormVisibles = true
      const { username } = asasign
      this.assignRolesUsername = username
      const assign = await assignRoles()
      console.log(assign.res.data.data)
      this.roles = assign.res.data.data
    },
    // 获取用户信息
    async getUsers () {
      const result = await getUsers(this.pageinfo)
      console.log(result)
      const {
        data: { pagenum, total },
        meta: { msg, status }
      } = result.res.data
      console.log(pagenum, total, msg, status)
      console.log(result.res.data.data.users)
      if (result.flag === 1) {
        this.tableData = result.res.data.data.users
        this.pageinfo.pagenum = pagenum
        this.total = total
      }
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageinfo.pagesize = val
      console.log(`每页 ${val} 条`)
      this.getUsers()
    },
    // 当前第几页
    handleCurrentChange (val) {
      this.pageinfo.pagenum = val
      console.log(`当前页: ${val}`)
      this.getUsers()
    },
    // 搜索用户信息
    onSeach () {
      this.getUsers()
    },
    // 添加新用户
    async open () {
      const res = await setUsers(this.ruleForm)
      console.log(res)
    },
    // 修改用户状态
    async switc (user) {
      const resol = await alterUserState(user)
      console.log(resol)
    },
    // 删除
    onDelect (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { id } = user
          const dele = await deleUser(id)
          console.log(dele)
          this.getUsers()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped>
.userlist {
  width: 100%;
}
.userlist_con {
  width: 100%;
  background-color: white;
  margin-top: 20px;
}
.input_seach {
  width: 300px;
  margin: 0 10px 10px 0;
}
</style>
