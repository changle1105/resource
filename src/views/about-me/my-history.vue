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
      <el-table-column label="浏览日期" width="95px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visit_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源上传日期" width="95px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uploadDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在目录" prop="id" align="center" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科或分类" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型或专区" align="center" width="140px">
        <template slot-scope="{row}">
          <span>{{ row.type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看" width="100px" align="center">
        <template slot-scope="{row}">
          <ShowResource :resource-id="row.resourceId " />
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
      tableKey: 0,
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
