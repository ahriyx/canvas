(function (window) {
  'use strict';
  var FlyObj = {};

  FlyObj.loadImages = function (srcList, callback) {
      // 由于加载多张图片，不知道那张图片先加载完成，所以封装函数，定义一个count，先加载完成，就++
      var obj = {};
      var length = srcList.length,
        count = 0;
      srcList.forEach(function (value) {
        var img = new Image();
        img.src = "../images/" + value + ".png";
        obj[value] = img;
        console.log(obj);
        img.onload = function () {
          count++;
          if (count >= length) {
            callback(obj);
          }
        };
      });
    },
    FlyObj.toRadian = function (angle) {
      // 角度转弧度
      return angle / 180 * Math.PI;
    },




    // 由于每次创建天空，小鸟，陆地和管道对象，每次都要new一个对象，比较麻烦
    //1. 使用工厂模式创建对象隐藏了创建对象的细节
    //2.创建对象更加方便
    //3.统一处理了对象的过程，开发维护更加方便
    FlyObj.factory = function (type, config) {
      switch (type) {
        case "Bird":
          return new FlyObj.Bird(config);
        case "Sky":
          return new FlyObj.Sky(config);
        case "Pipe":
          return new FlyObj.Pipe(config);
        case "Land":
          return new FlyObj.Land(config);
      }
    }

  // 给window添加一个全局属性，暴露在全局变量中
  window.Fly = FlyObj;

})(window);