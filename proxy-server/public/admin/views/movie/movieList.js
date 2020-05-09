export default class {
    constructor(el) {
        this.el = $(el)
        this.template = `<table id="movieList" lay-filter="movieList"></table>`
        this.init()
    }
    init() {
        this.el.html(this.template)
        layui.element.render()
        this.handle()
    }
    handle() {
        layui.use('table', function () {
            var table = layui.table;
            table.render({
                elem: '#movieList'
                , height: 312
                ,limits: [5, 10, 15, 20, 25]
                , url: "/api/movie/get" //数据接口
                , page: true //开启分页
                , cols: [[ //表头
                    { field: '_id', title: '编号', width: 80, sort: true, fixed: 'left' }
                    , { field: 'cname', title: '中文名', width: 80 }
                    , { field: 'ename', title: '英文名', width: 80, }
                    , { field: 'type', title: '类型', width: 80, templet: function (d) {
                        return d.type.join(' ')
                    } }
                    , {
                        field: 'area', title: '首映地区', width: 80 }
                    , {
                        field: 'poster', title: '海报', width: 80, templet: function (d) {
                            return `<img src="../${d.poster}" style="width:100%; height:100%;" />`
                        } }
                    , { field: 'time', title: '电影时⻓', width: 80, }
                    , { field: 'upDate', title: '电影⼤陆上映时间', width: 80 }
                    , { field: 'UserScore', title: '用户评分', width: 80, }
                    , { field: 'professionScore', title: '专业评分', width: 80, }
                    , { field: 'count', title: '电影票房', width: 80 }
                    , { field: 'intro', title: '剧情简介', width: 135, }
                    , { field: 'isClassic', title: '经典', width: 40, }
                    , { field: 'isHotShow', title: '热映', width: 40, }
                    , { field: 'isHotPlay', title: '热播', width: 40 }
                    , { field: 'director', title: '导演', width: 80, }
                    , { field: 'actor', title: '演员', width: 80, }
                    , {
                       title: '剧集', width: 80, templet: function (d) {
                           return d.episode.map(item => `<img src="../${item}" style="width:100%; height:100%;" />`).join('')
                        } }
                    , {
                        fixed: 'right', width: 140, align: 'center', toolbar:
                            `
                     <div class="layui-btn-group">
                     <button type="button" class="layui-btn layui-btn-sm" lay-event="update">
                         <i class="layui-icon">&#xe642;</i>
                     </button>
                     <button type="button" class="layui-btn layui-btn-sm" lay-event="del">
                         <i class="layui-icon">&#xe640;</i>
                     </button>
                 </div>
                    ` } 
                ]]
            });
        });

        layui.table.on('tool(movieList)', function (obj) { 
            var data = obj.data; 
            var layEvent = obj.event; 
            if (layEvent === 'del') { //删除
                layer.confirm('真的删除此电影吗么', function (index) {
                    $.ajax({
                        url: "/api/movie/del",
                        type: "post",
                        data: { "_id": data._id },
                        success({statu, msg}) {
                            layer.msg(msg);
                            if(statu){
                                obj.del(); 
                            }
                            layer.close(index)
                        }
                    })
                    //向服务端发送删除指令
                });
            }
            else if (layEvent === 'update') { //编辑
                localStorage['movieupdatedata'] = JSON.stringify(data);
                location.hash = '/info/movieUpdate'
            }
        });
    }
}