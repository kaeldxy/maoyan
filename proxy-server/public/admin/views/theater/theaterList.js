export default class {
    constructor(el, theaterType) {
        this.el = $(el);
        this.template =
        `
        <div class="theatherList-page">
            <table id="theatherList" lay-filter="theatherList" class="layui-table" lay-size="lg"></table>
        </div>
        `;
        this.theaterType = theaterType;
        this.init();
    }
    init() {
        this.el.html(this.template);
        this.handle();
    }
    handle() {
        const theaterType = this.theaterType;
        layui.table.render({
            elem: '#theatherList'
            , height: 480
            , url: '/api/theater/get' //数据接口
            , page: true
            , cols: [[ //表头
                { field: '_id', title: '编号', width: 200, sort: true, fixed: 'left' }
                , { field: 'name', title: '放映厅名称', width: 200 }
                , { field: 'status', title: '是否营业', width: 80, sort: true}
                , { field: 'cinemaId', title: '从属影院', width: 80, sort: true, templet: function (d) {
                    return d.cinemaId.name;
                } }
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
        layui.table.on('tool(theatherList)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            const _id = data._id;
            if (layEvent === 'del') { //删除
                    layer.confirm('真的删除行么', function(index){
                        $.ajax({
                            url: '/api/theater/del',
                            type: 'post',
                            data: { _id},
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
                localStorage['theaterupdatedata'] = JSON.stringify(data);
                location.hash = '/info/theaterUpdate' + '-';
            }
        });
    }
}