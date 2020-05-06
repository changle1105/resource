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
        在 （{{ this.$route.meta.title }}）中查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        上传
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
          <span>{{ row.uploadDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" prop="id" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科或分类" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subjectName }}</span>
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
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类型或专区" prop="resourceType">
          <el-select v-model="temp.resourceType" placeholder="专区或类别" class="filter-item" style="width: 300px" @change="handleDialogTypeSelect">
            <el-option v-for="item in listType" :key="item.type_id" :label="item.type_name" :value="item.type_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="学科或分类" prop="subjectId">
          <el-select v-model="temp.subjectId" placeholder="学科或分类" class="filter-item" style="width: 300px" @change="handleDialogSubjectSelect">
            <el-option v-for="item in listSubject" :key="item.subject_id" :label="item.subject_name" :value="item.subject_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程或目录" prop="courseName">
          <el-select v-model="temp.courseName" filterable allow-create placeholder="课程或目录" class="filter-item" style="width: 100%" @blur="selectBlur">
            <el-option v-for="item in listCourse" :key="item.course_name" :label="item.course_name" :value="item.course_name" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="上传附件">
          <el-upload
            ref="uploadExcel"
            action=" http://localhost:8080/resource/add"
            :limit="limitNum"
            :auto-upload="false"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :file-list="fileList"
            :data="temp"
          >
            <el-button size="small" plain>选择文件</el-button>
          </el-upload></el-form-item>
        <el-form-item label="资源名称" prop="resourceName">
          <el-input v-model="temp.resourceName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入资源描述" />
        </el-form-item>
        <el-form-item v-show="false" label="作者ID">
          <el-input v-model="temp.uploaderId" :autosize="{ minRows: 2, maxRows: 4}" :value="temp.uploaderId" type="textarea" />
        </el-form-item>
        <el-form-item v-show="false" label="作者名称">
          <el-input v-model="temp.uploaderName" :autosize="{ minRows: 2, maxRows: 4}" :value="temp.uploaderName" type="textarea" />
        </el-form-item>
        <el-form-item v-if="dialogStatus=='update'" label="资源附件">
          <div v-for=" (item,index) in temp.appendix_list" :key="index">
            <p v-if="item!=null">
              <a class="link-type" :href="item.url">{{ item.filename }}</a>
            </p>
          </div>
        </el-form-item>
      </el-form>
      <div v-if="dialogStatus=='create'" slot="footer" class="dialog-footer">
        <el-button class="pan-btn blue-btn" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="uploadFile">立即上传</el-button>
      </div>
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
import { getMyResourceList, getSubjectList, getCourseList, getTypeList, deleteResource, getDetail, updateResource } from '@/api/resource'
import { getInfo } from '@/api/user'
import waves from '@/directive/waves' // waves directive
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
      limitNum: 1, // 同时上传文件个数的限制
      list: null,
      listSubject: null,
      listCourse: null,
      listType: null,
      fileList: [],
      total: 0,
      temp_file: null,
      status: 0,
      listLoading: true,
      dataForm: {
        file: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        resource_name: undefined,
        type_id: undefined,
        subject_id: undefined,
        course_name: undefined,
        description: '',
        uploader_id: '',
        sort: ' upload_date desc '
      },
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
        appendix_list: {
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
        resourceType: [{ required: true, message: '请选择', trigger: 'blur' }],
        subjectId: [{ required: true, message: '请选择', trigger: 'blur' }],
        courseName: [{ required: true, message: '请选择', trigger: 'blur' }],
        resourceName: [{ required: true, message: '请输入资源名称', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getMyResourceList(this.listQuery).then(response => {
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
      getInfo().then(response => {
        this.temp.uploaderId = response.data.user_id
        this.temp.uploaderName = response.data.username
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
        resourceName: '',
        typeId: '',
        typeName: '',
        subjectId: '',
        subjectName: '',
        courseId: '',
        courseName: '',
        uploaderId: '',
        uploaderName: '',
        description: '',
        scanCount: 0,
        collect_count: 0,
        downloadCount: 0
      }
    },
    handleCreate() {
      this.resetTemp() // 修改保留原始目录
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      getDetail(this.temp.resourceId).then(res => {
        if (res.data === null) {
          this.$notify({
            title: '提示',
            message: '该资源没有附件，请删除后重新上传！',
            type: 'success',
            duration: 2000
          })
          return
        }
        this.temp = res.data // copy obj
      })
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
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      // 下载代码
      this.downloadLoading = false
    },
    handleDelete(row) {
      this.$confirm('确认删除', '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteResource(row).then(res => {
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
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      })
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.dataForm.file = file.raw
      this.temp.description = file.name.substring(0, file.name.lastIndexOf('.'))
      this.temp.resourceName = this.temp.description
      // console.log(this.temp.description)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      /*
      console.log('before upload')
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        })
      }
      if (size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        })
      }*/
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `文件上传成功`
      })
      this.temp.description = ''
      this.temp.resourceName = ''
      this.$refs.uploadExcel.clearFiles()
    },
    uploadFile() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(this.$refs.uploadExcel)

          console.log(this.temp)
          this.$refs.uploadExcel.submit()
        }
      })
      //
    }
  }
}
</script>
