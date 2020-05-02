export default class {
    constructor(el) {
        this.el = $(el)
        this.template = 'movieAdd'
    }
    init() {
        this.el.html(this.template)
        this.handle()
    }
    handle() {

    }
}