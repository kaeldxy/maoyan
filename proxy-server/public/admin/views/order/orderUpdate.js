export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
        <div class="orderUpdate-page">
            <form class="layui-form" action="" lay-filter="orderUpdate" >
                
                <div>当前订单信息</div>
                <table id="current-schedule" lay-filter="current-schedule" class="layui-table">
                    <thead>
                        <tr>
                        <th>编号</th>
                        <th>用户</th>
                        <th>电影名</th>
                        <th>影院名</th>
                        <th>影院地址</th>
                        <th>放映厅名</th>
                        <th>放映时间</th>
                        <th>价格</th>
                        <th>座位行号</th>
                        <th>座位列号</th>
                        </tr> 
                    </thead>
                </table>

                <div class="layui-form-item">
                    <label class="layui-form-label">更改用户</label>
                    <div class="layui-input-inline">
                        <select name="frontUserId" lay-verify="required">
                            <option value="">请选用户</option>
                        </select>
                     </div>
                </div>
                <div>更改排片</div>
                <table id="check-schedule-update" lay-filter="check-schedule-update"></table>

                <div class="seat-box">
                    <div class="seat-title" style="display:none;">
                    <div><img src="../images/bg/ys.png"/> 已有其他订单选择</div>
                    <div><img src="../images/bg/pt.png"/> 空位</div>
                        <p class="current-seatNum"></p>
                    </div>
                    <div class="seat-area">
                    </div>
                </div>
                <input type="hidden" name="row" lay-verify="xzseat"/>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="orderUpdate">提交</button>
                    </div>
                </div>
            </form>
        </div>
            `;
        this.init();
    }
    init() {
        this.el.html(this.template);
        this.handle();
        layui.form.render()
    }
    handle() {
        const orderupdatedata = JSON.parse(localStorage['orderupdatedata']);
        localStorage.removeItem('orderupdatedata');
        const currentTableStr = 
        `<tr>
            <td>${orderupdatedata._id}</td>
            <td>${orderupdatedata.frontUserId.userName}</td>
            <td>${orderupdatedata.scheduleId.movieId.cname}</td>
            <td>${orderupdatedata.scheduleId.cinemaId.name}</td>
            <td>${orderupdatedata.scheduleId.cinemaId.address}</td>
            <td>${orderupdatedata.scheduleId.theaterId.name}</td>
            <td>${orderupdatedata.scheduleId.showTime}</td>
            <td>${orderupdatedata.scheduleId.price}</td>
            <td>${orderupdatedata.row}</td>
            <td>${orderupdatedata.col}</td>
        </tr>`
        $('#current-schedule').append(currentTableStr);
        // 请求所有的前台用户数据
        //需要用到 userName _id 字段  渲染下拉选择框  直接渲染 不需要再使用 
        $.ajax({
            url: '/api/user/get',
            data: {
                userType: 'front',
                condition: { all: 'all' }
            },
            type: 'get',
            success(data) {
                const str = data.map(item => `<option value="${item._id}">${item.userName}</option>`)
                    .join('');
                $('[name="frontUserId"]').append(str);
                $('[name="frontUserId"]').val(orderupdatedata.frontUserId._id);
                layui.form.render();
            }
        })

        // 请求所有的排片信息  
        // 需要用 影片名 movieId.cname 
        // 影院名 cinemaId.name 影院地址 cinemaId.address
        // 放映厅名 theaterId.name 放映厅的座位结构 theaterId.seat =》 渲染座位结构 
        // 放映时间 showTime  价格price 
        // 用表格展示 
        layui.table.render({
            elem: '#check-schedule-update'
            , url: '/api/schedule/get' //数据接口
            , page: true
            , limit: 5
            , limits: [5, 10, 15]
            , cols: [[ //表头
                { field: '_id', title: '编号', width: 200, sort: true, fixed: 'left' }
                , {
                    field: 'movieId', title: '电影名称', width: 80, templet: function (d) {
                        return d.movieId.cname;
                    }
                }
                , {
                    field: 'cinemaId', title: '影院', width: 160, sort: true, templet: function (d) {
                        return d.cinemaId.name;
                    }
                }
                , {
                    field: 'cinemaId', title: '地址', width: 160, sort: true, templet: function (d) {
                        return d.cinemaId.address;
                    }
                }
                , {
                    field: 'theaterId', title: '放映厅', width: 160, sort: true, templet: function (d) {
                        return d.theaterId.name;
                    }
                }
                , {
                    field: 'showTime', title: '放映时间', width: 160, sort: true
                }
                , {
                    field: 'price', title: '价格', width: 100, sort: true
                }
                , {
                    fixed: 'right', title: 'choose', width: 60, align: 'center', type: 'radio', event: 'choose'
                }
            ]]
        });
        let scheduleId = null;
        let row = null;
        let col = null;
        layui.table.on('tool(check-schedule-update)', function (obj) {
            var data = obj.data;
            $('.seat-title').css('display', 'flex');
            const seat = data.theaterId.seat; //座位结构 数组
            scheduleId = data._id; // 此条排片的_id
            // 请求所有的 订单信息，所有的订单信息的row col 字段 表示哪里已经被购买  需要在
            // 选择排片的时候，发送ajax  拿到数据渲染出已经被购买的 座位
            $('.current-seatNum').html('');
            row = col = null;
            $.ajax({
                url: '/api/order/get',
                data: {
                    condition: { scheduleId }
                },
                type: 'get',
                success(data) {
                    const checkedArr = data.map(item => (item.row * 9) - 9 + item.col - 1);
                    renderSeat(seat, checkedArr);
                }
            })
        }); // 点击表格事件
        $('.seat-area').on('click', 'div', function () {
            const index = $('.seat-area>div').index(this);
            if ($(this).hasClass('haveImg')) {
                if (!$(this).hasClass('not-click')) {
                    row = Math.ceil((index + 1) / 9);
                    col = index - (row - 1) * 9 + 1;
                } else {
                    this.checked = false;
                    row = null;
                    col = null;
                }
            } else {
                this.checked = false;
                row = null;
                col = null;
            }
            const $filterDiv = $('.seat-area>div').filter('.haveImg').not('.not-click').not(this);
            $filterDiv.children('img').attr('src', '../images/bg/pt.png')
            const $img = $(this).children('img');
            if (this.checked) {
                $img.attr('src', '../images/bg/pt.png');
                this.checked = false;
            } else {
                $img.attr('src', '../images/bg/ys.png');
                this.checked = true;
            }
            if (row) {
                $('.current-seatNum').html('行： ' + row + ' 列： ' + col);
            } else {
                $('.current-seatNum').html('')
            }
        })  // 点击座位图的事件


        layui.form.verify({
            xzseat: function () {
                if (!row) {
                    return '请选择座位'
                }
            }
        }) //表单提交的验证


        function renderSeat(arr, checkedArr) { // 传入原始的 座位 结构数组  传入 已经被选择的 座位数组，[{row, col},{row, col}]
            const htmlstr = arr
                .map((item) => `<div class="${item ? 'haveImg' : 'none'}">${item ? '<img src="../images/bg/pt.png" />' : ''}</div>`)
                .join('');
            $('.seat-area').html(htmlstr);
            checkedArr.forEach(item => {
                $($('.seat-area>div')[item]).addClass('not-click').children('img').attr('src', '../images/bg/ys.png').attr('alt', 'disable')
            });
        }// 渲染座位的方法

        layui.form.on('submit(orderUpdate)', function (data) {
            delete data.field.layTableRadio_2;
            delete data.field.row;
            Object.assign(orderupdatedata, { row, col, scheduleId })
            Object.assign(orderupdatedata, data.field)
            $.ajax({ // 添加
                url: '/api/order/update',
                type: 'post',
                data: orderupdatedata,
                success({statu, msg}) {
                   layer.msg(msg);
                    location.hash = '/info/orderList'
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });


    }
}