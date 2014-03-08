var accumulator = "+00000000";
var curCommands = [];
var newCommands = "";
var d8 = [];
var x = 0;
var i = 0;
var stores = [];
var defaultStores = [];
var prevText = "";
			
			function logIt() {
var prevText = document.getElementById("log").value;
if(isNaN(parseInt(document.getElementById("commands").value))) {
	document.getElementById("log").innerText = prevText + '\r' + document.getElementById("commands").value + "\rError: Command(s) need to include only numbers and maybe plus signs and dashes";
} else {
	document.getElementById("log").innerText = prevText + '\r' + document.getElementById("commands").value;
}
			}
			
function execCommands(commands) {
	d8 = [];
	curCommands = [];
	newCommands = commands;
	prevText = document.getElementById("log").value;
	
	while(newCommands.length != 0) {
		if(newCommands.slice(0, 3) == "101") {
			d8.push(true);
			curCommands[x] = [newCommands.slice(0, 5), newCommands.slice(5, 14)];
			newCommands = newCommands.slice(14);
			if(curCommands[x][1].length != 9 || curCommands[x][0].length != 5) {
				document.getElementById("log").innerText = prevText + "\rError: This Command must be either 5 or 14 characters long, or you forgot to put a minus or plus sign in front of the number to add to stores";
			} else {
				evaluate(true);
			}
		} else {
			//if(newCommands.length == 3)
			curCommands[x] = newCommands.slice(0, 5);
			newCommands = newCommands.slice(5, newCommands.length);
			d8.push(false);
			if(curCommands[curCommands.length -1].length != 5 || curCommands[curCommands.length -1].length != 3) {
				document.getElementById("log").innerText = prevText + "\rError: This Command must be 5 or 3 characters long";
			} else {
				evaluate(false);
			}
		}
	}
	//alert(curCommands);
}
			
function evaluate(isd8) {
	for(var i = 0; i < curCommands.length; i++) {
		if(typeof curCommands[i] == "string") {
			var commandStr1 = curCommands[i];
			
		} else {
			var commandStr1 = curCommands[i][0];
			var commandStr2 = curCommands[i][1];
		}
		switch(commandStr1[0]) {
			case "0":
				switch(commandStr1[1]) {
					case "1":
						
					break;
				}
			break;
			case "1":
				if(commandStr1.slice(0, 3) != "101") {
					if(isd8[x] && stores[(parseInt(commandStr1.slice(3, 5)))/9 - 10]) {
						accumulator = stores[(parseInt(commandStr1.slice(0, 3)) - 10) / 9] + stores[(parseInt(commandStr1.slice(3, 5)) - 10) / 9];
					} else {
						 if (accumulator != "") {
							document.getElementById("log").innerText = prevText + "\rError: The accumulator must be cleared. Use the commands 40909 or 20909";	
						 }
						 if(!stores[(parseInt(commandStr1.slice(3)) - 10)/9]) {
							 document.getElementById("log").innerText = prevText + "\rError: The store " + commandStr1.slice(3, 5) + " is empty. Please fill them by using the commands 101+ the store number + the 8 digit value you want to fill it with, starting with a + or a -, ex. 10110+10050000";
						 }
					} 
				} else if((parseInt(commandStr1.slice(3, 5)) - 10)/9 < 0 && commandStr1.slice(3, 5) != "09") {
					document.getElementById("log").innerText = prevText + "\rError: The store " + commandStr1.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr1.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr1.slice(3, 5)) == 9) {
					document.getElementById("acc").innerText = commandStr2;
				} else {
					if(parseInt(commandStr1.slice(3, 5)) > 9 && parseInt(commandStr1.slice(3, 5)) < 19) {
						document.getElementById("#1").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 19 && parseInt(commandStr1.slice(3, 5)) < 28) {
						document.getElementById("#2").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 28 && parseInt(commandStr1.slice(3, 5)) < 37) {
						document.getElementById("#3").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 37 && parseInt(commandStr1.slice(3, 5)) < 46) {
						document.getElementById("#4").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 46 && parseInt(commandStr1.slice(3, 5)) < 55) {
						document.getElementById("#5").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 55 && parseInt(commandStr1.slice(3, 5)) < 64) {
						document.getElementById("#6").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 64 && parseInt(commandStr1.slice(3, 5)) < 73) {
						document.getElementById("#7").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 73 && parseInt(commandStr1.slice(3, 5)) < 82) {
						document.getElementById("#8").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 82 && parseInt(commandStr1.slice(3, 5)) < 91) {
						document.getElementById("#9").innerText = commandStr2;
					} else if(parseInt(commandStr1.slice(3, 5)) >= 91 && parseInt(commandStr1.slice(3, 5)) < 100) {
						document.getElementById("#10").innerText = commandStr2;
					}
        		}
			
			break;
	
			/*case "2":
				
			break;
			*/
		}
	}
}