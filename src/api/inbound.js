import request from '@/utils/request'

export function getList() {
  var url = '/api/inbound_notes'
  return request({
    baseURL: process.env.DB_API,
    url: url,
    method: 'GET'
  })
}

export function addInbound_note(data) {
  var url = '/api/inbound_notes'
  var note_data = {}
  note_data.container_id = data.container_id
  note_data.brand = data.brand
  note_data.name = data.name
  note_data.level = data.level
  note_data.goods_mark = data.goods_mark
  // 计算总体积和总支数a
  note_data.quanlity = data.quanlity
  note_data.volume_sum = data.volume_sum
  return request({
    baseURL: process.env.DB_API,
    url: url,
    method: 'POST',
    data: note_data
  })
}
