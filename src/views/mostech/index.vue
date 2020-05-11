/* eslint-disable vue/no-unused-vars */
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.resource_name" placeholder="资源名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="部门" clearable class="filter-item" style="width: 130px" @change="handleDeptSelect">
        <el-option v-for="item in listDept" :key="item.deptName" :label="item.deptName+'('+item.viewCount+')'" :value="item.deptName" />
      </el-select>
      <el-select v-model="listQuery.course_name" placeholder="所在目录" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in listCourse" :key="item.courseName" :label="item.courseName+'('+item.viewCount+')'" :value="item.courseName" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="发布时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="showDetail(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.deptName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问次数" align="center" width="60">
        <template slot-scope="{row}">
          <span>{{ row.viewCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="showDetail(row)">
            浏览资源
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="资源信息" :visible.sync="dialogFormVisible">
      <aside>{{ temp.name }}</aside>
      <div>
        <p>
          <video
            v-if="temp.extName==='.mp4'"
            id="myVideo"
            controls
            preload="auto"
            width="100%"
            height="100%"
          >
            <source
              :src="temp.localFileName"
              type="video/mp4"
            >
          </video>
        </p>
      </div>
      <div>
        <p>
          <a v-if="temp.extName!='.mp4'" class="link-type" :href="temp.localFileName" target="_blank" :download="temp.name">{{ temp.name }}</a>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="pan-btn blue-btn" @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getCourseList, getDeptList } from '@/api/mostech'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ResourceShow',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listDept: null,
      listCourse: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        resource_name: undefined,
        type: undefined,
        course_name: undefined
      },
      showReviewer: false,
      temp: [],
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      getDeptList().then(res => {
        this.listDept = res.data.items
      })
      this.listLoading = false
    },
    handleDeptSelect() {
      getCourseList(this.listQuery.type).then(res => {
        this.listCourse = res.data.items
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      this.listLoading = false
    },
    showDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    }
  }
}
</script>
