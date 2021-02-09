const api = {
  Login: '/user/login',
  UserInfo: '/user/userinfo',
  UserName: '/user/name',

  Article: '/blogArticle/list', //文章
  Album: '/blogAlbum/list', //照片
  UpdateLog: '/blogUpdateLog/list', //更新日志
  Whisper: '/blogWhisper/list', //留言
  SendWhisper: '/blogWhisper/insert', //发送留言
}

export default api
