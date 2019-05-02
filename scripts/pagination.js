import { Element, parseText, create } from "./create_module.js";
const tests_container = document.querySelector('.tests .flex-container');
const data = JSON.parse(localStorage.getItem("data"));
const testsPagination = document.querySelector('.tests-pagination');
let pagItems;
let figs, pags, dots;
let index = 0;
let pagQuantity = 8;


class Pags{
	constructor(page, last){
		this.page = page;
		this.last = last;
	}
	createPags(){
		let pages = this.last+2;
		for (var i = 0; i <= pages; i++) {
			let text = i;
			let className = 'pag-item';
			if (i == 0) {
				className = 'pag-item active'
				text = 'first'
			};
			if (i == pages) text = 'last';
			if (i == 1 || i == pages-1){
				text = '...';
				className = 'dots'
			}
			create('SPAN', className, text, testsPagination);
		}
	}
	changePage(page){
		pagItems[this.page].classList.remove('active')
		this.page = page
		pagItems[this.page].classList.add('active')
	}
	managePages(){
		let i=0;
		console.log(this.page, this.last)
		if (this.page <= 2) {
			pagItems.forEach((item,index) => {
				if (index>=3 && index<this.last) {
					this.hide(item);
					console.log(item, index)
					i++;
				}
			})
      		this.hide(dots[0]);
      		this.show(pagItems[this.page+1], pagItems[this.page-1]);
      		if ([...pagItems].every(_=>!_.classList.contains('hidden'))) this.hide(dots[1])
      		else this.show(dots[1]);
		}
		else if (this.page >= 3 && this.page <= (this.last-3)){
			pagItems.forEach((item,index) => {
				if (index>=1 && index<(this.page-1) || index>(this.page+1) && index<(this.last-3)) {
          			this.hide(item)
          			i++;
				}
			})
			if (i>0) this.show(dots[0], dots[1]);
      		this.show(pagItems[this.page+1], pagItems[this.page-1])
		}
		else if (this.page >= (this.last-2)){
			pagItems.forEach((item,index) => {
				if (index>=1 && index<(this.last-2)) {
					this.hide(item)
					i++;
				}
			})
	      this.hide(dots[1]);
	      if (i>0) this.show(dots[0])
	      else this.hide(dots[0]);
	      this.show(pagItems[this.page+1], pagItems[this.page-1]);
		}

	}
	
	show(...element){
		element.forEach(_=>{
	      if (_) _.classList.remove('hidden');
	    })
	}
  	hide(...element){
	    element.forEach(_=>{
	      if (_) _.classList.add('hidden');
	    })
	}
}

createTestElements(data)

function createTestElements(data){
	data.forEach((test, index)=>{
		let figure = create('FIGURE', 'f-3', '', tests_container);
		let a = create('A','','', figure);
		a.addEventListener("click", function(){
			localStorage.setItem("index_test", JSON.stringify(index));
			document.location = `test.html`;
		})
		if (!test.icon){
			console.log(test.icon)
			test.icon = '../img/back_test.jpg'
		}
		create('IMG','','', figure, {"alt": `test ${index} image`}, {"src": `${test.icon}`});
		let figcaption = create('FIGCAPTION', '', '', figure);
		if (test.category > 55) {
			test.category = `<span>${parseText(_.quest, 55)}</span>`;
		}
		create('H4','',`${test.category}`, figcaption);
		if (test.category > 55) {
			test.name = `<span>${parseText(_.quest, 55)}</span>`;
		}
		create('H3','',`${test.name}`, figcaption);
		if (test.category > 210) {
			test.description = `<span>${parseText(_.quest, 55)}</span>`;
		}
		create('P','', `${test.description}`, figcaption);
	})
	figs = tests_container.querySelectorAll('figure');
	pags = new Pags(0, Math.ceil(figs.length/pagQuantity)-1);
	console.log(Math.ceil(figs.length/pagQuantity) , figs.length)
	pags.createPags();
	pagItems = document.querySelectorAll('.pag-item');
	dots = document.querySelectorAll('.dots');
	pags.managePages()
	hideElements(0, pagQuantity)
	showElements(0, pagQuantity);
	pagItems.forEach((button,index)=>button.addEventListener('click', () => {
	pags.changePage(index)
	pags.managePages()
	hideElements(index*pagQuantity, index*pagQuantity+pagQuantity);
	showElements(index*pagQuantity, index*pagQuantity+pagQuantity);
	}))
}


function hideElements(start, end){ 
	figs.forEach((figure,index) => {
		if (index < start || index >= end) {
			figure.classList.add('hidden');
		};
	})
}
function showElements(start, end){
	figs.forEach((figure,index) => {
		if (index >= start && index < end) {
			figure.classList.remove('hidden');
		};
	})
}

export {data, tests_container, testsPagination, hideElements, showElements, createTestElements}





