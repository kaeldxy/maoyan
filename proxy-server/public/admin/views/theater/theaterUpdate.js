export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
            <div class="theaterUpdate-page">
                <form class="layui-form" action="" lay-filter="theaterUpdate">
                    <div class="layui-form-item">
                        <label class="layui-form-label">放映厅名称</label>
                        <div class="layui-input-block">
                        <input type="text" name="name"  lay-verify="required" placeholder="请输入放映厅名称" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">是否营业</label>
                        <div class="layui-input-block">
                        <input type="radio" name="status" value="是" title="是">
                        <input type="radio" name="status" value="否" title="否">
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <label class="layui-form-label">从属影院</label>
                        <div class="layui-input-block">
                            <select name="cinemaId" lay-verify="required">
                                <option value="">请选择从属影院</option>
                                
                            </select>     
                        </div>
                    </div>

                    <div class="seat-click">
                        <div class="seat-click-tilte"><span>当前座位数据</span></div>
                        <div class="seat-click-box"></div>
                    </div>

                    <input type="hidden" lay-verify="seatChecked" />
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="theaterUpdate">修改</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                        </div>
                    </div>
                </form>
            </div>
            `;
        this.init();
    }
    init() {
        this.el.html(this.template);
        layui.form.render();
        this.handle();
    }
    handle() {
        const theaterupdatedata = JSON.parse(localStorage['theaterupdatedata']);
        localStorage.removeItem('theaterupdatedata');
        theaterupdatedata.cinemaId = theaterupdatedata.cinemaId._id;
        $.ajax({
            url: '/api/cinema/get',
            type: 'get',
            async: false,
            data: { condition: { all: 'all' } },
            success(data) {
                const str = data
                    .map(item => `<option value="${item._id}">${item.name}<option>`)
                    .join('');
                $('[name="cinemaId"]').append(str);
                layui.form.render()
            }
        })
        layui.form.val('theaterUpdate', theaterupdatedata);
        // ../images/bg/pt.png // ../images/bg/ys.png
        const divStr = theaterupdatedata.seat
        .map((item, index) => `<div data-checked=${item}><img src="${item ? '../images/bg/ys.png' : '../images/bg/pt.png'}" alt="${index}" /></div>`)
        .join('')
        $('.seat-click-box').append(divStr);
        
        $('.seat-click-box').on('click', 'div', function () {
            const $img = $(this).children('img');
            const checked = JSON.parse(this.dataset.checked);
            if (checked) {
                $img.attr('src', '../images/bg/pt.png')
                this.dataset.checked = 'false'
            } else {
                $img.attr('src', '../images/bg/ys.png')
                this.dataset.checked = 'true';
            }
            const index = $(this).children().attr('alt')
            theaterupdatedata.seat[index - 0] = !theaterupdatedata.seat[index - 0];
        })

        layui.form.verify({
            seatChecked: function (params) {
                if (_.compact(theaterupdatedata.seat).length === 0) {
                    return '请选择座位';
                }
            }
        })

        layui.form.on('submit(theaterUpdate)', function (data) {
            Object.assign(theaterupdatedata, data.field);
            theaterupdatedata.seat = JSON.stringify(theaterupdatedata.seat);
            $.ajax({
                url: '/api/theater/update',
                type: 'post',
                data: theaterupdatedata,
                success({ statu, msg }) {
                    layer.msg(msg)
                    location.hash = '/info/theaterList'
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}