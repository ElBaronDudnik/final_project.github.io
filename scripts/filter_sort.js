import { data, tests_container, testsPagination, hideElements, showElements, createTestElements } from "./pagination.js";
import { qs } from './query_strings_module.js'
const complexity = document.getElementById('complexity');
const categories = document.getElementById('categories');
const directions = document.getElementById('directions');
const sorting = document.getElementById('sorting');
const figures = document.querySelectorAll('figure');
const parent = document.querySelector('.tests .flex-container');
const sub_select = document.querySelector('.sub_select');
let sortingData;
let orders = [...figures].map(_=>_.style.order);
let names = [...figures].map(_=>_.querySelector('h3').innerHTML);
let figs = [...figures].sort((a,b) => {
	a = a.querySelector('h3').innerHTML;
	b = b.querySelector('h3').innerHTML;
	return a.localeCompare(b);
})

sorting.addEventListener('change', function(e){
	let val = e.target.value;
	switch (val){
		case "NewO":
			reSort(data)
			break;
		case "NewN":
			sortingData = data.slice()
			sortingData.reverse();
			reSort(sortingData)
			break;
		case "NameA":
			sortingData = data.slice();
			sortingData.sort((a, b)=>(a.name).localeCompare(b.name));
			reSort(sortingData);
			break;
		case "NameZ":
			sortingData = data.slice();
			sortingData.sort((a, b)=>(b.name).localeCompare(a.name));
			reSort(sortingData);
			break;
	}
})

complexity.addEventListener('change', function(e){
	let val = e.target.value;
	//console.log(val, data[0].complexity)
	sortingData = data.filter(_=>_.complexity == val);
	reSort(sortingData)
})

categories.addEventListener('change', categoriesChange);
directions.addEventListener('change', directionChange);

function categoriesChange(e){
	let val;
	if (typeof(e) == "object") val = e.target.value;
	else val = e;
	console.log(val)
	if (val == "Компьютерные технологии") sub_select.classList.remove('hidden')
	else sub_select.classList.add('hidden');
	console.log(val)
	categories.value = val;
	if (val == 'Все категории') sortingData = data;
	else sortingData = data.filter(_=>_.category == val);
	reSort(sortingData)
}
function directionChange(e){
	let val;
	if (typeof(e) == "object") val = e.target.value;
	else val = e;
	val = val.toLowerCase();
	console.log(val);
	sortingData = data.filter(_=>_.direction == val);
	reSort(sortingData)
}


function removeItems(container){
	while (container.firstChild)
		container.removeChild(container.firstChild)
}

function reSort(d){
	//console.log(tests_container, pagItems)
	removeItems(tests_container);
	removeItems(testsPagination);
	createTestElements(d);
}


if (qs['category']){
	console.log(qs['category'])
	categoriesChange(qs['category'])
	if(qs['direction']){
		directionChange(qs['direction'])
	}
}
