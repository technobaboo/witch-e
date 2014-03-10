var curCommands = [];
var newCommands = "";
var d8 = [];
var x = 0;
var i = 0;
var stores = [];
var defaultStores = [];
var prevText = "";


function handleEnter(inField, e) {
    var charCode;
    
    if(e && e.which){
        charCode = e.which;
    }else if(window.event){
        e = window.event;
        charCode = e.keyCode;
    }

    if(charCode == 13) {
		logIt();
		execCommands(document.getElementById("commands").value);
    }
}

function logIt() {
	curCommands = document.getElementById("commands").value.split(" ");
	for(i = 0; i < curCommands.length; i++) {
		var prevText = document.getElementById("log").value;
		if(isNaN(parseInt(document.getElementById("commands").value))) {
			document.getElementById("log").innerText = prevText + '\r' + document.getElementById("commands").value + "\rError: Command(s) need to include only numbers and maybe plus signs and dashes";
		} else {
			document.getElementById("log").innerText = prevText + '\r' + curCommands[i];
		}
	}
	return false;
}
			
function execCommands(commands) {
	prevText = document.getElementById("log").value;
	
	if(curCommands[curCommands.length -1].length != 5 && curCommands[curCommands.length -1].length != 3 && curCommands[curCommands.length -1].length != 14) {
		document.getElementById("commands").value = "";
		document.getElementById("log").innerText = prevText + "\rError: This Command must be 5 or 3 or 14 characters long";
	} else {
		document.getElementById("commands").value = "";
		evaluate(false);
	}
	return false;
}
			
