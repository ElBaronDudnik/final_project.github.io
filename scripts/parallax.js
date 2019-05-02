var container = document.querySelectorAll('.background-img');
container.forEach((_) => _.addEventListener('mousemove', mousemove));


function mousemove(e){
  var img = this.querySelector('.parallax');
  var w = img.offsetWidth;
  var h = img.offsetHeight;
  var delta 
  w>h?delta=w/10:delta=h/10
  var cursPosX = e.pageX - img.offsetLeft,
          cursPosY = e.pageY - img.offsetTop,
          cursPercentX = Math.round(cursPosX/w*delta)*(-0.4),
          cursPercentY = Math.round(cursPosY/h*delta)*(-0.83);
  img.style.transform = `translateX(${cursPercentX/2}px) translateY(${cursPercentY/2}px)`

}