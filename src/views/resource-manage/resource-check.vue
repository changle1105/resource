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
      <el-table-column label="发布时间" width="95px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uploadDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" prop="id" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科或分类" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传者" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uploaderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型或专区" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看" width="75px" align="center">
        <template slot-scope="{row}">
          <ShowResource :resource-id="row.resourceId " />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类型或专区" prop="type_id">
          <el-select v-model="temp.resourceType" placeholder="专区或类别" class="filter-item" style="width: 300px" @change="handleDialogTypeSelect">
            <el-option v-for="item in listType" :key="item.type_id" :label="item.type_name" :value="item.type_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="学科或分类" prop="subject_id">
          <el-select v-model="temp.subjectId" placeholder="学科或分类" class="filter-item" style="width: 300px" @change="handleDialogSubjectSelect">
            <el-option v-for="item in listSubject" :key="item.subject_id" :label="item.subject_name" :value="item.subject_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程或目录" prop="course_name">
          <el-select v-model="temp.courseName" filterable allow-create placeholder="课程或目录" class="filter-item" style="width: 100%" @blur="selectBlur">
            <el-option v-for="item in listCourse" :key="item.course_name" :label="item.course_name" :value="item.course_name" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='update'" label="资源名称">
          <el-input v-model="temp.resourceName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入资源描述" />
        </el-form-item>
        <el-form-item v-if="dialogStatus=='update'" label="资源附件">
          <div v-for=" (item,index) in temp.appendix_list" :key="index">
            <p v-if="item!=null">
              <a class="link-type" :href="item.url">{{ item.filename }}</a>
            </p>
          </div>
        </el-form-item>
      </el-form>
      <div v-if="dialogStatus=='update'" slot="footer" class="dialog-footer">
        <el-button class="pan-btn blue-btn" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getManageList, getSubjectList, getCourseList, getTypeList, deleteResource, getDetail, updateResource } from '@/api/resource'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ShowResource from '@/components/ShowResource'
export default {
  name: 'ResourceShow',
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
      fileList: [],
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
        description: '',
        uploader_name: '',
        sort: ' upload_date desc '
      },
      showReviewer: false,
      temp: {
        resourceId: undefined,
        resourceName: '',
        typeId: '',
        typeName: '',
        resourceType: '',
        subjectId: '',
        subjectName: '',
        courseId: '',
        courseName: '',
        uploadDate: '',
        uploaderId: '',
        uploaderName: '',
        description: '',
        scanCount: 0,
        collect_count: 0,
        downloadCount: 0,
        appendixList: {
          appendix_id: '',
          filename: '',
          filetype: '',
          url: null
        },
        file: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改资源',
        create: '上传资源'
      },
      rules: {
        type_id: [{ required: true, message: '请选择', trigger: 'blur' }],
        subject_id: [{ required: true, message: '请选择', trigger: 'blur' }],
        course_name: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
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
      this.listQuery.user_id = this.$store.state.user.name
      getManageList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      getTypeList().then(res => {
        this.listType = res.data.items
      })
      this.listLoading = false
    },
    selectBlur(e) {
      this.temp.course_name = e.target.value
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
    handleDialogTypeSelect() {
      this.listSubject = null
      this.listCourse = null
      getSubjectList(this.temp.resourceType).then(res => {
        this.listSubject = res.data.items
      })
    },
    handleDialogSubjectSelect() {
      getCourseList({ type_id: this.temp.resourceType, subject_id: this.temp.subjectId }).then(res => {
        this.listCourse = res.data.items
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        resource_name: '',
        type_id: '',
        type_name: '',
        subject_id: '',
        subject_name: '',
        course_id: '',
        course_name: '',
        uploader_id: '',
        uploader_name: '',
        description: '',
        scan_count: 0,
        collect_count: 0,
        download_count: 0
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      getDetail(this.temp.resourceId).then(res => {
        this.temp = res.data // copy obj
      })
      // console.log(this.temp.appendix_list)
      if (this.temp.appendix_list === null) {
        this.$notify({
          title: '提示',
          message: '该资源没有附件，请删除后重新上传！',
          type: 'success',
          duration: 2000
        })
        return
      }
      // 根据编辑资源的内容，重新准备三个下拉列表的数据
      // console.log(this.listType)
      getSubjectList(this.temp.resourceType).then(res => {
        this.listSubject = res.data.items
      })
      getCourseList(this.temp.subjectId).then(res => {
        this.listCourse = res.data.items
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      tempData.appendix_list = null
      tempData.course_name = ''
      updateResource(tempData).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: '提示',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除', '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteResource(row).then(res => {
          // console.log(res.data)
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
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
