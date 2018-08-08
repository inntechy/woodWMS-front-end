import request from '@/utils/request'

export function getList() {
  var url = '/api/inbound_notes'
  return request({
    baseURL: process.env.DB_API,
    url: url,
    method: 'GET'
  })
}
