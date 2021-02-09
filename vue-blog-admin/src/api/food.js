import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/food/list',
    method: 'get',
    params: query
  })
}

export function fetchFood(id) {
  return request({
    url: '/food/detail',
    method: 'get',
    params: { id }
  })
}

export function createFood(data) {
  return request({
    url: '/food/create',
    method: 'post',
    data
  })
}

export function updateFood(data) {
  return request({
    url: '/food/update',
    method: 'post',
    data
  })
}

export function deleteFood(data) {
  return request({
    url: '/food/delete',
    method: 'post',
    data
  })
}
