
export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
                <div class="cinemaUpdate-page">
                    <form class="layui-form" action="" id="cinemaUpdate" lay-filter="cinemaUpdate">
                        <div class="layui-form-item">
                            <label class="layui-form-label">影院名称</label>
                            <div class="layui-input-block">
                            <input type="text" name="name"  lay-verify="required" placeholder="请输入影院名" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">影院地址</label>
                            <div class="layui-input-block">
                            <input type="text" name="address" lay-verify="required" placeholder="请输入影院地址" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">影院电话</label>
                            <div class="layui-input-block">
                            <input type="text" name="phone" lay-verify="required" placeholder="请输入影院联系方式" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        
                        <div class="layui-form-item">
                            <label class="layui-form-label">是否营业</label>
                            <div class="layui-input-block">
                            <input type="radio" name="status" value="是" title="是" checked>
                            <input type="radio" name="status" value="否" title="否">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label"></label>
                            <div class="layui-input-block">
                            <input type="hidden" class="posterSrc">
                            <button type="button" class="layui-btn" id="poster-choose">
                                <i class="layui-icon">&#xe67c;</i>选择图片
                            </button>
                            <img src="" alt="" id="show-poster-update" width:100px; height:100px;>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                            <button type="button" id="cinema-upload-update" class="layui-btn" lay-submit lay-filter="cinemaUpdate">立即提交</button>
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            
                            </div>
                        </div>
                    </form>
                </div>
        `;
        this.init()
    }
    init() {
        this.el.html(this.template);
        this.handle()
    }
    handle() {
        let statu = false;
        layui.form.render();
        const cinemaupdatedata = JSON.parse(localStorage['cinemaupdatedata']);
        const _id = cinemaupdatedata._id;
        if (cinemaupdatedata.posterSrc) {
            $('#show-poster-update').attr('src', '../' + cinemaupdatedata.posterSrc)
        }
        layui.form.val('cinemaUpdate', cinemaupdatedata);
        localStorage.removeItem('cinemaupdatedata');
        layui.upload.render({
            url: '/single/posterUpload'
            , elem: '#poster-choose'
            , accept: 'images'
            , auto: false
            , bindAction: '#cinema-upload-update'
            , field: 'poster'
            , choose: function (obj) {
                obj.preview(function (index, file, result) {
                    $('#show-poster-update').attr('src', getFileURL(file));
                });
            }
            , done: function (res, index, upload) {
                
                cinemaupdatedata.posterSrc = res.path;
                //获取当前触发上传的元素，一般用于 elem 绑定 class 的情况，注意：此乃 layui 2.1.0 新增
            }
        })

        layui.form.verify({
            choose: function () {
                if (!cinemaupdatedata.posterSrc) {
                    return '请选择一张图片'
                } 
            }
        })
        layui.form.on('submit(cinemaUpdate)', function (data) {
            let timeid = setTimeout(() => {

                Object.assign(cinemaupdatedata, data.field)
                delete cinemaupdatedata.poster;
                $.ajax({
                    url: '/api/cinema/update',
                    type: 'post',
                    data: cinemaupdatedata,
                    success({ statu, msg }) {
                        layer.msg(msg)
                        if (statu) {
                            clearInterval(timeid);
                            location.hash = '/info/cinemaList'
                        }
                    }
                })


            }, 500);
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}