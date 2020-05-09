export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
                <div class="layui-layout layui-layout-admin">
                    <div class="layui-header">
                        <div class="layui-logo">猫眼电影系统</div>
                        <!-- 头部区域（可配合layui已有的水平导航） -->
                        <ul class="layui-nav layui-layout-right" lay-filter="header-nav"> 
                            <li class="layui-nav-item">
                                <a href="javascript:;">
                                    <img src="../images/headPic/admin_head.jpg" class="layui-nav-img">
                                    <span class="userdata-Name"></span>
                                </a>
                                <dl class="layui-nav-child">
                                    <dd><a href="javascript:;">基本资料</a></dd>
                                    <dd><a href="javascript:;">安全设置</a></dd>
                                </dl>
                            </li>
                            <li class="layui-nav-item"><a href="javascript:;" class="admin-drop-out">退出登陆</a></li>
                        </ul>
                    </div>
                    <div class="layui-side layui-bg-black">
                        <div class="layui-side-scroll">
                            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
                            <ul class="layui-nav layui-nav-tree" lay-filter="maoyan-nav">
                                <li class="layui-nav-item">
                                    <a class="" href="javascript:;" data-hash="userList"  data-option="front" data-hashtext="前台用户/用户列表">前台用户</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="userList" data-option="front" data-hashtext="前台用户/用户列表">用户列表</a>
                                        </dd>
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="userAdd" data-option="front" data-hashtext="前台用户/添加用户">添加用户</a>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="userList" data-option="admin" data-hashtext="后台用户/用户列表">后台用户</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="userList" data-option="admin" data-hashtext="后台用户/用户列表">用户列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="userAdd" data-option="admin" data-hashtext="后台用户/添加用户">添加用户</a>
                                        </dd>  
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="movieList" data-hashtext="电影管理/电影列表">电影管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="movieList" data-hashtext="电影管理/电影列表">电影列表</a>
                                        </dd>
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="movieAdd" data-hashtext="电影管理/添加电影">添加电影</a>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="cinemaList" data-hashtext="影院管理/影院列表">影院管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="cinemaList" data-hashtext="影院管理/影院列表">影院列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="cinemaAdd" data-hashtext="影院管理/添加影院">添加影院</a>
                                        </dd>  
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="theaterList" data-hashtext="放映厅管理/放映厅列表">放映厅管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="theaterList" data-hashtext="放映厅管理/放映厅列表">放映厅列表</a>
                                        </dd>
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="theaterAdd" data-hashtext="放映厅管理/添加放映厅">添加放映厅</a>
                                        </dd>  
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="scheduleList" data-hashtext="排片管理/排片列表">排片管理</a>
                                    <dl class="layui-nav-child" >
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="scheduleList" data-hashtext="排片管理/排片列表">排片列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="scheduleAdd" data-hashtext="排片管理/添加排片">添加排片</a>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="orderList" data-hashtext="订单管理/订单列表">订单管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;"data-hash="orderList" data-hashtext="订单管理/订单列表">订单列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;"data-hash="orderAdd" data-hashtext="订单管理/添加订单">添加订单</a>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="layui-body">
                        <h1 id="app-title">
                            
                        </h1>
                        <div id="app-content">

                        </div>
                    </div>
                    <div class="layui-footer">
                        <!-- 底部固定区域 -->
                        © layui.com - 底部固定区域
                    </div>
                </div>
            `
        this.init()
    }
    init() {
        this.el.html(this.template)
        layui.element.render()
        this.handle()
    }
    handle() {
        $.ajax({
            url:'/user/getpayload',
            data:{},
            type:'post',
            success({userName}){
                $('.userdata-Name').text('当前登陆用户：' + userName);
            }
        })
        layui.element.on('nav(maoyan-nav)', function (elem) {
            const data = elem[0].dataset;
            $('#app-title').html(data.hashtext);
            location.hash = '/info/' + data.hash + '-' + (data.option ? data.option : '');
        })
        $('.admin-drop-out').on('click', function () {
            layer.confirm('你确定退出吗', function (index) {
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin_userdata');
                layer.close(index);
                location.hash = '/login';
            })
        })
    }
}