<template>
  <div class="app-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="150">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="品牌/品名">
        <template slot-scope="scope">
          {{scope.row.brand}}/{{scope.row.name}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/inbound'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response
        this.listLoading = false
        console.log(response)
        // 返回的数据没有变量名 所以只能直接用response
      })
    }
  }
}
</script>
