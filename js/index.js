//等待页面加载（所有资源  图片、音、视频等资源）完成，才会调用此函数
window.addEventListener('DOMContentLoaded', function () {
  //获取dom元素
  var headerLisNodes = document.querySelectorAll('.nav li');
  var arrowNode = document.querySelector('.arrow');
  var headerDownNodes = document.querySelectorAll('.down');
  var contentUlNode = document.querySelector('.content-main');
  var contentNode = document.querySelector('.content');
  
  var contentHeight = contentNode.offsetHeight;
  var nowIndex = 0;
  
  //处理头部js代码
  headerHandle();
  function headerHandle() {
    
    //初始化时小箭头来到第一个li下面
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2
      - arrowNode.offsetWidth / 2 + 'px';
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
      - arrowNode.offsetWidth / 2 + 'px';
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
    
      var flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down'
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
    
      //禁止默认行为
      event.preventDefault && event.preventDefault();
      return false;
    }
  }
  
})