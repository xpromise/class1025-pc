//等待页面加载（所有资源  图片、音、视频等资源）完成，才会调用此函数
window.addEventListener('DOMContentLoaded', function () {
  //获取dom元素
  var headerLisNodes = document.querySelectorAll('.nav li');
  var arrowNode = document.querySelector('.arrow');
  var headerDownNodes = document.querySelectorAll('.down');
  var contentUlNode = document.querySelector('.content-main');
  var contentNode = document.querySelector('.content');
  var navBarNodes = document.querySelectorAll('.nav-bar li');
  var musicNode = document.querySelector('.music');
  var musicIconNode = document.querySelector('.music-icon');
  var homeNode = document.querySelector('.home');
  var planeNodes = document.querySelectorAll('.course-plane');
  var pencilNodes = document.querySelectorAll('.works-pencil');
  var aboutUlNodes = document.querySelectorAll('.about-photo');
  var teamTitleNode = document.querySelector('.team-title');
  var teamContentNode = document.querySelector('.team-content');
  
  var contentHeight = contentNode.offsetHeight;
  var arrowHalfWidth = arrowNode.offsetWidth / 2;
  var nowIndex = 0;
  var lastIndex = 0;
  var wheelTimer = null;
  
  //出入场动画
  var animationArr = [
    {
      anOut: function () {
        homeNode.style.transform = 'translateY(-200px)';
        homeNode.style.opacity = 0;
      },
      anIn: function () {
        homeNode.style.transform = 'translateY(0)';
        homeNode.style.opacity = 1;
      }
    },
    {
      anOut: function () {
        // 左上 左下 右上
        planeNodes[0].style.transform = 'translate(-200px, -200px)';
        planeNodes[1].style.transform = 'translate(-200px, 200px)';
        planeNodes[2].style.transform = 'translate(200px, -200px)';
      },
      anIn: function () {
        planeNodes[0].style.transform = 'translate(0, 0)';
        planeNodes[1].style.transform = 'translate(0, 0)';
        planeNodes[2].style.transform = 'translate(0, 0)';
      }
    },
    {
      anOut: function () {
        // 上 下 下
        pencilNodes[0].style.transform = 'translateY(-200px)';
        pencilNodes[1].style.transform = 'translateY(200px)';
        pencilNodes[2].style.transform = 'translateY(200px)';
      },
      anIn: function () {
        pencilNodes[0].style.transform = 'translateY(0)';
        pencilNodes[1].style.transform = 'translateY(0)';
        pencilNodes[2].style.transform = 'translateY(0)';
      }
    },
    {
      anOut: function () {
        aboutUlNodes[0].style.transform = 'rotate(45deg)';
        aboutUlNodes[1].style.transform = 'rotate(-45deg)';
      },
      anIn: function () {
        aboutUlNodes[0].style.transform = 'rotate(0)';
        aboutUlNodes[1].style.transform = 'rotate(0)';
      }
    },
    {
      anOut: function () {
        teamTitleNode.style.transform = 'translateX(-200px)';
        teamContentNode.style.transform = 'translateX(200px)';
      },
      anIn: function () {
        teamTitleNode.style.transform = 'translateX(0)';
        teamContentNode.style.transform = 'translateX(0)';
      }
    }
  ];
  
  //默认除第一屏以外，其他所有屏都做出场动画
  for (var i = 0; i < animationArr.length; i++) {
    if (i === 0) continue;
    animationArr[i].anOut();
  }
  
  //处理头部js代码
  headerHandle();
  function headerHandle() {
    /*var img = new Image();
    img.src = './imgs/home.png';
    img.onload = function () {
      //初始化时小箭头来到第一个li下面
      arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2
        - arrowHalfWidth + 'px';
      headerDownNodes[0].style.width = '100%';
    }*/
  
    //初始化时小箭头来到第一个li下面
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2
      - arrowHalfWidth + 'px';
    headerDownNodes[0].style.width = '100%';
    
    for (var i = 0; i < headerLisNodes.length; i++) {
      headerLisNodes[i].index = i;
      headerLisNodes[i].onclick = function () {
        //同步更新nowIndex的值，否则点击后在滚动就会出bug
        nowIndex = this.index;
        move(nowIndex);
      }
    }
  }
  
  //公共move函数
  function move(nowIndex) {
    //默认清空所有width为0
    // for (var j = 0; j < headerDownNodes.length; j++) {
    //   headerDownNodes[j].style.width = '';
    //   navBarNodes[j].className = '';
    // }
    headerDownNodes[lastIndex].style.width = '';
    navBarNodes[lastIndex].className = '';
    //设置当前width为100%
    headerDownNodes[nowIndex].style.width = '100%';
    //让小箭头去当前点击的li的下面
    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
      - arrowHalfWidth + 'px';
    //让内容区ul运动
    contentUlNode.style.top = - nowIndex * contentHeight + 'px';
    //侧边导航
    navBarNodes[nowIndex].className = 'active';
    //上一屏做出场动画  当前屏做入场动画
    animationArr[lastIndex].anOut();
    animationArr[nowIndex].anIn();
    
    lastIndex = nowIndex;
  }
  
  //内容区js代码
  contentHandle();
  function contentHandle() {
    //滚轮事件
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll', wheel);
  
    function wheel(event) {
      event = event || window.event;
      //函数反抖：防止函数多次调用，优化函数性能。  让规定时间内调用的函数，只有最后一次生效
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () {
        var flag = '';
        if (event.wheelDelta) {
          //ie/chrome
          if (event.wheelDelta > 0) {
            flag = 'up';
          } else {
            flag = 'down';
          }
        } else if (event.detail) {
          //firefox
          if (event.detail < 0) {
            flag = 'up';
          } else {
            flag = 'down';
          }
        }
  
        switch (flag) {
          case 'up' :
            if (nowIndex > 0) {
              nowIndex--;
              move(nowIndex);
            }
            break;
          case 'down' :
            if (nowIndex < 4) {
              nowIndex++;
              move(nowIndex);
            }
            break;
        }
  
      }, 200);
      //禁止默认行为
      event.preventDefault && event.preventDefault();
      return false;
    }
  }
  
  //浏览器调整窗口大小事件
  window.onresize = function () {
    //修正小箭头的位置和ul位置
    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
      - arrowHalfWidth + 'px';
    contentUlNode.style.top = - nowIndex * contentHeight + 'px';
  }
  
  //第一屏js代码
  firstViewHandle();
  function firstViewHandle() {
    var homeCarouselNodes = document.querySelectorAll('.home-carousel li');
    var homePointNodes = document.querySelectorAll('.home-point li');
    
    var lastIndex = 0;
    var nowIndex = 0;
    var lastTime = 0;
    var timer = null;
    
    for (var i = 0; i < homePointNodes.length; i++) {
      homePointNodes[i].index = i;
      homePointNodes[i].onclick = function () {
        //函数节流：规定时间内，只让第一次操作生效，后面不生效
        //如果点击的时间间隔小于2秒，不生效
        var nowTime = Date.now();
        console.log(nowTime);  //得到当前的格林时间 单位ms
        if (nowTime - lastTime <= 2000) return;
        //同步上一次点击时间
        lastTime = nowTime;
        
        //同步nowIndex的值
        nowIndex = this.index;
        //如果点击同一个就啥也不做
        if (nowIndex === lastIndex) return;
        
        if (nowIndex > lastIndex) {
          //点击是右边  右边加上right-show  左边加上left-hide
          homeCarouselNodes[nowIndex].className = 'common-title right-show';
          homeCarouselNodes[lastIndex].className = 'common-title left-hide';
        } else {
          //点击是左边
          homeCarouselNodes[nowIndex].className = 'common-title left-show';
          homeCarouselNodes[lastIndex].className = 'common-title right-hide';
        }
        //修改小圆点的显示
        homePointNodes[lastIndex].className = '';
        this.className = 'active';
        
        //同步上一次的值
        lastIndex = nowIndex;
        
      }
    }
  
    homeNode.onmouseenter = function () {
      clearInterval(timer);
    }
  
    homeNode.onmouseleave = autoPlay;
    
    //自动轮播
    autoPlay();
    function autoPlay() {
      timer = setInterval(function () {
        nowIndex++;
        //同步上一次点击时间，为了在轮播时用户不能点击小圆点
        lastTime = Date.now();
        
        if (nowIndex >= 4) nowIndex = 0;
    
        homeCarouselNodes[nowIndex].className = 'common-title right-show';
        homeCarouselNodes[lastIndex].className = 'common-title left-hide';
    
        homePointNodes[lastIndex].className = '';
        homePointNodes[nowIndex].className = 'active';
    
        lastIndex = nowIndex;
      }, 2500)
    }
    
  }
  
  //第五屏js代码
  lastViewHandle();
  function lastViewHandle() {
    var teamUlNode = document.querySelector('.team-person');
    var teamLiNodes = document.querySelectorAll('.team-person li');
  
    var width = teamLiNodes[0].offsetWidth;
    var height = teamLiNodes[0].offsetHeight;
    var canvas = null;
    var createCircleTimer = null;
    var paintingTimer = null;
    
    for (var i = 0; i < teamLiNodes.length; i++) {
      teamLiNodes[i].index = i;
      teamLiNodes[i].onmouseenter = function () {
        //改变透明度
        for (var j = 0; j < teamLiNodes.length; j++) {
          teamLiNodes[j].style.opacity = 0.5;
        }
        this.style.opacity = 1;
        
        if (!canvas) {
          //创建画布
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          canvas.className = 'canvas';
          //产生气泡运动
          bubble(canvas);
          
          teamUlNode.appendChild(canvas);
        }
        //不管添不添加canvas，都得改变left值
        canvas.style.left = this.index * width + 'px';
      }
    }
  
    teamUlNode.onmouseleave = function () {
      for (var j = 0; j < teamLiNodes.length; j++) {
        teamLiNodes[j].style.opacity = 1;
      }
      //清除画布
      canvas.remove();
      canvas = null;
      //清除定时器
      clearInterval(createCircleTimer);
      clearInterval(paintingTimer);
    }
    
    function bubble(canvas) {
      
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
    
        var arr = [];
        //生成圆
        createCircleTimer = setInterval(function () {
          var r = Math.round(Math.random() * 255);
          var g = Math.round(Math.random() * 255);
          var b = Math.round(Math.random() * 255);
      
          var c_r = Math.round(Math.random() * 8 + 2);
      
          var s = Math.round(Math.random() * 50 + 20);
      
          var y = height + c_r;
          var x = Math.round(Math.random() * width);
      
          arr.push({
            r: r,
            g: g,
            b: b,
            c_r: c_r,
            x: x,
            y: y,
            deg: 0,
            s: s
          })
      
        }, 50);
        //画圆
        paintingTimer = setInterval(function () {
          //清除上一次的画布
          ctx.clearRect(0, 0, width, height);
      
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            //角度递增
            item.deg+=6;
            //得到弧度的值
            var rad = item.deg * Math.PI / 180;
            //求x轴的y轴的坐标
            var x = item.x + Math.sin(rad) * item.s;
            var y = item.y - rad * item.s;
            //删除已经跑出去的圆
            if (y <= -item.c_r) {
              arr.splice(i, 1);
              continue;
            }
        
            ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
            ctx.beginPath();
            ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
            ctx.fill();
        
          }
      
        }, 1000 / 60)
    
      }
    }
    
  }
  
  /*
    can not read property “style” of null / undefined  index.js 123
   */
  
  //侧边导航
  for (var i = 0; i < navBarNodes.length; i++) {
    navBarNodes[i].index = i;
    navBarNodes[i].onclick = function (ev) {
      nowIndex = this.index;
      move(nowIndex);
    }
  }
  
  //音乐播放
  musicIconNode.onclick = function () {
    if (musicNode.paused) {
      //说明当前音乐暂停，点击播放
      musicNode.play();
      this.style.backgroundImage = 'url("./imgs/musicon.gif")';
    } else {
      musicNode.pause();
      this.style.backgroundImage = 'url("./imgs/musicoff.gif")';
    }
  }
  
  
})