/* eslint-disable vue/no-unused-vars */
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.resource_name" placeholder="资源名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type_id" placeholder="专区或类别" clearable class="filter-item" style="width: 130px" @change="handleTypeSelect">
        <el-option v-for="item in listType" :key="item.type_id" :label="item.type_name" :value="item.type_id" />
      </el-select>
      <el-select v-model="listQuery.subject_id" placeholder="学科或分类" clearable class="filter-item" style="width: 130px" @change="handleSubjectSelect">
        <el-option v-for="item in listSubject" :key="item.subject_id" :label="item.subject_name" :value="item.subject_id" />
      </el-select>
      <el-select v-model="listQuery.course_name" placeholder="课程或目录" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in listCourse" :key="item.course_id" :label="item.course_name" :value="item.course_name" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="收藏时间" width="95px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.collect_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="95px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uploadDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" prop="id" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科或分类" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型或专区" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看" width="100px" align="center">
        <template slot-scope="{row}">
          <ShowResource :resource-id="row.resourceId " />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100px">
        <template slot-scope="{row}">
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getCollectList, getSubjectList, getCourseList, getTypeList, deleteCollect } from '@/api/resource'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ShowResource from '@/components/ShowResource'
export default {
  name: 'MyCollect',
  components: { Pagination, ShowResource },
  directives: { waves },
  props: {
    type: {
      type: String,
      default: 'visit'
    }
  },
  data() {
    return {
      tableKey: 0,
      limitNum: 5, // 同时上传文件个数的限制
      list: null,
      listSubject: null,
      listCourse: null,
      listType: null,
      total: 0,
      listLoading: true,
      dataForm: {
        file: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        user_id: '',
        resource_name: undefined,
        type_id: undefined,
        subject_id: undefined,
        course_name: undefined,
        collect_id: '',
        description: '',
        uploader_name: '',
        sort: ' upload_date desc '
      },
      showReviewer: false,
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.user_id = this.$store.state.user.name
      getCollectList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      getTypeList().then(res => {
        this.listType = res.data.items
      })
      this.listLoading = false
    },
    handleTypeSelect() {
      this.listSubject = null
      this.listCourse = null
      getSubjectList(this.listQuery.type_id).then(res => {
        this.listSubject = res.data.items
      })
    },
    handleSubjectSelect() {
      getCourseList(this.listQuery).then(res => {
        this.listCourse = res.data.items
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDelete(row) {
      this.$confirm('您确认要将该资源从收藏夹中删除么？', '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCollect(row.collect_id).then(res => {
          console.log(res.data)
          if (res.data === 1) {
            this.getList()
            this.$notify({
              title: '提示',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '提示',
              message: '删除失败',
              type: 'warning',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        console.log(0)
      })
    }
  }
}
</script>
