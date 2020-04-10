/* eslint-disable vue/no-unused-vars */
<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="浏览日期" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.upload_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="200px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.resource_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.course_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科或分类" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subject_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型或专区" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看" width="100px" align="center">
        <template slot-scope="{row}">
          <ShowResource :resource-id="row.resource_id " />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getHistoryList } from '@/api/resource'
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
      limitNum: 5, // 同时上传文件个数的限制
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        user_id: '',
        sort: ' visit_date desc '
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
      getHistoryList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      this.listLoading = false
    }
  }
}
</script>
