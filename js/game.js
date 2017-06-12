(function (Fly) {
    "use strict";

    function Game(config) {
        this.imgArr = ["birds", "land", "pipe1", "pipe2", "sky"];
        this.isStart = true;

        this.roles = [];
        this.delta = 0;
        this.hero = null;
        this.lastFrameTime = new Date();
        this.curFrameTime = 0;
        // 创建对象的时候就创建cnavas画布对象
        this.createCanvas(config.id);
    }
    Game.prototype = {
        constructor: Game,
        // 开始游戏
        start: function () {
            var that = this;
            Fly.loadImages(that.imgArr, function (imgList) {
                //初始化所有的游戏角色
                that.initRoles(imgList);
                // 渲染数据
                that.render(imgList);
                // 绑定点击事件
                that.bindEvent();
            });
        },
        // 初始化所有的游戏角色
        initRoles: function (imgList) {

            var context = this.ctx;
            var i;
            var imgSky = imgList.sky;
            var imgLand = imgList.land;
            var imgBird = imgList.birds;
            var imgPipe2 = imgList.pipe2;
            var imgPipe1 = imgList.pipe1;
            var that = this;

            // 创建小鸟对象
            this.hero = Fly.factory("Bird", {
                img: imgBird,
                ctx: context
            });
            // 每次创建路径都要判断是否订阅了
            // 添加小鸟碰撞消息的订阅:
            this.hero.addEventListener(function () {
                that.isStart = false;
            });

            // 创建两个天空对象
            for (i = 0; i < 2; i++) {
                var sky = Fly.factory("Sky", {
                    img: imgSky,
                    ctx: context,
                    x: i * imgSky.width
                });
                this.roles.push(sky);
            }
            // 绘制管道对象
            for (i = 0; i < 6; i++) {
                var pipe = Fly.factory("Pipe", {
                    imgTop: imgPipe2,
                    imgBottom: imgPipe1,
                    ctx: context,
                    spacePipe: 150,
                    x: i * imgPipe2.width * 3 + 300

                })
                this.roles.push(pipe);
            }
            // 创建4个陆地对象
            for (i = 0; i < 4; i++) {
                var land = Fly.factory("Land", {
                    img: imgLand,
                    ctx: context,
                    x: i * imgLand.width,
                    y: imgSky.height - imgLand.height
                });
                this.roles.push(land);
            }
        },
        bindEvent: function () {
            var that = this;
            that.ctx.canvas.addEventListener("click", function () {
                that.hero.changeSpeed(-0.3);
            });
        },
        render: function (imgList) {
            var that = this;
            var context = that.ctx;
            var cvW = context.canvas.width;
            var cvH = context.canvas.height;
            var bird = that.hero;

            (function renderGame() {

                // 保存绘制状态
                context.save();
                context.beginPath();
                context.clearRect(0, 0, cvW, cvH);

                that.curFrameTime = new Date();
                that.delta = that.curFrameTime - that.lastFrameTime;
                that.lastFrameTime = that.curFrameTime;
                that.roles.forEach(function (role) {
                    role.draw(that.delta);
                })
                // 绘制小鸟
                bird.draw(that.delta);

                // if (bird.y <= 0 || bird.y >= (imgList.sky.height - imgList.land.height) || context.isPointInPath(bird.x,
                //         bird.y)) {
                //     that.isStart = false;
                // }


                context.restore();
                if (that.isStart) {
                    requestAnimationFrame(renderGame);
                }
            })();

        },
        createCanvas: function (id) {
            var cv = document.createElement("canvas");
            cv.width = 800;
            cv.height = 600;
            cv.style.border = "1px solid red";
            var container = document.getElementById(id) || document.body;
            container.appendChild(cv);
            // 设置上下文
            this.ctx = cv.getContext("2d");
        }
    }


    // 游戏中，小鸟英雄在整个程序运行过程中只有一个，小鸟对象在game中创建的
    var instance = null;
    // 判断是否已经创建过对象，如果是第一次，没创建，就new一个，否则就直接返回实例对象
    Fly.getGame = function (config) {
        if (instance === null) {
            instance = new Game(config);
        }
        return instance;
    }
    // Fly.Game = Game;
})(Fly);