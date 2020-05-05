
export default class {
    constructor(el) {
        this.el = $(el);
        this.template =
            `
                <div class="cinemaAdd-page">
                    <form class="layui-form" action="" id="cinemaAdd" lay-filter="cinemaAdd">
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
                            <input type="hidden" lay-verify="choose" name="posterSrc" class="posterSrc">
                            <button type="button" class="layui-btn" id="poster-choose">
                                <i class="layui-icon">&#xe67c;</i>选择图片
                            </button>
                            <img src="" alt="" id="show-poster" width:100px; height:100px;>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                            <button type="button" id="cinema-upload" class="layui-btn" lay-submit lay-filter="cinemaAdd">立即提交</button>
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
        let posterSrc;
        let statu = false;
        layui.form.render();
        layui.upload.render({
            url: '/cinema/upload'
            , elem: '#poster-choose'
            , accept: 'images'
            , auto: false
            , bindAction: '#cinema-upload'
            , field: 'poster'
            , choose: function (obj) {
                obj.preview(function (index, file, result) {
                    $('#show-poster').attr('src', getFileURL(file));
                })
                //obj.resetFile(index, file, '123.jpg'); //重命名文件名，layui 2.3.0 开始新
            }
            , done: function (res, index, upload) {
                posterSrc = res.path;
                statu = true;
                //获取当前触发上传的元素，一般用于 elem 绑定 class 的情况，注意：此乃 layui 2.1.0 新增
            }
        })
        layui.form.verify({
            choose: function () {
                if (!$('#show-poster').attr('src')){
                    return '请选择一张图片'
                }
            }
        })
        layui.form.on('submit(cinemaAdd)', function (data) {
            let timeid = setInterval(() => {
                if(statu){
                    Object.assign(data.field, { posterSrc })
                    delete data.field.poster;
                    $.ajax({
                        url: '/api/cinema/add',
                        type: 'post',
                        data: data.field,
                        success({ statu, msg }) {
                            layer.msg(msg)
                            if (statu) {
                                $('#show-poster').attr('src', '');
                            }
                        }
                    })
                    clearInterval(timeid);
                }
                
            }, 1);
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    }
}