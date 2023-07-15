class FibSeq {
    constructor() {
        this.prev = 0;
        this.curr = 1;
    }
    next() {
        let res = this.prev + this.curr;
        this.prev = this.curr;
        this.curr = res;
        return res;
    }
}

module.exports = FibSeq;