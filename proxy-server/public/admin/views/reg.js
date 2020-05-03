export default class {
    constructor(el) {
        this.el = $(el);
        this.template = 
            `
                <div class="reg-page">
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
                            <label class="layui-form-label">确认密码</label>
                            <div class="layui-input-block">
                            <input type="password" lay-verify="requiredid|verifyPwd" placeholder="请输入确认密码" autocomplete="off" class="layui-input">
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
                            <label class="layui-form-label">同意</label>
                            <div class="layui-input-inline">
                            <input type="checkbox" lay-verify="agree" name="switch" lay-skin="switch">
                            </div>
                            <div class="layui-form-mid layui-word-aux"><a href="javascript:;" style="color:red;">《用户协议》</a></div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                            <button type="button" class="layui-btn" lay-submit lay-filter="reg">立即提交</button>
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            <a class="layui-btn layui-btn-primary" href="#/login">已有账号？去登陆</a>
                            </div>
                        </div>
                    </form>
                </div>
            `;
        this.init();
    }
    init() {
        this.el.html(this.template);
        this.handle()
    }
    handle() {
        layui.form.render();
        layui.form.verify({
            verifyCode: generateVerifyCode(document.getElementById('verifyCode')),
            verifyPwd: function (value) {
                const pwd = document.getElementsByName('pwd')[0].value;
                if(pwd !== value){
                    return '请确保密码一致';
                }
            },
            agree: function (value, item) {
                if(!item.ckecked){
                    return '必须同意协议'
                }
            }
        });
        layui.form.on('submit(reg)', function (data) {
            $.ajax({
                url: '/user/reg',
                type: 'post',
                data: Object.assign(data.field, { userType: 'admin' }),
                success({ statu, msg }) {
                    if (statu) {
                        layer.msg(msg + '请登陆');                        
                        location.hash = '/login';
                    }else{
                        layer.msg(msg)
                    }
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}