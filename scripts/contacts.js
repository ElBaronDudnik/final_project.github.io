/*Openning contact form*/
const contact_button = document.querySelector('.contact_us');
const feedback_form = document.querySelector('.feedback');
const exit = document.querySelector('.exit');


exit.addEventListener('click', function(){
  feedback_form.classList.remove('open');
})
contact_button.addEventListener('click', function(){
  feedback_form.classList.add('open');
})

