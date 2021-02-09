import api from './index'
// axios
import request from '@/utils/request'

//获取文章
export function getArticleList(data) {
    return request({
        url: api.Article,
        method: 'get',
        params: data,
        hideloading: true
    })
}

//获取照片
export function getAlbumList(data) {
    return request({
        url: api.Album,
        method: 'get',
        params: data,
        hideloading: true
    })
}

//获取照片
export function getUpdateLogList(data) {
    return request({
        url: api.UpdateLog,
        method: 'get',
        params: data,
        hideloading: true
    })
}

//发送留言
export function postSendWhisper(data) {
    return request({
        url: api.SendWhisper,
        method: 'post',
        data,
        hideloading: true
    })
}

//获取留言
export function getWhisperList(data) {
    return request({
        url: api.Whisper,
        method: 'get',
        params: data,
        hideloading: true
    })
}