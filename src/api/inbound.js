import request from '@/utils/request'

export function getList() {
  var url = '/api/Inbound_notes'
  return request({
    baseURL: process.env.DB_API,
    url: url,
    method: 'GET'
  })
}

// 新增入库单
// POST host/api/Inbound_notes
export function addInbound_note(data) {
  var url = '/api/Inbound_notes'
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

// 新增对应ID的items
// POST host/api/Inbound_items
export function addInbound_item(data) {
  var url = 'api/Inbound_items'
  return request({
    baseURL: process.env.DB_API,
    url: url,
    method: 'POST',
    data: data
  })
}

// 根据ID获取入库单信息
// GET host/api/Inbound_notes/:inid
export function getInbound_noteById(id) {
  var url = 'api/Inbound_notes/' + id
  return request({
    baseURL: process.env.DB_API,
    url: url,
    method: 'GET'
  })
}

// 根据ID_time获取items
// GET host/api/Inbound_items/inid=:inid
export function getInbound_itemsById_time(id) {
  var url = 'api/Inbound_items/inid=' + id
  return request({
    baseURL: process.env.DB_API,
    method: 'GET',
    url: url
  })
}

// 根据ID修改入库单内容
// PATCH host/api/Inbound_notes/:inid
export function patchInbound_noteById_time(id, data) {
  var url = 'api/Inbound_notes/' + id
  return request({
    baseURL: process.env.DB_API,
    method: 'PATCH',
    url: url,
    data: data
  })
}

// 删除入库单
// DELETE host/api/Inbound_notes/:inid
export function delInbound_notesById_time(id) {
  var url = 'api/Inbound_notes/' + id
  return request({
    baseURL: process.env.DB_API,
    method: 'DELETE',
    url: url
  })
}

// 删除入库单子项
// DELETE host/api/Inbound_items/inid=:inid
export function delInbound_itemsById_time(id) {
  var url = 'api/Inbound_items/inid=' + id
  return request({
    baseURL: process.env.DB_API,
    method: 'DELETE',
    url: url
  })
}
