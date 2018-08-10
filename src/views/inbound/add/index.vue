<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="柜号"  prop="container_id">
        <el-input v-model="form.container_id"></el-input>
      </el-form-item>
      <!-- 品牌/品名 -->
      <el-row type="flex">
        <el-col :span="12">
          <el-form-item label="品牌"  prop="brand">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品名"  prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 等级/货号 -->
      <el-row type="flex">
        <el-col :span="12">
          <el-form-item label="等级"  prop="level">
            <el-input v-model="form.level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货号"  prop="goods_mark">
            <el-input v-model="form.goods_mark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表头提示输入信息 -->
      <el-form-item class="table-head">
        <el-col :span="5">厚度(mm)</el-col>
        <el-col :span="5">宽度(mm)</el-col>
        <el-col :span="5">长度(m)</el-col>
        <el-col :span="5">件数(pcs)</el-col>
        <el-col :span="2"></el-col>
      </el-form-item>
      <!-- 下面为点击添加按钮增添一行的输入框 -->
      <el-form-item
        v-for="(inbound_item, index) in inbound_items"
        :label="'规格' + index"
        :key="inbound_item.key"
      >
        <el-col :span="5">
          <el-input-number 
          v-model="inbound_item.thickness" :min="1" :max="1000" label="厚度"></el-input-number>
        </el-col>
        <el-col :span="5">
          <el-input-number 
          v-model="inbound_item.width" :min="1" :max="1000" label="宽度"></el-input-number>
        </el-col>
        <el-col :span="5">
          <el-input-number 
          v-model="inbound_item.length" :precision="2" :step="0.1" :min="1.00" :max="1000" label="长度"></el-input-number>
        </el-col>
        <el-col :span="5">
          <el-input-number 
          v-model="inbound_item.pcs" :min="1" :max="1000" label="件数"></el-input-number>
        </el-col>
        <el-button v-if="inbound_items.length !== 1" type="danger" plain @click.prevent="removeItem(inbound_item)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addItem" type="primary" plain>新增规格</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel" type="danger" plain>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addInbound_note } from '@/api/inbound'

export default {
  data() {
    return {
      form: {
        container_id: '',
        brand: '',
        name: '',
        level: '',
        goods_mark: ''
      },
      inbound_items: [{
        ID_time: '',
        thickness: null,
        width: null,
        length: null,
        pcs: null,
        volume: null
      }],
      // 表单校验规则
      rules: {
        container_id: [
          { required: true, message: '不可留空', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '不可留空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不可留空', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '不可留空', trigger: 'blur' }
        ],
        goods_mark: [
          { required: true, message: '不可留空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.form.volume_sum = 0.0
      this.form.quanlity = 0
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 计算入库单总体积以及支数pcs
          for (var index in this.inbound_items) {
            var i_items = this.inbound_items
            i_items[index].volume = i_items[index].thickness * i_items[index].width * i_items[index].length * i_items[index].pcs / 1000000
            this.form.volume_sum += i_items[index].volume
            this.form.quanlity += i_items[index].pcs
            // TO-DO 此处应补上提交item的request
          }
          // 通过返回数据的ID_time是否存在来判断提交是否成功
          // 成功后将输入框归零
          if (addInbound_note(this.form).ID_time !== null) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.form.container_id = ''
            this.form.brand = ''
            this.form.name = ''
            this.form.level = ''
            this.form.goods_mark = ''
          } else {
            this.$message({
              message: '提交失败',
              type: 'error'
            })
          }
        } else {
          // 表单不合法
          this.$message({
            message: '信息填写有误',
            type: 'warning'
          })
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    removeItem(item) {
      var index = this.inbound_items.indexOf(item)
      if (index !== -1) {
        this.inbound_items.splice(index, 1)
      }
    },
    addItem() {
      this.inbound_items.push({
        ID_time: 0,
        thickness: 0,
        width: 0,
        length: 0,
        pcs: 0,
        volume: 0,
        key: Date.now()
      })
    }
  }
}
</script>

<style scoped>
.hint{
  text-align: center;
  font-weight: bolder;
}
.table-head{
  font-weight: bolder;
}
</style>

