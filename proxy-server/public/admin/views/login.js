
export default class {
    constructor(el){
        this.el = $(el);
        this.template = 
            `
            <div class="login-page">
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">账号</label>
                        <div class="layui-input-block">
                        <input type="text" name="userName"  lay-verify="required" placeholder="请输入账号" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">密码</label>
                        <div class="layui-input-block">
                        <input type="password" name="pwd" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
                        </div>
                        
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                        <input type="text" lay-verify="required|verifyCode" placeholder="请输入验证码" autocomplete="off" class="layui-input">
                        </div>
                        
                        <div class="layui-input-inline">
                            <svg style="width: 70%; height: 38px; user-select:none; background: #eee" id="verifyCode">
                            
                            </svg>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="login">立即提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                        <a class="layui-btn layui-btn-primary" href="#/reg">没有账号？去注册</a>
                        </div>
                    </div>
                </form>
            </div>
            `
        this.init();
    }
    init(){
        this.el.html(this.template);
        this.handle()
    }
    handle(){
        layui.form.verify({
            verifyCode: generateVerifyCode(document.getElementById('verifyCode')),
        });
        layui.form.on('submit(login)', function (data) {
            $.ajax({
                url:'/user/login',
                type:'post',
                data: Object.assign(data.field, {userType: 'admin'}),
                success({statu, msg}){
                    layer.msg(msg);
                    if(statu){
                        location.hash = '/info';
                    }
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}