export default class{
    constructor(el){
        this.el = $(el)
        this.template = 'movieList'
        this.init()
    }
    init(){
        this.el.html(this.template)
        this.handle()
    }
    handle(){

    }
}