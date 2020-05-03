export default class {
    constructor(el) {
        this.el = $(el)
        this.template = 'movieUpdate'
    }
    init() {
        this.el.html(this.template)
        this.handle()
    }
    handle() {

    }
}