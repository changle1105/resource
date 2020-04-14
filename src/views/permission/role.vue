<template>
  <div class="app-container">
    <el-table :data="directoryList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="所属模块" width="220">
        <template slot-scope="scope">
          {{ scope.row.type_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学科或者分类" width="220">
        <template slot-scope="scope">
          {{ scope.row.subject_name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="用户列表">
        <template slot-scope="scope">
          {{ scope.row.userlist }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="浏览角色">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">更改</el-button>
          <!--el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button!-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="权限修改">
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
      <el-form :model="tempDirectory" label-width="180px" label-position="right">
        <el-form-item label="所属模块">
          <span>{{ tempDirectory.type_name }}</span>
        </el-form-item>
        <el-form-item label="学科或者分类">
          <span>{{ tempDirectory.subject_name }}</span>
        </el-form-item>
        <el-form-item label="访问角色">
          <el-input v-model="tempDirectory.role" width="200px" />
        </el-form-item>
        <el-form-item label="管理人员信息">
          <el-collapse v-model="tempDirectory.userList" @change="handleChange()">
            <el-collapse-item :title=" tempDirectory.userlist">
              <el-table
                ref="multipleTable"
                :data="userList"
                tooltip-effect="dark"
                style="width: 90%;align:center;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  label="教师姓名"
                  prop="user_name"
                />
                <el-table-column
                  prop="dpt_name"
                  label="所属部门"
                  show-overflow-tooltip
                />
                <el-table-column
                  type="selection"
                />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { directoryList, updateDirectory, userList } from '@/api/resource'

export default {
  data() {
    return {
      userList: [],
      directoryList: [],
      dialogVisible: false,
      dialogType: 'new',
      tempDirectory: {
        ml_id: '',
        type_id: '',
        type_name: '',
        subject_id: '',
        subject_name: '',
        userlist: '',
        role: ''
      },
      multipleSelection: []
    }
  },
  created() {
    this.getDirectoryList()
    this.getUserList()
  },
  methods: {
    getDirectoryList() {
      directoryList().then(res => {
        this.directoryList = res.data.items
      })
    },
    getUserList() {
      userList().then(res => {
        this.userList = res.data.items
        console.log(this.userList)
      })
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.tempDirectory = scope.row
    },
    confirm() {
      var str_userList = ''
      for (var i = 0; i < this.multipleSelection.length; i++) {
        str_userList = str_userList + this.multipleSelection[i].user_id + ','
      }
      this.tempDirectory.userlist = str_userList
      console.log(this.tempDirectory)
      updateDirectory(str_userList).then(res => {
        console.log(res.data)
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('如果删除目录，目录下的资源将会全部被删除，确认删除么?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleChange() {
      console.log('handle')
      console.log(this.userList)
      for (var i = 0; i < this.userList.length; i++) {
        if (this.tempDirectory.userlist.indexOf(this.userList[i].user_id) >= 0) {
          this.$refs.multipleTable.toggleRowSelection(this.userList[i], true)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
