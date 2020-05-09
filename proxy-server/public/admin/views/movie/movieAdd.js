export default class {
	constructor(el) {
		this.el = $(el)
		this.template =
			`
		<div class="movieAdd-page">
			<form class="layui-form layui-form-pane" lay-filter="movieAdd">
				<div class="layui-form-item">
					<label class="layui-form-label">中文名</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="cname" lay-verify="username" placeholder="请输入中文名" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">英文名</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="ename" placeholder="请输入英文名" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">类型</label>
					<div class="layui-input-inline" style="width: 200px;">
						<select name="type1" id="" lay-verify="required">
							<option value="">请选择类型</option>
							<option value="爱情">爱情</option>
							<option value="音乐">音乐</option>
							<option value="励志">励志</option>
							<option value="动作">动作</option>
							<option value="战争">战争</option>
							<option value="记录">记录</option>
							<option value="喜剧">喜剧</option>
							<option value="历史">历史</option>
						</select>
					</div>
					<div class="layui-form-mid">-</div>
					<div class="layui-input-inline"  style="width: 200px;">
						<select name="type2" id="" lay-verify="required">
							<option value="">请选择类型</option>
							<option value="犯罪">犯罪</option>
							<option value="恐怖">恐怖</option>
							<option value="伦理">伦理</option>
							<option value="科幻">科幻</option>
							<option value="枪战">枪战</option>
							<option value="惊悚">惊悚</option>
							<option value="动画">动画</option>
							<option value="悬疑">悬疑</option>
							<option value="搞笑">搞笑</option>
						</select>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">首映地区</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="area" placeholder="请输入地区" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-inline">
						<label class="layui-form-label">电影海报</label>
						<div class="layui-input-block">
							<button type="button" class="layui-btn" id="movie-poster-choose">
								<i class="layui-icon">&#xe67c;</i>选择图片
							</button>
							<input type="hidden" lay-verify="uploadPosterVerify">
							<button type="button" class="layui-btn" id="movie-poster-upload">
								<i class="layui-icon">&#xe67c;</i>上传图片
							</button>
						</div>
					</div>
					<div class="layui-inline">
						<label class="layui-form-label" style="background:none; outline:none; border: none;">图片预览</label>
						<div class="layui-input-block">
							<img src="" alt="" class="show-movie-poster" style="width:120px; height:80px;">
						</div>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电影时长</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="time" placeholder="请输入时长" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">大陆上映时间</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="upDate" placeholder="请输入电影大陆上映时间" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">用户评分</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required|number" name="UserScore" placeholder="请输入评分" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">专业评分</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="professionScore" placeholder="请输入专业评分" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电影票房</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="count" placeholder="请输入票房" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">剧情简介</label>
					<div class="layui-input-block">
						<textarea name="intro" lay-verify="required" placeholder="请输入内容" class="layui-textarea"></textarea>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">目前状态</label>
					<div class="layui-input-block">
						
						<div class="layui-input-inline" style="width: 100px;">
							<input type="checkbox" class="current-state" data-state="isClassic"  title="经典">
						</div>
						
						<div class="layui-input-inline" style="width: 100px;">
							<input type="checkbox" class="current-state" data-state="isHotShow"  title="热映">
						</div>
						
						<div class="layui-input-inline" style="width: 100px;">
							<input type="checkbox" class="current-state" data-state="isHotPlay" title="热播">
						</div>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">电影技术</label>
					<div class="layui-input-block">
						<input type="radio" name="Sharpness"  value="3DMAX" title="3DMAX" checked>
						<input type="radio" name="Sharpness"  value="3D" title="3D">
						<input type="radio" name="Sharpness"  value="2DMAX" title="2DMAX">
						<input type="radio" name="Sharpness"  value="2D" title="2D">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">导演</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="director" placeholder="请输入导演" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">演员</label>
					<div class="layui-input-block">
						<input type="text" lay-verify="required" name="actor" placeholder="请输入演员" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-inline">
						<label class="layui-form-label">电影剧集</label>
						<div class="layui-input-block">
							<label class="layui-btn" for="movie-episode-files">
								<i class="layui-icon">&#xe67c;</i>选择图片
							</label>

							<input type="file" multiple="multiple"  name="movie-episode-files"  id="movie-episode-files" style="display:none">

							<input type="hidden" lay-verify="uploadEpisodeVerify">
							<button type="button" class="layui-btn" id="movie-episode-upload">
								<i class="layui-icon">&#xe67c;</i>上传图片
							</button>
						</div>
					</div>
					<div class="layui-inline">
						<label class="layui-form-label" style="background:none; outline:none; border: none;">图片预览</label>
						<div class="layui-input-block">
							<div class="show-movie-poster"></div>
							
						</div>
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block">
					<button type="button" class="layui-btn" lay-submit lay-filter="movieAdd">立即提交</button>
					<button type="reset" class="layui-btn layui-btn-primary">重置</button>
					</div>
  				</div>
			</form>
    	</div>
        `
		this.init()
	}
	init() {
		this.el.html(this.template);
		this.handle()
	}
	handle() {
		const type = []; // 类型数组
		let episode; //剧集数组
		let poster; // 海报地址
		const stateValue = {
			isClassic: false,
			isHotShow: false,
			isHotPlay: false
		}
		
		layui.form.render();
		layui.upload.render({ // 电影海报 的单文件上传接口
			elem: '#movie-poster-choose'
			, url: '/single/posterUpload'
			, auto: false
			, accept: 'images'
			, bindAction: '#movie-poster-upload'
			, field: 'poster'
			, choose: function (obj) {
				obj.preview(function (index, file, result) {
					$('.show-movie-poster').attr('src', result);
				});
			}
			, done: function (res, index, upload) {
				poster = res.path;
				layer.msg('上传成功');
			}
		})
		// 将layui 自动渲染的file 标签name 属性设为空，避免拿表单字段的时候混乱
		$('[name="poster"]').attr('name', '');
		$('#movie-episode-files').on('input', function () {
			const files = this.files;
			if (files.length > 5) {
				layer.msg('不能超过5张图片,请重新选择图片');
				for (const key in files) {
					if (key !== 'length' && key !== 'item') {
						delete files[key];
					}
				}
				this.value = '';
				return
			}
			let str = '';
			for (const key in files) {
				if (key !== 'length' && key !== 'item') {
					str += `<img src="${getFileURL(files[key])}" alt=""  style="width:120px; height:80px;">`
				}
			}
			$('.show-movie-poster').html(str)
		})

		$('#movie-episode-upload').on('click', function () {
			const formData = new FormData()
			const files = $('#movie-episode-files')[0].files;
			for (const key in files) {
				if (key !== 'length' && key !== 'item') {
					formData.append('episode', files[key])
				}
			}
			$.ajax({
				url: '/array/episode',
				type: 'post',
				data: formData,//*** 
				cache: false,//上传文件无需缓存
				contentType: false,//*** //数据的解析类型，不需要，我们上传2进制数据，没有类型
				processData: false,//*** //用于对data参数进行序列化处理 这里必须false
				success(data) {
					layer.msg('上传成功');
					episode = data;
				}
			})
		})
		layui.form.verify({ // 表单提交验证
			uploadPosterVerify: function () {
				if (!poster) {
					return '请先上传电影海报图片'
				}
			},
			uploadEpisodeVerify: function () {
				if (!episode) {
					return '请先上传电影剧集图片'
				}
			}
		})
		layui.form.on('submit(movieAdd)', function (data) {
			type.push(data.field.type1)
			type.push(data.field.type2)
			delete data.field['movie-episode-files'];
			delete data.field.type1;
			delete data.field.type2;
			Object.assign(data.field, {
				type,
				episode,
				poster,
			})
			$('.current-state').each(function () {
				const key = this.dataset.state;
				stateValue[key] = this.checked;
			})
			Object.assign(data.field, stateValue)
			data.field.type = JSON.stringify(data.field.type);
			data.field.episode = JSON.stringify(data.field.episode);
			$.ajax({
				url:'/api/movie/add',
				type:'post',
				data: data.field,
				success({statu, msg}){
					layer.msg(msg);
					if(statu){
						layui.form.val('movieAdd', {});
						location.hash = '/info/movieList'
					}
				}
			})
			return false;
		})
	}
}