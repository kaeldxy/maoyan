export default class {
    constructor(el, userType) {
        this.el = $(el);
        this.template =
            `
                <div class="userAdd-page">
                    <form class="layui-form" action="" lay-filter="userAdd">
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
                            <div class="layui-input-block">
                            <button type="button" class="layui-btn" lay-submit lay-filter="userAdd">立即提交</button>
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            </div>
                        </div>
                    </form>
                </div>
            `;
        this.userType = userType;
        this.init();
    }
    init() {
        this.el.html(this.template);
        this.handle();
    }
    handle() {
        const userType = this.userType;
        layui.form.verify({
            verifyCode: generateVerifyCode(document.getElementById('verifyCode')),
            verifyPwd: function (value) {
                const pwd = document.getElementsByName('pwd')[0].value;
                if (pwd !== value) {
                    return '请确保密码一致';
                }
            },
        });
        layui.form.on('submit(userAdd)', function (data) {
            $.ajax({
                url: '/api/user/add',
                type: 'post',
                data: Object.assign(data.field, { userType }),
                success({ statu, msg }) {
                    layer.msg(msg);
                    layui.form.val('userAdd', {})
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}