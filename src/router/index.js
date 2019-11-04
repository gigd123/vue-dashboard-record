//官方的原件
import Vue from 'vue'
import VueRouter from 'vue-router'
//自訂的分頁元件
import Home from '@/components/HelloWorld';

//啟用Vue Router
Vue.use(VueRouter);

//匯出
export default new VueRouter({
    routes: [
        {
            name: '首頁',//元件呈現的名稱
            path: '/index',//對應的虛擬路徑
            component: Home//對應的元件
        },
    ],
});