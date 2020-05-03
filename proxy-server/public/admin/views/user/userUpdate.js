export default class{
    constructor(el, userType){
        this.el = $(el);
        this.userType = userType;
        this.userData = JSON.parse(localStorage['userupdatedata']);
        this.template = 
            `
                <div class="userUpdate-page">
                    <form class="layui-form" action="" lay-filter="userUpdate">
                        <div class="layui-form-item">
                            <label class="layui-form-label">账号</label>
                            <div class="layui-input-block">
                            <input type="text" name="userName"  lay-verify="required" placeholder="请输入账号" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">旧密码</label>
                            <div class="layui-input-block">
                            <input type="password" name="oldPwd" lay-verify="required" placeholder="请输入旧密码" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">新密码</label>
                            <div class="layui-input-block">
                            <input type="password" name="newPwd" lay-verify="requiredid" placeholder="请输入新密码" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                            <button type="button" class="layui-btn" lay-submit lay-filter="userUpdate">立即提交</button>
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            
                            </div>
                        </div>
                    </form>
                </div>
            `;
        this.init();
    }
    init(){
        localStorage.removeItem('userupdatedata');
        this.el.html(this.template);
        this.handle()
    }
    handle(){
        const userData = this.userData;
        const userType = this.userType;
        layui.form.val('userUpdate', userData);
        layui.form.on('submit(userUpdate)', function (data) {
            $.ajax({
                url: '/api/user/update',
                type: 'post',
                data: Object.assign(data.field, {userType, _id: userData._id}),
                success({ statu, msg }) {
                    layer.msg(msg)
                    layui.form.val('userUpdate', {});
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}