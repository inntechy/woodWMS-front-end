<template>
  <div class="app-container">
    <el-pagination
      v-loading="listLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length">
    </el-pagination>
    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="80">
        <template slot-scope="scope">
          {{Number(scope.$index)+1}}
        </template>
      </el-table-column>
       <el-table-column align="center" prop="createAt" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createAt}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label='货号' width="100" prop="goods_mark">
      </el-table-column>
      <el-table-column label="品牌/品名">
        <template slot-scope="scope">
          {{scope.row.brand}}/{{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='总支数' width="100" prop="quanlity" />
      <el-table-column align="center" label='总体积' width="100" prop="volume_sum">
        <template slot-scope="scope">
          {{scope.row.volume_sum + ' m³'}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClickLook(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
      list: { test: 'test' },
      listLoading: true,
      currentPage: 1,
      pagesize: 10
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
        this.list = response.reverse()
        this.listLoading = false
        // 返回的数据没有变量名 所以只能直接用response
      })
    },
    handleClickLook(row) {
      // 此处需要跳转到详情页面
    },
    // 两个处理分页的函数
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
