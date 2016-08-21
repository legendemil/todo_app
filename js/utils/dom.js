let Utils = Utils || {};

Utils.dom = { };


Utils.dom.createElement = function(type, text = '', options) {
	let el = document.createElement(type),
		textNode = document.createTextNode(text);
	
	el.appendChild(textNode);

	// adding classes
	if(classes) {
		for(let cl in classes) {
			el.classList.add(cl);
		}
	}

	if(childs) {
		for(let child of childs) {
			el.appendChild(child);
		}
	}

	return el;
}

module.exports = Utils.dom;