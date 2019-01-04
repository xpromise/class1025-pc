//等待页面加载（所有资源  图片、音、视频等资源）完成，才会调用此函数
window.onload = function () {
  //处理头部js代码
  headerHandle();
  function headerHandle() {
    //获取dom元素
    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var headerDownNodes = document.querySelectorAll('.down');
  
    //初始化时小箭头来到第一个li下面
    arrowNode.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth / 2
      - arrowNode.offsetWidth / 2 + 'px';
    headerDownNodes[0].style.width = '100%';
  
    for (var i = 0; i < headerLisNodes.length; i++) {
      headerLisNodes[i].index = i;
      headerLisNodes[i].onclick = function () {
        //默认清空所有width为0
        for (var j = 0; j < headerDownNodes.length; j++) {
          headerDownNodes[j].style.width = '';
        }
        //设置当前width为100%
        headerDownNodes[this.index].style.width = '100%';
        //让小箭头去当前点击的li的下面
        arrowNode.style.left = this.getBoundingClientRect().left + this.offsetWidth / 2
          - arrowNode.offsetWidth / 2 + 'px';
      }
    }
  }
  

}