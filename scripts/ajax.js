/*ajax*/
var myPromise = new Promise((resolve, reject) => {
	var request = new XMLHttpRequest();
	request.open('GET', "json/db.json");
	request.onload = function(){
		if (request.status === 200){
			resolve(request.response);
		}
		else{
			reject('Page loaded, but status not OK.');
		}
	}
	request.onerror = function(){
		reject('I\'s not working!');
	}
	request.send();
})

myPromise.then(result => {
	localStorage.setItem("data", result);
	let res = JSON.parse(result)
}, result => console.error(result));



