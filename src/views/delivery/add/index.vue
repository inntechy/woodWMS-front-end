<template>
  <div class="app-container">
    <!-- 制单输入框 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="制单"  prop="editor">
        <el-input ></el-input>
      </el-form-item>
      <!-- 规格选择 -->
      <el-form-item
        v-for="(formline, index) in formlines"
        :label="'规格' + (Number(index) + 1)"
        :key="formline.key"
      >
        <el-input v-model="formline.goods_mark" clearable @blur="inputCompelet(index)" >
          <template slot="prepend">货号</template>
        </el-input>
         <el-cascader
          :loading="formline.isGetting"
          :options="formline.back_options"
          @active-item-change="handleItemChange(index)"
          v-model="sizeList[index]"
          :key="formline.key"
          >
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-button @click="addItem" type="primary" plain>新增规格</el-button>
  </div>
</template>

<script>
import { getInbound_itemsByGoodsmark } from '@/api/inbound'

export default {
  data() {
    return {
      form: {
        editor: ''
      },
      formlines: [{
        isGetting: true,
        goods_mark: null,
        key: 0
      }],
      sizeList: []
    }
  },
  methods: {
    // 根据货号取得列表个数
    inputCompelet(index) {
      console.log('onclick' + index)
      var goods_mark = this.formlines[index].goods_mark
      getInbound_itemsByGoodsmark(goods_mark).then(response => {
        for (var responseIndex in response) {
          console.log('responseIndex' + responseIndex)
          this.formlines[index].back_options.push({
            value: Date.now(),
            label: responseIndex,
            children: []
          })
          // for (var each in response[responseIndex]) {
          //   this.formlines[index].back_options[responseIndex].children.push({
          //     value: response[responseIndex][each].ID,
          //     label:
          //       response[responseIndex][each].thickness.toString() + 'mm * ' +
          //       response[responseIndex][each].width.toString() + 'mm * ' +
          //       response[responseIndex][each].width.toString() + 'm'
          //   })
          // }
          this.formlines[index].isGetting = false
        }
      })
    },
    handleItemChange(indexOfFormLine) {
      // 总觉得还是根据货号返回入库单号比较靠谱！！！
    },
    addItem() {
      this.formlines.push({
        isGetting: true,
        key: Date.now()
      })
    }
  }
}
</script>

<style>

</style>
