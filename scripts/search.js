const regex = />(.*?)</g
const html = document.body;
const search_result = document.querySelector('.search-result') ;
const textTyping = document.getElementById('field');
const close = document.getElementById('close');
const search = document.getElementById('search');

textTyping.addEventListener('keydown', function(e){
  clearResult();
  if (e.keyCode === 13) comparing(textTyping.value);
})

close.addEventListener('click', function(){
    textTyping.value = "";
    clearResult()
})

search.addEventListener('click', function(){
  clearResult();
  comparing(textTyping.value);
})

function clearResult(){
  console.log('clear')
  while (search_result.firstChild){
    search_result.removeChild(search_result.firstChild)
  }
  search_result.classList.add('hidden');
}

function textPhrases(html){
  let map = new Map()
  while ((match = regex.exec(html)) != null){
    if (match[1]) {
      map.set(match.index, match[1])
    }
  }
  return map;
}

function comparing(value){
  search_result.classList.remove('hidden');
  let myMap = textPhrases(html.innerHTML);
  myMap.forEach((key, val, map) => {
    if (!(key.includes(value))) {
      map.delete(val)
    }
    else{
      let highResult = key.replace(value, `<span class="highlighted">${value}</span>`) ;
      console.log(highResult)
      let a = document.createElement('A')
      search_result.appendChild(a);
      a.innerHTML = highResult;
      //a.addEventListener('click', {handleEvent:getFocus, value:key, index:val});
    }
  });
  if (!myMap.size){
    let a = document.createElement('A')
    search_result.appendChild(a);
    a.innerHTML = 'Ничего не найдено по вашему запросу';
  }
}
function getFocus() {        
  console.log(this.value, this.index);
  let value = this.value;
  let index = this.index;
  value = (html.innerHTML).substring(index+1, index+value.length+1);
  html.innerHTML = (html.innerHTML).replace(value, `<span class="highlighted" tabindex="1">${value}</span>`);
  let el = document.querySelector('.highlighted');
  console.log(el);
  el.focus();
  //clearResult();
}

