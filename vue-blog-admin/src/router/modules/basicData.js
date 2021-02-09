import Layout from '@/layout'

const basicDataRouter = {
  path: '/basicData',
  component: Layout,
  redirect: '/basicData/articleList',
  name: '数据管理',
  meta: { title: '数据管理', icon: 'example' },
  alwaysShow: true,
  children: [
    {
      path: 'articleList',
      name: '文章',
      component: () => import('@/views/basicData/articleList'),
      meta: { title: '文章' }
    },
    {
      path: 'whisperList',
      name: '留言',
      component: () => import('@/views/basicData/whisperList'),
      meta: { title: '留言' }
    },
    {
      path: 'updateLogList',
      name: '更新记录',
      component: () => import('@/views/basicData/updateLogList'),
      meta: { title: '更新记录' }
    },
    {
      path: 'foodList',
      name: '美食',
      component: () => import('@/views/basicData/foodList'),
      meta: { title: '美食' }
    }
  ]
}

export default basicDataRouter
