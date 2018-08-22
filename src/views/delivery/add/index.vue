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
        <!-- 货号输入框 -->
        <el-col :span="5">
          <el-input v-model="formline.goods_mark" clearable :disabled="formline.inputDisabled">
            <template slot="prepend">货号</template>
            <el-button slot="append" @click="searchBtnOnClick(index)" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 规格选择器 -->
        <el-col :span="5">
         <el-cascader
          :loading="formline.isGetting"
          :options="formline.back_options"
          v-model="sizeList[index].sizeID"
          :key="formline.key"
          :disabled="!formline.inputDisabled"
          :show-all-levels="false"
          >
          </el-cascader>
        </el-col>
        <!-- 数量选择器 -->
        <el-col :span="4">
          <el-input-number 
          v-model="sizeList[index].quantity" :min="1" :max="getUnsoldPCS(index)" label="宽度"></el-input-number>
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
import { getInbound_notesByGoodsmark, getInbound_itemsById_time, getInbound_itemsById } from '@/api/inbound'

export default {
  data() {
    return {
      form: {
        editor: ''
      },
      formlines: [{
        isGetting: true,
        goods_mark: null,
        sellPCS: null,
        inputDisabled: false,
        key: 25,
        back_options: []
      }],
      sizeList: [{
        // 需要注意的是 此处返回的sizeID是一个二位数组，其中0位是入库单ID，1位是item的ID
        sizeID: null,
        quantity: null
      }]
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
            label: response[responseIndex].createAt + ' 品名：' + response[responseIndex].name,
            children: []
          })
        }
        // 对每个选项 获取它的items规格
        for (var options_index in this.formlines[index].back_options) {
          var ID_time = this.formlines[index].back_options[options_index].value
          this.mapDataToOptions(options_index, ID_time, index)
        }
        this.formlines[index].isGetting = false
      })
    },

    // 将数据填入选项中
    mapDataToOptions(options_index, ID_time, index) {
      getInbound_itemsById_time(ID_time).then(iresponse => {
        for (var each in iresponse) {
          // 子菜单里面的内容
          this.formlines[index].back_options[options_index].children[each] = {
            label: iresponse[each].thickness + 'mm * ' + iresponse[each].width + 'mm * ' + iresponse[each].length + 'm',
            value: iresponse[each].ID,
            data: iresponse[each]
          }
        }
      })
    },

    // 获取未售出的剩余支数
    // TO-DO 这种方法是不合适的！！
    getUnsoldPCS(indexOfFormLine) {
      if (this.sizeList[indexOfFormLine].sizeID) {
        var itemID = this.sizeList[indexOfFormLine].sizeID[1]
        getInbound_itemsById(itemID).then(response => {
          var unsoldpcs = response.pcs - response.soldpcs
          return unsoldpcs
        })
      } else {
        return 1
      }
    },

    searchBtnOnClick(indexOfFormLine) {
      this.formlines[indexOfFormLine].inputDisabled = true
      this.inputCompelet(indexOfFormLine)
    },
    addItem() {
      this.sizeList.push({
        sizeID: null,
        quantity: 1
      })
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
