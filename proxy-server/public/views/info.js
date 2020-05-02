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
                                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                                    <span class=username></span>
                                </a>
                                <dl class="layui-nav-child">
                                    <dd><a href="">基本资料</a></dd>
                                    <dd><a href="">安全设置</a></dd>
                                </dl>
                            </li>
                            <li class="layui-nav-item"><a href="javascript:;">退出登陆</a></li>
                        </ul>
                    </div>
                    <div class="layui-side layui-bg-black">
                        <div class="layui-side-scroll">
                            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
                            <ul class="layui-nav layui-nav-tree" lay-filter="maoyan-nav">
                                <li class="layui-nav-item">
                                    <a class="" href="javascript:;" data-hash="frontUserList" data-hashtext="前台用户/用户列表">前台用户</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="frontUserList" data-hashtext="前台用户/用户列表">用户列表</a>
                                        </dd>
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="frontUserList" data-hashtext="前台用户/添加用户">添加用户</a>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;" data-hash="frontUserList" data-hashtext="后台用户/用户列表">后台用户</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="frontUserList" data-hashtext="后台用户">用户列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="frontUserList" data-hashtext="后台用户/添加用户">添加用户</a>
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
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-hash="cinemaList" data-hashtext="影院管理/添加影院">添加影院</a>
                                        </dd>  
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;">放映厅管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-value="list">放映厅列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-value="list">添加放映厅</a>
                                        </dd>  
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;">排片管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-value="list">排片列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-value="list">添加排片</a>
                                        </dd>  
                                    </dl>
                                </li>
                                <li class="layui-nav-item">
                                    <a href="javascript:;">订单管理</a>
                                    <dl class="layui-nav-child">
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-value="list">订单列表</a>
                                        </dd>  
                                        <dd>
                                            <a class="layui-anim-scaleSpring layui-anim" href="javascript:;" data-value="list">添加订单</a>
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
        layui.element.on('nav(maoyan-nav)', function (elem) {
            $('#app-title').html(elem[0].dataset.hashtext)
            location.hash = '/info/' + elem[0].dataset.hash;
        })
    }
}