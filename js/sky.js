(function (Fly) {
    "use strict";
    // 放一些配置文件的
    function Sky(config) {
        this.img = config.img;
        this.ctx = config.ctx;
        this.x = config.x;
        this.imgW = this.img.width;
        this.imgH = this.img.height;
        this.y = 0;
        this.speed = 0.15;
    }
    Sky.prototype.draw = function (delta) {
        this.x -= this.speed * delta;
        if (this.x <= -this.imgW) {
            this.x += this.imgW * 2;
        }
        this.ctx.drawImage(this.img, this.x, this.y);

    }
    Fly.Sky = Sky;


})(Fly)