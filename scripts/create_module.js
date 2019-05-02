class Element{
  constructor([tag_name, class_name, text, parent, ...attr]){
    this.objAttr = Object.assign({}, ...attr);
    this.par = parent;
    this.tag = tag_name;
    this.className = class_name || undefined;
    this.text = text || undefined;
  }
  get element(){
    let el = this.creation()
    return el;
  }
  creation(){
    let el = document.createElement(this.tag);
    if (this.className) el.className = this.className;
    let href = this.par.appendChild(el);
    if (this.text){
      el.innerHTML = this.text;
    }
    if (this.objAttr) this.addAttr(el);
    return el;
  }
  addAttr(el){
    Object.getOwnPropertyNames(this.objAttr).forEach(_ =>{
      el[_] = this.objAttr[_];
    })
  }
}

function parseText(text, limit){
	//console.log(text)
	for (let i = limit; i > 0; i--){
	    if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
	        return text.substring(0, i) + '...';
	    }
	}

};


function create(...a){
	let node = new Element(a);
  	let parent = node.element;
  	return parent;
}

export {Element, parseText, create};