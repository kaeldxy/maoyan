export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
        <div class="orderList-page">
            <table id="orderList" lay-filter="orderList" class="layui-table" lay-size="lg"></table>
        </div>
        `;
        this.init();
    }
    init() {
        this.el.html(this.template);
        this.handle();
    }
    handle() {
        layui.table.render({
            elem: '#orderList'
            , height: 480
            , url: '/api/order/get' //数据接口
            , page: true
            , cols: [[ //表头
                { field: '_id', title: '编号', width: 100, sort: true, fixed: 'left' },
                {
                    field: 'frontUserId', title: '用户名', width: 100, sort: true, fixed: 'left', templet: function (d) {
                        return d.frontUserId.userName;
                } }
                , {
                    field: 'scheduleId', title: '电影名', width: 150, sort: true, templet: function (d) {
                        return d.scheduleId.movieId.cname;
                    }  }
                , {
                    field: 'scheduleId', title: '影院名', width: 150, sort: true, templet: function (d) {
                        return d.scheduleId.cinemaId.name;
                    }  }
                , {
                    field: 'scheduleId', title: '地址', width: 150, sort: true, templet: function (d) {
                        return d.scheduleId.cinemaId.address;
                    }  }
                , {
                    field: 'scheduleId', title: '放映厅', width: 100, sort: true, templet: function (d) {
                        return d.scheduleId.theaterId.name;
                    }   }
                , {
                    field: 'scheduleId', title: '放映时间', width: 100, sort: true, templet: function (d) {
                        return d.scheduleId.showTime;
                    }    }
                , {
                    field: 'scheduleId', title: '价格', width: 100, sort: true, templet: function (d) {
                        return d.scheduleId.price;
                    }     }
                , {
                    field: 'row', title: '座位行号', width: 100, sort: true, }
                , {
                    field: 'col', title: '座位列号', width: 100, sort: true, 
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
        layui.table.on('tool(orderList)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            const _id = data._id;
            if (layEvent === 'del') { //删除
                layer.confirm('真的删除行么', function (index) {
                    $.ajax({
                        url: '/api/order/del',
                        type: 'post',
                        data:{_id},
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
                localStorage['orderupdatedata'] = JSON.stringify(data);
                location.hash = '/info/orderUpdate';
            }
        });
    }
}