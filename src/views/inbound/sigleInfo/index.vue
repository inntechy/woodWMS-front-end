<template>
    <div class="app-container">
      <div class="head-line-search">
        <el-input v-model="qurry_id" prefix-icon="el-icon-search" clearable >
          <template slot="prepend">按单号查询</template>
          <el-button clickable @click="searchOnClick(qurry_id)" slot="append" icon="el-icon-search"></el-button>
        </el-input>  
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 24px">入库单详情</span>
          <el-button style="float: right;" type="danger">删除</el-button>
          <i class="el-icon-time"></i>
          <p style="display:inline-block">{{form.createAt}}</p>
        </div>
        <div class="text item">
          <div class="half-line">
            <span class="item-title">柜号：</span>
            <span class="data">{{form.container_id}}</span>
          </div>
          <div class="half-line">
            <span class="item-title">货号：</span>
            <span class="data">{{form.goods_mark}}</span>
          </div>
        </div>
        <div class="text item">
          <div class="one-third-line">
            <span class="item-title">品牌：</span>
            <span class="data">{{form.brand}}</span>
          </div>
          <div class="one-third-line">
            <span class="item-title">品名：</span>
            <span class="data">{{form.name}}</span>
          </div>
          <div class="one-third-line">
            <span class="item-title">等级：</span>
            <span class="data">{{form.level}}</span>
          </div>
        </div>
        <el-table
        :data="items"
        :row-class-name="tableRowClass"
        v-loading="listLoading" element-loading-text="等待中" 
        border
        fit
        highlight-current-row
        >
          <el-table-column align="center" label='规格' width="100%">
            <el-table-column align="center" label='厚度/mm' prop="thickness"></el-table-column>
            <el-table-column align="center" label='宽度/mm' prop="width"></el-table-column>
            <el-table-column align="center" label='长度/m' prop="length"></el-table-column>
            <el-table-column align="center" label='支数' prop="pcs"></el-table-column>
            <el-table-column align="center" label='立方' prop="volume"></el-table-column>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
import { getInbound_noteById } from '@/api/inbound'
import { getInbound_itemsById_time } from '@/api/inbound'

export default {
  data() {
    return {
      listLoading: true,
      qurry_id: null,
      form: {
        container_id: null
      },
      items: [{}]
    }
  },
  methods: {
    searchOnClick(id) {
      // 判断输入为数字且大小为13位 **校验输入数据**
      if (!isNaN(id) && Number(id) > 1000000000000 && Number(id) < 10000000000000) {
        this.getNoteById(id)
      } else {
        this.$message({
          message: '请检查单号是否正确',
          type: 'error'
        })
      }
    },
    getNoteById(id) {
      getInbound_noteById(id).then(response => {
        var data = response
        // 通过ID_time是否存在来判断返回是否正常
        if (data.ID_time !== null) {
          this.form = data
          // 此处获取子表
          this.getItemById(id)
        } else {
          this.$message({
            message: '入库单获取失败',
            type: 'error'
          })
        }
      })
    },
    getItemById(id) {
      // 获取item
      getInbound_itemsById_time(id).then(response => {
        var data = response
        if (data !== null) {
          this.items = data
          this.items[this.items.length] = {
            length: '合计',
            pcs: this.form.quanlity,
            volume: this.form.volume_sum
          }
          this.listLoading = false
          return true
        } else {
          this.$message({
            message: '未取得相关规格',
            type: 'error'
          })
        }
      })
    },
    // 设置表格行样式
    tableRowClass({ row, rowIndex }) {
      if (rowIndex === this.items.length - 1) {
        return 'last-sum-row'
      }
      return ''
    }
  }
}
</script>

<style>
  .head-line-search{
    text-align: center;
    font-weight: bolder;
  }
  .text {
    font-size: 14px;
  }

  .item {
    display:flex;
    display:-webkit-flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    width: 720px;
  }

  /* 第一，左右各一半信息 */
  .half-line {
    display:inline-block; 
    width:50%;
  }

  /* 每个元素三分之一 */
  .one-third-line {
    display:inline-block; 
    width:33.3%;
  }

  .item-title {
    margin-bottom: 20px;
    font-size: 20px;
  }

  .data {
    margin-bottom: 20px;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: cornflowerblue;
  }

  /* 表格最后一行 合计 */
  .el-table .last-sum-row {
    background: lightsteelblue;
  }
</style>


