<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column v-loading="loading" width="180px" align="center" label="上传日期" element-loading-text="请给我点时间！">
      <template slot-scope="scope">
        <span>{{ scope.row.uploadDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="资源名称">
      <template slot-scope="{row}">
        <el-tag>{{ row.resourceName }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="专题">
      <template slot-scope="{row}">
        <el-tag>{{ row.type_name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="学科或分类">
      <template slot-scope="{row}">
        <el-tag>{{ row.subjectName }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="作者">
      <template slot-scope="scope">
        <span>{{ scope.row.uploaderName }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="访问/收藏">
      <template slot-scope="scope">
        <span>{{ scope.row.scanCount }}/{{ scope.row.collect_count }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="{row}">
        <ShowResource :resource-id="row.resourceId " />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getResourceList } from '@/api/resource.js'
import ShowResource from '@/components/ShowResource'

export default {
  components: {
    ShowResource
  },
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
        sort: ''
      },
      loading: false
    }
  },
  created() {
    console.log(111)
    if (this.listQuery.type === 'visit') {
      this.listQuery.sort = ' scan_count  desc '
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

