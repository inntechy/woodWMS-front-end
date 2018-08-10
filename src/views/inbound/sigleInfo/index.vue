<template>
    <div class="app-container">
      <div class="head-line-search">
        <el-input v-model="qurry_id" prefix-icon="el-icon-search" clearable >
          <template slot="prepend">按单号查询</template>
          <el-button clickable @click="searchOnClick(qurry_id)" slot="append" icon="el-icon-search"></el-button>
        </el-input>  
      </div>
      <el-col :span=2>
        <h3>柜号:</h3>
        <p>{{form.container_id}}</p>
      </el-col>
    </div>
</template>

<script>
import { getInbound_noteById } from '@/api/inbound'

export default {
  data() {
    return {
      qurry_id: null,
      form: {
        container_id: null
      }
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
        } else {
          this.$message({
            message: '入库单获取失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style>
  .head-line-search{
    text-align: center;
    font-weight: bolder;
  }
  p{
    display: inline-block;
  }
</style>


