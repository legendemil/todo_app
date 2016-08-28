module.exports = (function() {
	let general = {};

	general.mapPriority = function(priority) {
		let label;
		switch(priority) {
			case 1:
				label = 'Low';
				break;
			case 2:
				label = 'Normal';
				break;
			case 3:
				label = 'High';
				break;
			default:
				label = 'Normal';		
		}
		return label;
	};

	return general;
})();