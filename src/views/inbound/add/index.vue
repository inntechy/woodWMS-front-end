<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="柜号">
        <el-input v-model="form.container_id"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-col :span="11">
          <el-input v-model="form.brand"></el-input>
        </el-col>
        <el-col :span="2" class="line">
          品名
        </el-col>  
        <el-col :span="11">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="等级">
        <el-col :span="11">
          <el-input v-model="form.level"></el-input>
        </el-col>
        <el-col :span="2" class="line">
          货号
        </el-col>  
        <el-col :span="11">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/inbound'

export default {
  data() {
    return {
      form: {
        container_id: '',
        brand: '',
        name: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      getList()
      // getList().then(response => {
      //   // this.list = response.data.items
      //   // this.listLoading = false
      // })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

