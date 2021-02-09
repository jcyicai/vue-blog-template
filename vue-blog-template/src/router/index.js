import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: {
        path: "/home"
      }
    },
    {
      path: "",
      component: Layout,
      children: [
        {
          path: "/home",
          component: () => import("@/views/home/Home"),
          name: "home",
          meta: { title: "文章" }
        },
        {
          path: "/whisper",
          component: () => import("@/views/whisper/Whisper"),
          name: "whisper",
          meta: { title: "留言" }
        },
        {
          path: "/album",
          component: () => import("@/views/album/Album"),
          name: "album",
          meta: { title: "相册" }
        },
        {
          path: "/updateLog",
          component: () => import("@/views/updateLog/UpdateLog"),
          name: "updateLog",
          meta: { title: "更新" }
        },
        {
          path: "/about",
          component: () => import("@/views/about/About"),
          name: "about",
          meta: { title: "关于" }
        }
      ]
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
