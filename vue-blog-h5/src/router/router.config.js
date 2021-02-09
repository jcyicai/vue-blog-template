/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: 'CYC Blog', keepAlive: false }
      },
      {
        path: '/whisper',
        name: 'Whisper',
        component: () => import('@/views/whisper/index'),
        meta: { title: '留言', keepAlive: false }
      },
      {
        path: '/album',
        name: 'Album',
        component: () => import('@/views/album/index'),
        meta: { title: '相册', keepAlive: false }
      },
      {
        path: '/updateLog',
        name: 'UpdateLog',
        component: () => import('@/views/updateLog/index'),
        meta: { title: '更新', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于', keepAlive: false }
      }
    ]
  }
]
