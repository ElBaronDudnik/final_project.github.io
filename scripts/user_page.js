const userName = document.querySelector('.user_name');
const userRegDate = document.querySelector('.user_reg-data');
const userEmail = document.querySelector('.user_email');
const passedTests = document.getElementById('passed_tests');
const successRate = document.getElementById('success_rate');
const log_out = document.querySelector('.logOut')

log_out.addEventListener('click', function(){
	localStorage.setItem('in', null);
	document.location = 'index.html'
});

let userData = JSON.parse(localStorage.getItem("in"));
console.log(userData);

(function(data){
	userName.innerText = data.name;
	userEmail.innerText = data.email;
	userRegDate.innerText = data.date;
	passedTests.innerText = data.passedTests;
	successRate.innerText = `${(data.successRate/data.passedTests)||0}%`;
})(userData)

