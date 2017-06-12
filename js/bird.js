(function (Fly) {
  "use strict";
  // 构造函数
  // 配置是一个对象
  function Bird(config) {

    this.img = config.img;
    this.ctx = config.ctx;

    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.frameIndex = 0;
    this.x = 100;
    this.y = 100;
    // 初速度
    this.speed = 0;
    // 时间间隔
    this.delta = 0;
    // 加速度
    this.a = 0.0005;
    this.curFrameTime = 0;
    this.maxAngle = 45;
    this.curAngle = 0;
    this.maxSpeed = 0.3;

    //创建一个数组，存放订阅者的方法，回调函数
    this.listeners = [];
  }
  // 原型对象
  Bird.prototype = {
    constructor: Bird,
    draw: function (delta) {

      // 每一次绘制小鸟, 都检测小鸟是否发生碰撞
      this.isDie();

      this.speed += this.a * delta;
      this.y += this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2);

      //计算角度
      this.curAngle = this.speed / this.maxSpeed * this.maxAngle;
      if (this.curAngle > this.maxAngle) {
        this.curAngle = this.maxAngle;
      } else if (this.curAngle < -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      }

      //先平移在旋转
      //小鸟往前走，平移，在旋转
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(Fly.toRadian(this.curAngle));
      //旋转之后的坐标需要改变
      //通过计算，应该是小鸟的中心点
      // 制作序列帧动画
      this.ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);
      this.frameIndex %= 3;
    },
    // 碰撞检测方法
    isDie: function () {
      if (this.y <= 0 || this.y >= (600 - 112) || this.ctx.isPointInPath(this.x,
          this.y)) {
        // that.isStart = false;

        // 遍历数组中的订阅者的方法，执行里面的函数，
        this.listeners.forEach(function (fn) {
          fn();
        })

      }
    },
    // 发布消息订阅者的方法添加到数组中
    addEventListener: function (fn) {
      this.listeners.push(fn);
    },
    changeSpeed: function (speed) {
      this.speed = speed;
    }
  }
  // 将Bird暴露在全局变量中
  Fly.Bird = Bird;
})(Fly);