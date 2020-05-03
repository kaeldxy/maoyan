import login from './views/login.js'
import reg from './views/reg.js';
import info from './views/info.js';
//上面是一级路由
import movieList from "./views/movie/movieList.js";
import movieAdd from './views/movie/movieAdd.js';
import movieUpdate from './views/movie/movieUpdate.js';
import userList from './views/user/userList.js';
import userAdd from './views/user/userAdd.js';
import userUpdate from './views/user/userUpdate.js'
//这里是二级路由

const all = { //将导入的二级模块存入all对象，方便下面使用，
    movieList,
    movieAdd,
    movieUpdate,
    userList,
    userAdd,
    userUpdate,
}

const firstMount = '#app'; //一级路由挂载点
const secondMount = '#app-content'; //二级路由挂载点

var routes = {
    '/login': function () {
        new login(firstMount);
    },
    '/reg': function () {
        new reg(firstMount);
    },
    '/info':{
        on: function () {
            new info(firstMount);
        },
        //记住传参的时候，如果需要可以传两个参数，两个参数用'-'分割
        // 在info 页面我已经为所有模块的add 和 list 传了target, 所以你们只需要在挂载更新页面的时候传参
        //第一个参数是target，方便在保存了所有二级路由模块的all对象中查找,穿过来的参数必须和all中的键一致
        //第二参数可选，如果需要可以传， 记住不要传对象，地址栏只能穿字符串
        '/:params': {
            on: function (params) {
                const arr = params.split('-');
                const target = arr[0];
                const option = arr[1];
                if(option){
                    new all[target](secondMount, option);
                }else{
                    new all[target](secondMount);
                }
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
async function appInit() { //加载layui模块 并且初始化路由
    await new Promise(r => {
        layui.use(['form', 'table', 'element'], function () { // 导入layui模块，后期要使用其他模块自行加入
            r();
        })
    })
    router.init();
    // location.hash = '/info';
}
appInit();


