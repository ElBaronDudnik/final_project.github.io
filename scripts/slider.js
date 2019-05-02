var slider_container = document.querySelector('.header_container'); 
var img = document.querySelectorAll('.background-img');
var leftArrow = document.querySelector('.prev');
var rightArrow = document.querySelector('.next');
var diamondButtons = document.querySelectorAll('.diamond');
let i = 0

//console.log(slider_container.childElement)
function changeColorScheme(x){
  slider_container.classList.remove('dark','light');
  slider_container.style.animation = "myopacity 2s"
  switch (x){
    case 0: 
      slider_container.classList.add('dark');
      break;
    case 1:
      slider_container.classList.add('light');
      break;
    case 2:
      slider_container.classList.add('light');
      break;
    case 3:
      slider_container.classList.add('dark');
      break;
  }
  slider_container.style.animation = ""
}


rightArrow.addEventListener('click', () => {
  img[i].classList.add('hidden-img');
  if (i == 3) i = -1;
  i++;
  img[i].classList.remove('hidden-img');
  document.querySelector('.selected').classList.remove('selected');
  diamondButtons[i].classList.add('selected');
  changeColorScheme(i);
});

leftArrow.addEventListener('click', () => {
  img[i].classList.add('hidden-img');
  if (i == 0) i = 4;
  i--;
  img[i].classList.remove('hidden-img');
  document.querySelector('.selected').classList.remove('selected');
  diamondButtons[i].classList.add('selected');
  changeColorScheme(i);
});

diamondButtons.forEach((item, index) =>{
  item.addEventListener('click', () => {
    img.forEach((_) => _.classList.add('hidden-img'));
    img[index].classList.remove('hidden-img');
    document.querySelector('.selected').classList.remove('selected');
    item.classList.add('selected');
    console.log(i, index)
    i = index;
    changeColorScheme(i);
  })
})

