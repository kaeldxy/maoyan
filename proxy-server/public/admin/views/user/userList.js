export default class{
    constructor(el, userType){
        this.el = $(el);
        this.template =
        `
        <div class="userList-page">
            <table id="userList" lay-filter="userList" class="layui-table" lay-size="lg"></table>
        </div>
        `;
        this.userType = userType;
        this.init();
    }
    init(){
        this.el.html(this.template);
        this.handle();
    }
    handle(){
        const userType = this.userType;
        layui.table.render({
            elem: '#userList'
            , height: 480
            , url: '/api/user/get' //数据接口
            , page: true
            , where:{
                userType,
            }
            , cols: [[ //表头
                { field: '_id', title: '编号', width: 200, sort: true, fixed: 'left' }
                , { field: 'userName', title: '账号', width: 80 }
                , { field: 'lastTime', title: '最近一次登陆时间', width: 160, sort: true }
                , {
                    fixed: 'right', title:'操作',  width: 150, align: 'center', toolbar:
                        `
                                    <div class="layui-btn-group">
                                        <button type="button" class="layui-btn layui-btn-sm" lay-event="update">
                                            <i class="layui-icon">&#xe642;</i>
                                        </button>
                                        <button type="button" class="layui-btn layui-btn-sm" lay-event="del">
                                            <i class="layui-icon">&#xe640;</i>
                                        </button>
                                    </div>
                                `
                }
            ]]
        });
        layui.table.on('tool(userList)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            const _id = data._id;
            if (layEvent === 'del') { //删除
                layui.layer.confirm(
                    `
                        <div class="layui-form-item">
                            <label class="layui-form-label">密码</label>
                            <div class="layui-input-block">
                            <input type="password" name="pwd" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    `,
                    {
                        title:'请输入此用户密码'
                    },
                    function (index) {
                        const pwd = document.getElementsByName('pwd')[0].value;
                        if(pwd){
                            $.ajax({
                                url: '/api/user/del',
                                type: 'post',
                                data: { userType, pwd, _id},
                                success({statu, msg}){
                                    layer.msg(msg);
                                    if(statu){
                                        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                    }
                                    layer.close(index);
                                }
                            })
                        }else{
                            layer.msg('必须填写密码');
                        }
                    },
                    function (index) {
                        layer.close(index);
                    }
                );
            } else if (layEvent === 'update') { //编辑
                localStorage['userupdatedata'] = JSON.stringify(data);
                location.hash = '/info/userUpdate' + '-' + userType;
            }
        });
    }
}