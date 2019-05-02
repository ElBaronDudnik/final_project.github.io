import {DATA, result_page, score, quantity_right_answers} from "./test.js";
import {Element, parseText, create} from './create_module.js'
const quests = document.querySelectorAll('.quet');
const refs = document.querySelectorAll('#references_container ul li a');
const answer_buttons = document.querySelectorAll('.answer_button');
const descriptions = document.querySelectorAll('.description');

let right_answers = [];
let user_answers=[];

DATA.forEach(_=>right_answers.push(_.right_answer));


function getResults(){
	var forms = document.querySelectorAll(".quet");
	forms.forEach(_=>{
		let checked = undefined;
		let answers = _.querySelectorAll('input');
		answers.forEach((__,index) => {
			if (__.checked == true) checked = index+1;
		})
		user_answers.push(checked);
	})
	return compareResults(right_answers, user_answers)
}

console.log(quests, refs)
function compareResults(a, b){
	let diff = [];
	a.forEach((_,index) => {
			if (b[index] == _){
				diff.push(true);
				quests[index].classList.add('right');
				quests[index].querySelectorAll('.answers li')[_-1].classList.add('right');
			}
			else {
				diff.push(false);
				quests[index].classList.add('wrong');
				console.log(b[index], _);
				quests[index].querySelectorAll('.answers li')[_-1].classList.add('right');
				quests[index].querySelectorAll('.answers li')[_-1].children[0].checked = true;
				if (b[index]) quests[index].querySelectorAll('.answers li')[b[index]-1].classList.add('wrong'); 
			}

			console.log(quests[index], refs[index])
			quests[index].classList.remove('hidden');
			refs[index].classList.add('checked');
			answer_buttons[index].classList.add('hidden');
			descriptions[index].classList.remove('hidden');
			//console.log(quests[index], refs[index])
		}
	)
	return rightWrong(diff)
}
function rightWrong(diff){
	var right = diff.reduce((total,x) => {return x==true ? total+1 : total}, 0);
	return right;
}


function printResults(){
	getResults();
	result_page.style.display = "block"
	quantity_quest.innerHTML = right_answers.length;
	let right = getResults();
	quantity_right_answers.innerHTML = right;
	score.innerHTML = `${right/right_answers.length*100}%`;
	//console.log(right_answers, DATA[0].answers[right_answers[0]-1])
	//resultingQuestions();
	if (JSON.parse(localStorage.getItem('in'))) {
		let obj = JSON.parse(localStorage.getItem('in'));
		obj.passedTests += 1;
		obj.successRate += right/right_answers.length*100;
		localStorage.setItem('in', JSON.stringify(obj));
	}
}


export {printResults}