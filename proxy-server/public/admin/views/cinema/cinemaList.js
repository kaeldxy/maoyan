export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
            <div class="cinemaList-page">
                <table id="cinemaList" lay-filter="cinemaList" class="layui-table" lay-size="lg"></table>
            </div>
        `;
        this.init()
    }
    init() {
        this.el.html(this.template);
        this.handle()
    }
    handle() {
        layui.table.render({
            elem: '#cinemaList'
            , height: 480
            , url: '/api/cinema/get' //数据接口
            , page: true
            , cols: [[ //表头
                { field: '_id', title: '编号', width: 200, sort: true, fixed: 'left' }
                , { field: 'name', title: '影院名称', width: 80 }
                , { field: 'address', title: '影院地址', width: 160, sort: true }
                , { field: 'phone', title: '联系方式', width: 160, sort: true }
                , { field: 'status', title: '是否营业', width: 160, sort: true }
                , {
                    field: 'posterSrc', title: '影院图片', width: 100, sort: true, templet: function (d) {
                        return d.posterSrc ? `<img src="../${d.posterSrc}" style="width:100%;height:100%"/>` : ""
                    }
                }
                , {
                    fixed: 'right', title: '操作', width: 150, align: 'center', toolbar:
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
        layui.table.on('tool(cinemaList)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            const _id = data._id;
            if (layEvent === 'del') { //删除
                layer.confirm(
                    `
                        你确认删除此影院吗？
                    `,
                    {
                        title: '请确认操作'
                    },
                    function (index) {
                        $.ajax({
                            url: '/api/cinema/del',
                            type: 'post',
                            data: { _id },
                            success({ statu, msg }) {
                                layer.msg(msg);
                                if (statu) {
                                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                }
                                layer.close(index);
                            }
                        })
                    },
                    function (index) {
                        layer.close(index);
                    }
                );
            } else if (layEvent === 'update') { //编辑
                localStorage['cinemaupdatedata'] = JSON.stringify(data);
                location.hash = '/info/cinemaUpdate';
            }
        });
    }
}