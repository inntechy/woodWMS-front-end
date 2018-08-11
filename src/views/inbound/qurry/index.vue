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
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClickLook(scope.row.ID_time)" size="small">查看</el-button>
          <el-button @click="delBtnOnClick(scope.row.ID_time, scope.$index)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="警告"
        :visible.sync="warnningDialogVisible"
        width="30%">
        <span>确定删除该入库单吗？删除后将无法恢复！</span>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="warnningDialogVisible = false">取 消</el-button>
          <el-button type="warnning" @click="handleClickDel()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="删除中"
        :visible.sync="delettingDialogVisible"
        >
        <el-progress :percentage="percentage" :status="progressStatus"></el-progress>
      </el-dialog>
  </div>
</template>

<script>
import { getList, delInbound_notesById_time, delInbound_itemsById_time } from '@/api/inbound'

export default {
  data() {
    return {
      del_id: null,
      del_index: null,
      percentage: 0,
      progressStatus: '',
      delettingDialogVisible: false,
      warnningDialogVisible: false,
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
    handleClickLook(id) {
      // 此处需要跳转到详情页面
    },
    delBtnOnClick(id, index) {
      this.warnningDialogVisible = true
      this.del_id = id
      this.del_index = index + (this.currentPage - 1) * this.pagesize
    },
    handleClickDel() {
      // 删除按钮被按下时
      var id = this.del_id
      this.list.splice(this.del_index, 1)
      this.warnningDialogVisible = false
      this.delettingDialogVisible = true
      this.percentage = 0
      delInbound_itemsById_time(id).then(response => {
        this.percentage = 50
      })
      delInbound_notesById_time(id).then(response => {
        this.percentage = 100
        this.progressStatus = 'success'
      })
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
