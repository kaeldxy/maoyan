export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
            <form class="layui-form" action="" lay-filter="scheduleUpdate">
                <div class="layui-form-item">

                    <div class="layui-inline">
                        <label class="layui-form-label">排片信息</label>
                        <div class="layui-input-inline" style="width: 150px;">
                            <select name="movieId" lay-verify="required">
                                <option value="">请选择电影</option>
                                
                            </select>     
                        </div>
                        <div class="layui-form-mid">-</div>
                        <div class="layui-input-inline" style="width: 240px;">
                            <select name="cinemaId" lay-verify="required" lay-filter="cinema-select">
                                <option value="">请选择影院</option>
                                
                            </select>
                        </div>
                        <div class="layui-form-mid">-</div>
                        <div class="layui-input-inline" style="width: 150px;">
                            <select name="theaterId" lay-verify="required">
                                <option value="">请选择放映厅</option>
                                
                            </select>
                        </div>
                    </div>
                </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">放映时间</label>
                        <div class="layui-input-block">
                        <input type="text" name="showTime"  lay-verify="required" placeholder="请输入放映时间" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">价格</label>
                        <div class="layui-input-block">
                        <input type="text" name="price"  lay-verify="required|number" placeholder="请输入价格" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="scheduleUpdate">立即提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                        </div>
                    </div>
            </form>
        `;
        this.init();
    }
    init() {
        this.el.html(this.template);
        layui.form.render()
        this.handle()
    }
    handle() {
        const scheduleupdatedata = JSON.parse(localStorage['scheduleupdatedata'])
        localStorage.removeItem('scheduleupdatedata');
        scheduleupdatedata.cinemaId = scheduleupdatedata.cinemaId._id;
        scheduleupdatedata.movieId = scheduleupdatedata.movieId._id;
        scheduleupdatedata.theaterId = scheduleupdatedata.theaterId._id;
        $.ajax({
            url: '/api/movie/get',
            type: 'get',
            async: false,
            data: {
                condition: {
                    all: 'all',
                }
            },
            success(data) {
                const str = data
                    .map(item => `<option value="${item._id}">${item.cname}<option>`)
                    .join('')
                $(str).appendTo('select[name="movieId"]');
                layui.form.render()
            }
        })
        $.ajax({
            url: '/api/cinema/get',
            type: 'get',
            async: false,
            data: {
                condition: {
                    all: 'all',
                }
            },
            success(data) {
                const str = data
                    .map(item => `<option value="${item._id}">${item.name}<option>`)
                    .join('')
                $(str).appendTo('select[name="cinemaId"]');
                layui.form.render()
            }
        })
        getTheater(scheduleupdatedata.cinemaId);
        layui.form.val('scheduleUpdate', scheduleupdatedata);
        layui.form.on('select(cinema-select)', function (data) {
            const cinemaId = data.value;
            if (cinemaId) {
                getTheater(cinemaId);
            }
        });
        layui.form.on('submit(scheduleUpdate)', function (data) {
            data.field.price = ~~data.field.price;
            Object.assign(scheduleupdatedata, data.field)
            $.ajax({
                url: '/api/schedule/update',
                type: 'post',
                data: scheduleupdatedata,
                success({ statu, msg }) {
                    layer.msg(msg);
                    location.hash = '/info/scheduleList'
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        })
        function getTheater(cinemaId) {
            $.ajax({
                url: '/api/theater/get',
                type: 'get',
                async: false, 
                data: {
                    condition: {
                        cinemaId
                    }
                },
                success(data) {
                    const str = data
                        .map(item => `<option value="${item._id}">${item.name}<option>`)
                        .join('')
                    $('select[name="theaterId"]').html(`<option value="">请选择放映厅</option>`).append(str);
                    layui.form.render()
                }
            })
        }
    }
}