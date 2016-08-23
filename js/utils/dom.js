let Utils = Utils || {};

Utils.dom = { };


Utils.dom.createElement = function(type, options) {
	let el = document.createElement(type),
		text = options.text || '',
		textNode = document.createTextNode(text),
		classes = options.classes || null,
		childs = options.childs || null;
	
	el.appendChild(textNode);

	// adding classes
	if(classes) {
		for(let cl of classes) {
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

Utils.dom.prependChild = function(parent, child) {
	if(!parent.childNodes) {
		parent.appendChild(child);
	}

	parent.insertBefore(child, parent.firstChild);
};

module.exports = Utils.dom;