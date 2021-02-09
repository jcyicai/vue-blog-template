import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/whisper/list',
    method: 'get',
    params: query
  })
}

export function fetchWhisper(id) {
  return request({
    url: '/whisper/detail',
    method: 'get',
    params: { id }
  })
}

export function createWhisper(data) {
  return request({
    url: '/whisper/create',
    method: 'post',
    data
  })
}

export function updateWhisper(data) {
  return request({
    url: '/whisper/update',
    method: 'post',
    data
  })
}

export function deleteWhisper(data) {
  return request({
    url: '/whisper/delete',
    method: 'post',
    data
  })
}
