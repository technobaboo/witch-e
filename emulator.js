var data = {
	log: {
		text: "WITCH-E v. 2.0.0a",
		lines: [
			"WITCH-E v. 2.0.0a"
		]
	},
	tapes: [
		
	],
	printer: {
		text: "",
		lines: [
			""
		]
	},
	stores: [],
	mode: "single-step",
	alarm: false,
	finished: false
};

var tapeTemplate = {
	looped: true,
	text: "",
	lines: [
		""
	]
};

document.onload = function() {
	if(!localStorage.data) {
		for(var r=0; r>=9; r++) {
			data.stores[r] = [];
			for(var c=0; c>=9; c++) {
				data.stores[r][c] = 0;
			}
		}
		saveData();
	}
}

function saveData() {
	localStorage.data = JSON.stringify(data);
}
