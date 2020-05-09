export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
            <div class="theaterAdd-page">
                <form class="layui-form" action="" lay-filter="theaterAdd">
                    <div class="layui-form-item">
                        <label class="layui-form-label">放映厅名称</label>
                        <div class="layui-input-block">
                        <input type="text" name="name"  lay-verify="required" placeholder="请输入放映厅名称" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">是否营业</label>
                        <div class="layui-input-block">
                        <input type="radio" name="status" value="是" title="是" checked>
                        <input type="radio" name="status" value="否" title="否" >
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
                        <div class="seat-click-tilte"><span>点击座位生成座位数据</span></div>
                        <div class="seat-click-box"></div>
                    </div>

                    <input type="hidden" lay-verify="seatChecked" />
                    <div class="layui-form-item"> 
                        <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="theaterAdd">添加</button>
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
        $.ajax({
            url:'/api/cinema/get',
            type:'get',
            async: false,
            data: {condition:{all:'all'}},
            success(data){
                const str = data
                .map(item => `<option value="${item._id}">${item.name}<option>`)
                .join('');
                $('[name="cinemaId"]').append(str);
                layui.form.render()
            }
        })
        const seatArr = [];
        seatArr.length = 81;
        _.fill(seatArr, `<div><img src="../images/bg/pt.png"/></div>`, 0, 81);
        $('.seat-click-box').append(seatArr.join(''));
        _.fill(seatArr, false, 0, 81);
        const $div = $('.seat-click-box>div');
        $('.seat-click-box').on('click', 'div', function () {
            const $img = $(this).children('img');
            if(this.click_checked){
                $img.attr('src', '../images/bg/pt.png')
                this.click_checked = false;
            }else{
                $img.attr('src', '../images/bg/ys.png')
                this.click_checked = true;
            }
            const index = $div.index(this);
            seatArr[index] = !seatArr[index];
        })
        
        layui.form.verify({
            seatChecked: function (params) {
                if (_.compact(seatArr).length === 0){
                    return '请选择座位';
                }
            }
        })
        
        layui.form.on('submit(theaterAdd)', function (data) {
                data.field.seat = JSON.stringify(seatArr);
                $.ajax({
                    url: '/api/theater/add',
                    type: 'post',
                    data: data.field,
                    success({ statu, msg }) {
                        layer.msg(msg)
                        location.hash = '/info/theaterList'
                        // layui.form.val('theaterAdd', {});
                    }
                })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}