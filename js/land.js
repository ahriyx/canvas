(function (Fly) {
    "use strict";
    // 构造函数
    function Land(config) {
        this.img = config.img;
        this.ctx = config.ctx;
        this.x = config.x;
        this.y = config.y;

        this.imgW = this.img.width;
        this.speed = 0.15;


    }
    // 原型对象
    Land.prototype.draw = function (delta) {
        this.x -= this.speed * delta;
        if (this.x < -this.imgW) {
            this.x += this.imgW * 4;
        }
        this.ctx.drawImage(this.img, this.x, this.y);
    }
    Fly.Land = Land;

})(Fly);