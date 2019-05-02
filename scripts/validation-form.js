const validationForm_container = document.querySelector('.validation-form_container');
const forms = document.querySelectorAll('form.is-valid');
const form_auth = document.querySelector('.tab-form.auth');
const form_reg = document.querySelector('.tab-form.reg');
const feedback = document.querySelector('.feedback form');

const pass_confirm = document.getElementById("input_pass_confirm");
const pass = document.getElementById("input_pass_reg");

//const button = document.querySelector('.authorization'); /*Кнопка, вызывающая модальное окно*/
const valid_form_close = document.querySelector('.tab_close'); /*Кнопка, закрывающая модальное окно*/
const feedback_exit = document.querySelector('.feedback .exit');

const tab_auth = document.querySelector('label[for="tab_auth"]');
const tab_reg = document.querySelector('label[for="tab_reg"]');

const guestUser = document.querySelector('.user_information.guest')
const authUser = document.querySelector('.user_information.auth')
const log_out = document.querySelector('.logOut')

log_out.addEventListener('click', logOut);

function buttonClick(p){
	if (p == 'auth') validationForm_container.classList.remove('hidden');
	else {
		validationForm_container.classList.remove('hidden');
		tab_reg.click();
	}
}
valid_form_close.addEventListener('click', function(){
	validationForm_container.classList.add('hidden');
})



class User {
  constructor(user_name, user_email, user_pass) {
    this.name = user_name.value || undefined;
    this.password = user_pass.value;
    this.email = user_email.value;
    this.passedTests = 0;
    this.successRate = 0;
    this.isAdmin = false;
  }
  regDate(){
  	let now = new Date();
  	let month = now.getMonth()+1
  	console.log(month, month.lenght)
  	month<10?month = `0${month}`:month;
  	this.date = `${now.getDate()}.${month}.${now.getFullYear()}`
  }


};

class CustomValidation{
	constructor(input){
		this.input = input;
	}
	defineCustomMessage(){
		let type = this.input.type
		console.log(type)
		switch (type){
			case 'text': return 'Имя может содержать только буквы латинского алфавита или цифры';
			break;
			case 'email': return  'Введите корректный email адрес!';
			break;
			case 'password': return 'Пароль должен содержать не менее 8 символов(минимум одну цифру, одну заглавную букву, одну прописную букву)!';
			break;
			case 'tel': return 'Телефон должен быть в формате +380*********'
			break;
		} 
	}
	checkValidity(){
		let custom_message = this.defineCustomMessage();
		let validity = this.input.validity;
		if (validity.valueMissing){
			this.addInvalidity('Это поле обязательное')
		}
		if (validity.patternMismatch){
			this.addInvalidity(custom_message)
		}
		if (validity.rangeOverflow){
			let max = getAttributeValue(this.input, 'maxlength');
			this.addInvalidity(`Максимальное колличеcтво символов должно быть: ${max}`)
		}
		if (validity.rangeUnderflow){
			let max = getAttributeValue(this.input, 'minlength');
			this.addInvalidity(`Минимальное колличеcтво символов должно быть: ${min}`)
		}
	}
	addInvalidity(message){
		console.log(message, this.input, this.input.nextElementSibling)
		this.input.nextElementSibling.innerHTML = message;
	}
	
}
function checkPasswords(pass, pass_confirm){
	console.log('TYTY')
	if (!(pass.value == pass_confirm.value)){
		pass.nextElementSibling.innerHTML = "Пароли должны совпадать!"
		pass_confirm.nextElementSibling.innerHTML = "Пароли должны совпадать!"
		return false;
	}
	else {
		pass.nextElementSibling.innerHTML = ""
		pass_confirm.nextElementSibling.innerHTML = ""
		return true;
	}
}

(function(){
	let inOut = localStorage.getItem('in');
	if (inOut == 'null'){
		guestUser.classList.remove('hidden');
		authUser.classList.add('hidden');
	}
	else {
		guestUser.classList.add('hidden');
		authUser.classList.remove('hidden');
	}
})()

function logIn(obj){
	localStorage.setItem('in', JSON.stringify(obj));
	guestUser.classList.add('hidden');
	authUser.classList.remove('hidden');
}
function logOut(){
	localStorage.setItem('in', null);
	guestUser.classList.remove('hidden');
	authUser.classList.add('hidden');
	document.location = 'index.html'
}


forms.forEach(form => {
	form.querySelector('button[type="submit"]').addEventListener('click', function() {
  	event.preventDefault();
  	let validityArr = []
  	console.log(form.children)
  	form.querySelectorAll('input').forEach(input => {
  		if (!input.checkValidity()){
  			let inputCustomValidation = new CustomValidation(input);
  			inputCustomValidation.checkValidity();
  		}
  		else if (checkPasswords(pass, pass_confirm)) validityArr.push(true)
  		else{
  			input.nextElementSibling.innerHTML = '';
  		}
  		validityArr.push(input.checkValidity());
  		//console.log(validityArr)
  	})
  	if (form.querySelector('textarea') && !form.querySelector('textarea').checkValidity()){
  		let inputCustomValidation = new CustomValidation(form.querySelector('textarea'));
  		inputCustomValidation.checkValidity();
  	}
  	else if (form.querySelector('textarea')){
  			form.querySelector('textarea').nextElementSibling.innerHTML = '';
  		}
  	if (validityArr.every(_ => _ == true)) {
  		if (form.className == "tab-form reg is-valid"){
  			let attr = [...form.children].filter(child => child.dataset.attr);
			let user = new User(...attr);
			user.regDate();
			console.log(user)
			localStorage.setItem(user.email, JSON.stringify(user));
			alert('Спасибо за регистрацию! Теперь вы можете зайти как авторизованный пользователь.')
			tab_auth.click()
  		}
  		if (form.className == "tab-form auth is-valid"){
  			let attr = [...form.children].filter(child => child.dataset.attr);
			let user = new User('',...attr);
  			let userInLocalStorage = JSON.parse(localStorage.getItem(user.email));
  			if (!userInLocalStorage || !user.password == userInLocalStorage.password) alert('Вы ввели неправильный пароль или email')
  			else {
  				logIn(userInLocalStorage);
  				document.location = `user_page.html`;
  			}
  		}
  		if (form.className == "form-feedback is-valid"){
  			alert("Спасибо за ваш запрос! Мы рассмотрим его в порядке очереди.")
  			feedback.reset();
  			feedback_exit.click()
  		}
  	}
 })

})

