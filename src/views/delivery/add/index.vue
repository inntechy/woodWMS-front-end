<template>
  <div class="app-container">
    <!-- 制单输入框 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="制单"  prop="editor">
        <el-col :span="5">
          <el-input ></el-input>
        </el-col>
      </el-form-item>
      <!-- 规格选择 -->
      <el-form-item
        v-for="(formline, index) in formlines"
        :label="'规格' + (Number(index) + 1)"
        :key="formline.key"
      >
        <el-col :span="5">
          <el-input v-model="formline.goods_mark" clearable :disabled="formline.inputDisabled">
            <template slot="prepend">货号</template>
            <el-button slot="append" @click="searchBtnOnClick(index)" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
         <el-cascader
          :loading="formline.isGetting"
          :options="formline.back_options"
          @active-item-change="handleItemChange($event, index)"
          v-model="sizeList[index]"
          :key="formline.key"
          :disabled="!formline.inputDisabled"
          >
          </el-cascader>
        </el-col>
        <el-col :span="10">
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="addItem" type="primary" plain>新增规格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInbound_notesByGoodsmark, getInbound_itemsById_time } from '@/api/inbound'

export default {
  data() {
    return {
      form: {
        editor: ''
      },
      formlines: [{
        isGetting: true,
        goods_mark: null,
        inputDisabled: false,
        key: 0,
        back_options: []
      }],
      sizeList: []
    }
  },
  methods: {
    // 根据货号取得入库单
    inputCompelet(index) {
      var goods_mark = this.formlines[index].goods_mark
      getInbound_notesByGoodsmark(goods_mark).then(response => {
        for (var responseIndex in response) {
          this.formlines[index].back_options.push({
            value: response[responseIndex].ID_time,
            label: response[responseIndex].createAt,
            children: []
          })
        }
        // 对每个选项 获取它的items规格
        for (var options_index in this.formlines[index].back_options) {
          var ID_time = this.formlines[index].back_options[options_index].value
          getInbound_itemsById_time(ID_time).then(iresponse => {
            console.log('iresponse' + iresponse)
            for (var each in iresponse) {
              this.formlines[index].back_options[options_index].children[each] = {
                label: iresponse.thickness + 'mm * ' + iresponse.width + 'mm * ' + iresponse.length + 'm',
                value: iresponse.ID
              }
            }
          })
        }
        this.formlines[index].isGetting = false
      })
    },
    handleItemChange(val, indexOfFormLine) {
      // 总觉得还是根据货号返回入库单号比较靠谱！！！
      // console.log('ItemChange 参数' + val + ' index:' + indexOfFormLine)
    },
    searchBtnOnClick(indexOfFormLine) {
      this.formlines[indexOfFormLine].inputDisabled = true
      this.inputCompelet(indexOfFormLine)
    },
    addItem() {
      this.formlines.push({
        isGetting: true,
        key: Date.now(),
        back_options: []
      })
    }
  }
}
</script>

<style>

</style>