function evaluate(isd8) {
	document.getElementById("acc").innerText = document.getElementById("acc").innerText;
	for(var i = 0; i < curCommands.length; i++) {
		var commandStr = curCommands[i];
		switch(commandStr[0]) {
			case "0":
				switch(commandStr[1]) {
					case "1":
						
					break;
				}
			break;
			case "1":
				if(commandStr.slice(0, 3) != "101") {
					var store1 = NaN;
					var store2 = NaN;
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						store2 = document.getElementById("#1").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						store2 = document.getElementById("#2").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						store2 = document.getElementById("#3").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						store2 = document.getElementById("#4").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						store2 = document.getElementById("#5").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						store2 = document.getElementById("#6").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						store2 = document.getElementById("#7").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						store2 = document.getElementById("#8").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						store2 = document.getElementById("#9").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						store2 = document.getElementById("#10").innerText;
					}
					
					if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
						store1 = document.getElementById("#1").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
						store1 = document.getElementById("#2").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
						store1 = document.getElementById("#3").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
						store1 = document.getElementById("#4").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
						store1 = document.getElementById("#5").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
						store1 = document.getElementById("#6").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
						store1 = document.getElementById("#7").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
						store1 = document.getElementById("#8").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
						store1 = document.getElementById("#9").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
						store1 = document.getElementById("#10").innerText;
					}
					if(document.getElementById("acc").innerText == "Not assigned" && !isNaN(store1) && !isNaN(store2)) {
						
						document.getElementById("acc").innerText = parseInt(store1) + parseInt(store2);
						if(parseInt(store1) + parseInt(store2) < 0) {
							while(document.getElementById("acc").innerText.length < 9) {
								document.getElementById("acc").innerText = "-0" + document.getElementById("acc").innerText.slice(1);
							}
						} else {
							document.getElementById("acc").innerText = "0" + document.getElementById("acc").innerText;
							while(document.getElementById("acc").innerText.length < 9) {
								document.getElementById("acc").innerText = "+0" + document.getElementById("acc").innerText.slice(1);
							}
						}
					} else {
						 if (document.getElementById("acc").innerText != "Not assigned") {
							document.getElementById("log").innerText = prevText + "\rError: The accumulator must be cleared. Use the commands 409 or 209";	
						 }
					}
				} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
					document.getElementById("log").innerText = prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr.slice(3, 5)) == 9) {
					document.getElementById("acc").innerText = commandStr.slice(5);
				} else {
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						document.getElementById("#1").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						document.getElementById("#2").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						document.getElementById("#3").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						document.getElementById("#4").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						document.getElementById("#5").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						document.getElementById("#6").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						document.getElementById("#7").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						document.getElementById("#8").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						document.getElementById("#9").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						document.getElementById("#10").innerText = commandStr.slice(5);
					}
        		}
			
			break;
			
	
			case "2":
				if(commandStr.length == 3) {
					if(parseInt(commandStr.slice(1)) == 9) {
						document.getElementById("acc").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) > 9 && parseInt(commandStr.slice(1)) < 19) {
						document.getElementById("#1").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 19 && parseInt(commandStr.slice(1)) < 28) {
						document.getElementById("#2").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 28 && parseInt(commandStr.slice(1)) < 37) {
						document.getElementById("#3").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 37 && parseInt(commandStr.slice(1)) < 46) {
						document.getElementById("#4").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 46 && parseInt(commandStr.slice(1)) < 55) {
						document.getElementById("#5").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 55 && parseInt(commandStr.slice(1)) < 64) {
						document.getElementById("#6").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 64 && parseInt(commandStr.slice(1)) < 73) {
						document.getElementById("#7").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 73 && parseInt(commandStr.slice(1)) < 82) {
						document.getElementById("#8").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 82 && parseInt(commandStr.slice(1)) < 91) {
						document.getElementById("#9").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 91 && parseInt(commandStr.slice(1)) < 100) {
						document.getElementById("#10").innerText = "Not assigned";
					}
				}
			break;
			
			
			case "3":
				if(commandStr.slice(0, 3) != "301") {
					var store1 = NaN;
					var store2 = NaN;
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						store2 = document.getElementById("#1").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						store2 = document.getElementById("#2").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						store2 = document.getElementById("#3").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						store2 = document.getElementById("#4").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						store2 = document.getElementById("#5").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						store2 = document.getElementById("#6").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						store2 = document.getElementById("#7").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						store2 = document.getElementById("#8").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						store2 = document.getElementById("#9").innerText;
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						store2 = document.getElementById("#10").innerText;
					}
					
					if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
						store1 = document.getElementById("#1").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
						store1 = document.getElementById("#2").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
						store1 = document.getElementById("#3").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
						store1 = document.getElementById("#4").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
						store1 = document.getElementById("#5").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
						store1 = document.getElementById("#6").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
						store1 = document.getElementById("#7").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
						store1 = document.getElementById("#8").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
						store1 = document.getElementById("#9").innerText;
					} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
						store1 = document.getElementById("#10").innerText;
					}
					if(document.getElementById("acc").innerText == "Not assigned" && !isNaN(store1) && !isNaN(store2)) {
						
						document.getElementById("acc").innerText = parseInt(store1) - parseInt(store2);
						if(parseInt(store1) - parseInt(store2) < 0) {
							while(document.getElementById("acc").innerText.length < 9) {
								document.getElementById("acc").innerText = "-0" + document.getElementById("acc").innerText.slice(1);
							}
						} else {
							document.getElementById("acc").innerText = "+" + document.getElementById("acc").innerText;
							while(document.getElementById("acc").innerText.length < 9) {
								document.getElementById("acc").innerText = "+0" + document.getElementById("acc").innerText.slice(1);
							}
						}
					} else {
						 if (document.getElementById("acc").innerText != "Not assigned") {
							document.getElementById("log").innerText = prevText + "\rError: The accumulator must be cleared. Use the commands 409 or 209";	
						 }
					} 
				} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
					document.getElementById("log").innerText = prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr.slice(3, 5)) == 9) {
					document.getElementById("acc").innerText = commandStr.slice(5);
				} else {
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						document.getElementById("#1").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						document.getElementById("#2").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						document.getElementById("#3").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						document.getElementById("#4").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						document.getElementById("#5").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						document.getElementById("#6").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						document.getElementById("#7").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						document.getElementById("#8").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						document.getElementById("#9").innerText = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						document.getElementById("#10").innerText = commandStr.slice(5);
					}
        		}
			
			break;
			
			case "4":
				if(commandStr.length == 3) {
					if(parseInt(commandStr.slice(1)) == 9) {
						document.getElementById("acc").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) > 9 && parseInt(commandStr.slice(1)) < 19) {
						document.getElementById("#1").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 19 && parseInt(commandStr.slice(1)) < 28) {
						document.getElementById("#2").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 28 && parseInt(commandStr.slice(1)) < 37) {
						document.getElementById("#3").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 37 && parseInt(commandStr.slice(1)) < 46) {
						document.getElementById("#4").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 46 && parseInt(commandStr.slice(1)) < 55) {
						document.getElementById("#5").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 55 && parseInt(commandStr.slice(1)) < 64) {
						document.getElementById("#6").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 64 && parseInt(commandStr.slice(1)) < 73) {
						document.getElementById("#7").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 73 && parseInt(commandStr.slice(1)) < 82) {
						document.getElementById("#8").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 82 && parseInt(commandStr.slice(1)) < 91) {
						document.getElementById("#9").innerText = "Not assigned";
					} else if(parseInt(commandStr.slice(1)) >= 91 && parseInt(commandStr.slice(1)) < 100) {
						document.getElementById("#10").innerText = "Not assigned";
					}
				}
			break;
		}
	}
	return false;
}