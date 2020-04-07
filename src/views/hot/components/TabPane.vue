<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column v-loading="loading" width="180px" align="center" label="上传日期" element-loading-text="请给我点时间！">
      <template slot-scope="scope">
        <span>{{ scope.row.upload_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="资源名称">
      <template slot-scope="{row}">
        <el-tag>{{ row.resource_name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="专题">
      <template slot-scope="{row}">
        <el-tag>{{ row.type_name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="学科或分类">
      <template slot-scope="{row}">
        <el-tag>{{ row.subject_name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="作者">
      <template slot-scope="scope">
        <span>{{ scope.row.uploader_name }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="访问次数">
      <template slot-scope="scope">
        <span>{{ scope.row.scan_count }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="{row}">
        <el-button type="primary" size="mini" @click="handleUpdate(row)">
          浏览资源
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getResourceList } from '@/api/resource.js'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'visit'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 8,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    console.log(111)
    if (this.listQuery.type === 'visit') {
      this.listQuery.sort = ' visit_num  desc '
    } else if (this.listQuery.type === 'collect') {
      this.listQuery.sort = ' collect_num  desc '
    } else {
      this.listQuery.sort = ' upload_date  desc '
    }
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      getResourceList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    }
  }
}
</script>

