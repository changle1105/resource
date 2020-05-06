/* eslint-disable vue/no-unused-vars */
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.resource_name" placeholder="资源名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.subject_id" placeholder="学科或分类" clearable class="filter-item" style="width: 130px" @change="handleSubjectSelect">
        <el-option v-for="item in listSubject" :key="item.subject_id" :label="item.subject_name+'('+item.number+')'" :value="item.subject_id" />
      </el-select>
      <el-select v-model="listQuery.course_name" placeholder="所在目录" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in listCourse" :key="item.course_name" :label="item.course_name+'('+item.number+')'" :value="item.course_name" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        在 （{{ this.$route.meta.title }}）中查询
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
      <el-table-column label="发布时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uploadDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="showDetail(row)">{{ row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科或分类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uploaderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问/收藏" align="center" width="60">
        <template slot-scope="{row}">
          <span>{{ row.scanCount }}/{{ row.collect_count }}</span>
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
      <aside>{{ temp.resourceName }}（<a href="#" class="link-type" @click="addCollect(temp)">我要收藏</a>）</aside>

      <div v-for=" (item,index) in temp.appendix_list" :key="index">
        <p v-if="item!=null">
          <video
            v-if="item.filetype==='mp4'"
            id="myVideo"
            controls
            preload="auto"
            width="100%"
            height="100%"
          >
            <source
              src="https://video.xuexi.cn/video/1005/p/21e980f38db86f00f0f8b2c7877d4449-89be429986174b96b07fdc7fcc000bcc-2.mp4"
              type="video/mp4"
            >
          </video>
        </p>
      </div>
      <div v-for=" (item,index) in temp.appendix_list" :key="index+50">
        <p v-if="item!=null">
          <a v-if="item.filetype!='mp4'" class="link-type" :href="item.url">{{ item.filename }}</a>
        </p>
      </div>
      <el-collapse>
        <el-collapse-item title="  其它信息" name="4">
          <div>上传者：{{ temp.uploaderName }}</div>
          <div>类型：{{ temp.type_name }}</div>
          <div>学科：{{ temp.subjectname }}</div>
          <div>所属目录或者课程：{{ temp.courseName }}</div>
          <div>上传时间：{{ temp.uploadDate }}</div>
          <div>访问次数：{{ temp.scanCount }}</div>
          <div>收藏次数：{{ temp.collect_count }}</div>
          <div>资源描述：{{ temp.description }}</div>
        </el-collapse-item>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button class="pan-btn blue-btn" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button class="pan-btn green-btn" @click="addCollect(temp)">
          收藏
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getResourceList, getSubjectList, getCourseList, getDetail, addCollect } from '@/api/resource'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ResourceShow',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listSubject: null,
      listCourse: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        resource_name: undefined,
        type_id: undefined,
        subject_id: undefined,
        course_name: undefined,
        sort: ' upload_date desc '
      },
      showReviewer: false,
      temp: {
        resource_id: undefined,
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
        download_count: 0,
        appendix_list: {
          appendix_id: '',
          filename: '',
          filetype: '',
          url: null
        }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
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
      this.listQuery.type_id = this.$route.meta.type_id
      getResourceList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      getSubjectList(this.$route.meta.type_id).then(res => {
        this.listSubject = res.data.items
        this.listQuery.type_id = this.$route.meta.type_id
      })
      this.listLoading = false
    },
    handleSubjectSelect() {
      console.log(this.listQuery.subject_id)
      getCourseList(this.listQuery).then(res => {
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
        download_count: 0,
        appendix_list: {
          filename: '',
          filetype: '',
          file: null
        }
      }
    },
    showDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      getDetail(this.temp.resourceId).then(res => {
        if (res.data === null) {
          this.$notify({
            title: '提示',
            message: '该资源不包括附件！',
            type: 'success',
            duration: 2000
          })
        } else {
          this.temp = res.data // copy obj
        }
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log(this.temp)
    },
    addCollect(row) {
      console.log(row)
      addCollect(row.resourceId).then(res => {
        if (res.data === 1) {
          this.$notify({
            title: '提示',
            message: '添加收藏成功',
            type: 'success',
            duration: 2000
          })
        }
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
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
