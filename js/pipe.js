(function (Fly) {
    "use strict";

    function Pipe(config) {
        this.imgTop = config.imgTop;
        this.imgBottom = config.imgBottom;

        this.ctx = config.ctx;
        this.speed = 0.15;
        //两个管道上下之间的距离间隙
        this.spacePipe = config.spacePipe;


        this.imgW = this.imgTop.width;
        this.imgH = this.imgTop.height;
        this.topY = 0;
        this.bottomY = 0;
        this.x = config.x;

        // 管道的高度是创建对象的时候，生成的！
        this.initPipeHeight();

    }
    Pipe.prototype.draw = function (delta) {
        this.x -= this.speed * delta;
        if (this.x <= -this.imgW * 3) {
            this.x += this.imgW * 3 * 6;
            this.initPipeHeight();

        }
        // 为每一个管道描绘路径
        this.ctx.rect(this.x, this.topY, this.imgW, this.imgH);
        this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);


        this.ctx.drawImage(this.imgTop, this.x, this.topY);
        this.ctx.drawImage(this.imgBottom, this.x, this.bottomY);
    }
    Pipe.prototype.initPipeHeight = function () {
        // 随机生成管道的高度上管道
        var pipeTopHeight = Math.random() * 200 + 50;
        // 下面管道的y坐标
        this.bottomY = pipeTopHeight + this.spacePipe;
        // 上管道的y坐标
        this.topY = pipeTopHeight - this.imgH;
    }
    Fly.Pipe = Pipe;
})(Fly);