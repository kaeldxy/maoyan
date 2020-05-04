import login from './views/login.js'
import reg from './views/reg.js';
import info from './views/info.js';
//上面是一级路由
import movieList from "./views/movie/movieList.js";
import movieAdd from './views/movie/movieAdd.js';
import movieUpdate from './views/movie/movieUpdate.js';
import userList from './views/user/userList.js';
import userAdd from './views/user/userAdd.js';
import userUpdate from './views/user/userUpdate.js';
//这里是二级路由

const all = { //将导入的二级模块存入all对象，方便下面使用，
    movieList,
    movieAdd,
    movieUpdate,
    userList,
    userAdd,
    userUpdate,
}
let infoExited = true;  //防止多次挂载info页面
const firstMount = '#app'; //一级路由挂载点
const secondMount = '#app-content'; //二级路由挂载点

var routes = {
    '/login': function () {
        new login(firstMount);
    },
    '/reg': function () {
        new reg(firstMount);
    },
    '/info': {
        on: function () {
            if (infoExited) {
                new info(firstMount);
                infoExited = false;
            }
        },
        after() {
            if (!/info/.test(location.hash)) {
                infoExited = true;
            }
        },
        //记住传参的时候，如果需要可以传两个参数，两个参数用'-'分割
        // 在info 页面我已经为所有模块的add 和 list 传了target, 所以你们只需要在挂载更新页面的时候传参
        //第一个参数是target，方便在保存了所有二级路由模块的all对象中查找,穿过来的参数必须和all中的键一致
        //第二参数可选，如果需要可以传， 记住不要传对象，地址栏只能穿字符串
        '/:params': function (params) {
            const arr = params.split('-');
            const target = arr[0];
            const option = arr[1];
            if (option) {
                new all[target](secondMount, option);
            } else {
                new all[target](secondMount);
            }
        }

    }
};
var router = Router(routes).configure({
    recurse: 'forward',
    notfound() {
        location.hash = '/login';
    },
    before() {
        if (/info/.test(location.hash)) {
            let admin_token = localStorage['admin_token'];
            if (!admin_token) {
                layer.msg('当前未登录,请登录');
                location.hash = '/login';
                return false;
            }
        }
    }
});

async function appInit() { //加载layui模块 并且初始化路由
    $.ajaxSetup({
        beforeSend(xhr) {
            const admin_token = localStorage['admin_token'];
            xhr.setRequestHeader('Authorization', `Bearer ${admin_token}`);
        },
        complete(xhr){
            if (xhr.statusText === "Unauthorized"){
                layer.msg('当前登录状态已失效,请重新登录');
                location.hash = '/login'
            }
        }
    });
    await new Promise(r => {
        layui.use(['form', 'table', 'element'], function () { // 导入layui模块，后期要使用其他模块自行加入
            r();
        })
    })
    router.init();
    // location.hash = '/login';
}
appInit();


