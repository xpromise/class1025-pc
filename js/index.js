//等待页面加载（所有资源  图片、音、视频等资源）完成，才会调用此函数
window.addEventListener('DOMContentLoaded', function () {
  //获取dom元素
  var headerLisNodes = document.querySelectorAll('.nav li');
  var arrowNode = document.querySelector('.arrow');
  var headerDownNodes = document.querySelectorAll('.down');
  var contentUlNode = document.querySelector('.content-main');
  var contentNode = document.querySelector('.content');
  
  var contentHeight = contentNode.offsetHeight;
  var arrowHalfWidth = arrowNode.offsetWidth / 2;
  var nowIndex = 0;
  var wheelTimer = null;
  
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
    for (var j = 0; j < headerDownNodes.length; j++) {
      headerDownNodes[j].style.width = '';
    }
    //设置当前width为100%
    headerDownNodes[nowIndex].style.width = '100%';
    //让小箭头去当前点击的li的下面
    arrowNode.style.left = headerLisNodes[nowIndex].getBoundingClientRect().left + headerLisNodes[nowIndex].offsetWidth / 2
      - arrowHalfWidth + 'px';
    //让内容区ul运动
    contentUlNode.style.top = - nowIndex * contentHeight + 'px';
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
    var homeNode = document.querySelector('.home');
    
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
    
        if (nowIndex >= 4) nowIndex = 0;
    
        homeCarouselNodes[nowIndex].className = 'common-title right-show';
        homeCarouselNodes[lastIndex].className = 'common-title left-hide';
    
        homePointNodes[lastIndex].className = '';
        homePointNodes[nowIndex].className = 'active';
    
        lastIndex = nowIndex;
      }, 2500)
    }
    
  }
  
  
})