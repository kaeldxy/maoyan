// import adminLogin from './views/adminLogin.js'
// import adminReg from './views/adminReg.js';
import info from './views/info.js';
//上面是一级路由
import movieList from "./views/movie/movieList.js";
import movieAdd from './views/movie/movieAdd.js';
import movieUpdate from './views/movie/movieUpdate.js';
//这里是二级路由

const all = {
    movieList,
    movieAdd,
    movieUpdate
}

var routes = {
    '/adminLogin': function () {
        new adminLogin('#app')
    },
    '/adminReg': function () {
        new adminReg('#app');
    },
    '/info':{
        on: function () {
            new info('#app');
        },
        '/:target':{
            on: function (target) {
                new all[target]('#app-content');
            }
        }
    }
};
var router = Router(routes)
// .configure({
//     notfound: function () {//路由不匹配时实现路由的重定向
//         window.location.hash = "/adminLogin";
//     }
// });
async function init() {
    await new Promise(r => {
        layui.use(['form', 'table', 'element'], function () { // 导入layui模块，后期要使用其他模块自行加入
            r();
        })
    })
    router.init();
    location.hash = '/info';
}
init();


