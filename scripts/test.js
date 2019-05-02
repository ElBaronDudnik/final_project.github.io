import {Element, parseText, create} from './create_module.js'
import {printResults} from './result_page.js'
const data = JSON.parse(localStorage.getItem("data"))
const index_data = JSON.parse(localStorage.getItem("index_test"))
const DATA = data[index_data].questions;
const question_container = document.getElementById('question_container');
const references_container = document.getElementById('references_container');
const result_page = document.querySelector('.result_page');
//const result_exit = document.querySelector('.result_page .exit');
const quantity_quest = document.getElementById('quantity_quest');
const quantity_right_answers = document.getElementById('right_answers');
const score = document.getElementById('score');
let ref_ul = document.createElement('UL');
references_container.appendChild(ref_ul);
let text;

console.log(data[index_data]);
(function(){
	DATA.forEach((_,i)=>{
		let form = create('FORM', 'quet', '', question_container, {'action':'#'}, {'id': `quest${i}`});
		let div_q = create ('DIV', 'question_place', '', form);
		create ('H4', '', `Question${i+1}`, div_q);
		create('P', 'question', `${_.quest}`, div_q);
		let ol = create('OL', 'answers', '', div_q);
		_.answers.forEach((item, j)=>{
			let li = create('LI','','',ol);
			create('INPUT', '', '', li, {"type": "radio"}, {"id": `variant_${j}_quet_${i}`},{"name":`quet_${i}`},{"for": `variant_${j}_quet_${i}`});
			create('LABEL', '', item, li, {"htmlFor": `variant_${j}_quet_${i}`}); 
		})
		create('BUTTON', 'answer_button', 'Готово', div_q);
		if (_.src){
			let div_img = create('DIV','img_place', '', form);
			create('IMG', 'img_place', '',div_img, {"src": `${_.src}`});
		}
		if (_.answer_description) create('P', 'description hidden', `${_.answer_description}`, form)
		else create('P', 'description hidden', `Нет описания`, form)
		let ref_li = create('LI', '', '', ref_ul);
		//create('INPUT', 'references', '', ref_li, {"type": "checkbox"}, {'id': `ref_${i}`}, {'hidden': true}, {'checked': true})
		if (_.quest.length > 55) {
			text = `<span>${parseText(_.quest, 55)}</span>`;
		}
	  	else text = `<span>${_.quest}</span>`;
		create('A', 'checked', text, ref_li, {"href": `#quest${i}`})

	})	
})()


/*test`s page scripts*/
manage();


function manage(){
	var button = document.querySelectorAll('.answer_button');
	var references = document.querySelectorAll('#references_container ul li a');

	//console.log(references)
	button.forEach(function(_,i){
		_.addEventListener('click', function(){
			event.preventDefault();
			console.log(references)
			hideQuestion(_.parentElement,references[i])
	
		})
	})

	references.forEach((item, index) => {
	  item.addEventListener('click', function(){
	    if (!item.classList.contains('checked')){
	    	console.log(item)
	    	item.classList.add('checked');
	      	showQuestion(button[index].parentElement);
	    }
	    console.log(question_container.children[index]);
	   	(question_container.children[index]).focus()
	  })
	})

}

function showQuestion(item){
  item.parentElement.classList.remove('hidden');
}
function hideQuestion(item,ref){
  item.parentElement.classList.add('hidden');
  //console.log(ref.childNodes[0])
  ref.classList.remove('checked');
}

var finish_test_button = document.getElementById('finish_test');
finish_test_button.addEventListener('click', function(){
	if (confirm('Вы уверены, что хотите завершить тест?')) {
		timer1.stop();
		printResults();
	}
})


var time_place = document.querySelector('.time');
var Timer = function(obj){
	this.minutes = obj.minutes;
	this.seconds = 0;
	this.onEnd = obj.onEnd || null; 
	this.onStart = obj.onStart || null;
	this.onTick = obj.onTick || null;
	this.intervalId = null;

	this.start = () => {
		this.interval = setInterval(this.updateSeconds, 1000)
	}
	this.stop = () => {
		clearInterval(this.interval);
	}
	this.updateMinutes = () =>{
		this.minutes>0?this.minutes-=1:(alert('Время вышло!') && this.stop());
		this.onTick ? this.onTick() : void 0;
		return this.get;
	}
	this.updateSeconds = () => {
		if (this.minutes>0 && this.seconds == 0){
			this.minutes-=1;
			this.seconds = 59;
		}
		else if (this.seconds>0){
			this.seconds-=1
		}
		else this.stop()
		//this.seconds>0?this.seconds-=1:this.stop();
		this.onTick ? this.onTick() : void 0;
		return this.get;
	}
	this.get = () =>{
		return (this.seconds<10)?`${this.minutes}:0${this.seconds}`:`${this.minutes}:${this.seconds}`;
	}
}

var timer1 = new Timer({
	minutes: 10,
	onTick: tick
});

timer1.start();
requestAnimationFrame(tick);

function tick(){
	time_place.innerHTML = timer1.get()
}

export {DATA, result_page, score, quantity_right_answers}



