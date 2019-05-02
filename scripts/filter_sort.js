import { data, tests_container, testsPagination, hideElements, showElements, createTestElements } from "./pagination.js";
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
	if (val == "Компьютерные технологии") sub_select.classList.remove('hidden')
	else sub_select.classList.add('hidden')
	sortingData = data.filter(_=>_.category == val);
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

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

if (qs['category']){
	switch (qs['category']){
		case "general":
			categoriesChange('Общие знания')
			break;
		case "it":
			categoriesChange('Компьютерные технологии')
			break;
		case "english":
			categoriesChange('Английский язык')
			break;
		case "math":
			categoriesChange('Математические задачки')
			break;
	}
	if(qs['direction']){
		directionChange(qs['direction'])
	}
}
