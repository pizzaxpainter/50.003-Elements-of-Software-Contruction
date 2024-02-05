function f(x,y) {
    if ((x==0) || (y>0)) {
        y = y/x;
    } else {
        x = y++;
    }
    return x + y;
}

module.exports = f;