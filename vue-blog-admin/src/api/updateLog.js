import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/updateLog/list',
    method: 'get',
    params: query
  })
}

export function fetchLog(id) {
  return request({
    url: '/updateLog/detail',
    method: 'get',
    params: { id }
  })
}

export function createLog(data) {
  return request({
    url: '/updateLog/create',
    method: 'post',
    data
  })
}

export function updateLog(data) {
  return request({
    url: '/updateLog/update',
    method: 'post',
    data
  })
}

export function deleteLog(data) {
  return request({
    url: '/updateLog/delete',
    method: 'post',
    data
  })
}
