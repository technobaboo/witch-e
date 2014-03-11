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
			document.getElementById("log").innerHTML = prevText + '\r' + document.getElementById("commands").value + "\rError: Command(s) need to include only numbers and maybe plus signs and dashes";
		} else {
			document.getElementById("log").innerHTML = prevText + '\r' + curCommands[i];
		}
	}
	return false;
}
			
function execCommands(commands) {
	prevText = document.getElementById("log").value;
	
	if(curCommands[curCommands.length -1].length != 5 && curCommands[curCommands.length -1].length != 3 && curCommands[curCommands.length -1].length != 14) {
		document.getElementById("commands").value = "";
		document.getElementById("log").innerHTML = prevText + "\rError: This Command must be 5 or 3 or 14 characters long";
	} else {
		document.getElementById("commands").value = "";
		evaluate(false);
	}
	return false;
}
			
function evaluate(isd8) {
	document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML;
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
						store2 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						store2 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						store2 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						store2 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						store2 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						store2 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						store2 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						store2 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						store2 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						store2 = document.getElementById("#10");
					}
					
					if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
						store1 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
						store1 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
						store1 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
						store1 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
						store1 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
						store1 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
						store1 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
						store1 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
						store1 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
						store1 = document.getElementById("#10");
					}
					if(!isNaN(store1.innerHTML) && !isNaN(store2.innerHTML)) {
						
						store2.innerHTML = parseInt(store1.innerHTML) + parseInt(store2.innerHTML);
						if(store2.innerHTML.length < 8) {
							if(parseInt(store1.innerHTML) + parseInt(store2.innerHTML) < 0) {
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "-0" + store2.innerHTML.slice(1);
								}
							} else {
								store2.innerHTML = "+" + store2.innerHTML;
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "+0" + store2.innerHTML.slice(1);
								}
							}
						} else { 
							if(parseInt(store1.innerHTML) + parseInt(store2.innerHTML) > 0) {
								store2.innerHTML = "+" + store2.innerHTML;
							}
						}
					} else {
						document.getElementById("log").innerHTML = prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
					}
				} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
					document.getElementById("log").innerHTML = prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr.slice(3, 5)) == 9) {
					document.getElementById("acc").innerHTML = commandStr.slice(5);
				} else {
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						document.getElementById("#1").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						document.getElementById("#2").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						document.getElementById("#3").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						document.getElementById("#4").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						document.getElementById("#5").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						document.getElementById("#6").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						document.getElementById("#7").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						document.getElementById("#8").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						document.getElementById("#9").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						document.getElementById("#10").innerHTML = commandStr.slice(5);
					}
        		}
			
			break;
			
	
			case "2":
				if(commandStr.slice(0, 3) != "101") {
					var store1 = NaN;
					var store2 = NaN;
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						store2 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						store2 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						store2 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						store2 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						store2 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						store2 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						store2 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						store2 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						store2 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						store2 = document.getElementById("#10");
					}
					
					if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
						store1 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
						store1 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
						store1 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
						store1 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
						store1 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
						store1 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
						store1 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
						store1 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
						store1 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
						store1 = document.getElementById("#10");
					}
					if(!isNaN(store1.innerHTML) && !isNaN(store2.innerHTML)) {
						
						store2.innerHTML = parseInt(store1.innerHTML) + parseInt(store2.innerHTML);
						if(store2.innerHTML.length < 8) {
							if(parseInt(store1.innerHTML) + parseInt(store2.innerHTML) < 0) {
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "-0" + store2.innerHTML.slice(1);
								}
							} else {
								store2.innerHTML = "+" + store2.innerHTML;
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "+0" + store2.innerHTML.slice(1);
								}
							}
						} else { 
							if(parseInt(store1.innerHTML) + parseInt(store2.innerHTML) > 0) {
								store2.innerHTML = "+" + store2.innerHTML;
							}
						}
						store1.innerHTML = "Not assigned";
					} else {
						document.getElementById("log").innerHTML = prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
					}
				} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
					document.getElementById("log").innerHTML = prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr.slice(3, 5)) == 9) {
					document.getElementById("acc").innerHTML = commandStr.slice(5);
				} else {
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						document.getElementById("#1").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						document.getElementById("#2").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						document.getElementById("#3").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						document.getElementById("#4").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						document.getElementById("#5").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						document.getElementById("#6").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						document.getElementById("#7").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						document.getElementById("#8").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						document.getElementById("#9").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						document.getElementById("#10").innerHTML = commandStr.slice(5);
					}
        		}
			break;
			
			
			case "3":
				if(commandStr.slice(0, 3) != "301") {
					var store1 = NaN;
					var store2 = NaN;
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						store2 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						store2 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						store2 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						store2 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						store2 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						store2 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						store2 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						store2 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						store2 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						store2 = document.getElementById("#10");
					}
					
					if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
						store1 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
						store1 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
						store1 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
						store1 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
						store1 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
						store1 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
						store1 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
						store1 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
						store1 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
						store1 = document.getElementById("#10");
					}
					if(!isNaN(store1.innerHTML) && !isNaN(store2.innerHTML)) {
						
						store2.innerHTML = parseInt(store1.innerHTML) - parseInt(store2.innerHTML);
						if(store2.innerHTML.length < 8) {
							if(parseInt(store1.innerHTML) - parseInt(store2.innerHTML) < 0) {
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "-0" + store2.innerHTML.slice(1);
								}
							} else {
								store2.innerHTML = "+" + store2.innerHTML;
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "+0" + store2.innerHTML.slice(1);
								}
							}
						} else { 
							if(parseInt(store1.innerHTML) + parseInt(store2.innerHTML) > 0) {
								store2.innerHTML = "+" + store2.innerHTML;
							}
						}
					} else {
						document.getElementById("log").innerHTML = prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
					}
				} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
					document.getElementById("log").innerHTML = prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr.slice(3, 5)) == 9) {
					document.getElementById("acc").innerHTML = commandStr.slice(5);
				} else {
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						document.getElementById("#1").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						document.getElementById("#2").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						document.getElementById("#3").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						document.getElementById("#4").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						document.getElementById("#5").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						document.getElementById("#6").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						document.getElementById("#7").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						document.getElementById("#8").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						document.getElementById("#9").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						document.getElementById("#10").innerHTML = commandStr.slice(5);
					}
        		}
			
			break;
			
			case "4":
				if(commandStr.slice(0, 3) != "301") {
					var store1 = NaN;
					var store2 = NaN;
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						store2 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						store2 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						store2 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						store2 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						store2 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						store2 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						store2 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						store2 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						store2 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						store2 = document.getElementById("#10");
					}
					
					if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
						store1 = document.getElementById("#1");
					} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
						store1 = document.getElementById("#2");
					} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
						store1 = document.getElementById("#3");
					} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
						store1 = document.getElementById("#4");
					} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
						store1 = document.getElementById("#5");
					} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
						store1 = document.getElementById("#6");
					} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
						store1 = document.getElementById("#7");
					} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
						store1 = document.getElementById("#8");
					} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
						store1 = document.getElementById("#9");
					} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
						store1 = document.getElementById("#10");
					}
					if(!isNaN(store1.innerHTML) && !isNaN(store2.innerHTML)) {
						
						store2.innerHTML = parseInt(store1.innerHTML) - parseInt(store2.innerHTML);
						if(store2.innerHTML.length < 8) {
							if(parseInt(store1.innerHTML) - parseInt(store2.innerHTML) < 0) {
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "-0" + store2.innerHTML.slice(1);
								}
							} else {
								store2.innerHTML = "+" + store2.innerHTML;
								while(store2.innerHTML.length < 9) {
									store2.innerHTML = "+0" + store2.innerHTML.slice(1);
								}
							}
						} else { 
							if(parseInt(store1.innerHTML) + parseInt(store2.innerHTML) > 0) {
								store2.innerHTML = "+" + store2.innerHTML;
							}
						}
						store1.innerHTML = "Not assigned";
					} else {
						document.getElementById("log").innerHTML = prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
					}
				} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
					document.getElementById("log").innerHTML = prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"";
				} else if(parseInt(commandStr.slice(3, 5)) == 9) {
					document.getElementById("acc").innerHTML = commandStr.slice(5);
				} else {
					if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
						document.getElementById("#1").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
						document.getElementById("#2").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
						document.getElementById("#3").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
						document.getElementById("#4").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
						document.getElementById("#5").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
						document.getElementById("#6").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
						document.getElementById("#7").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
						document.getElementById("#8").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
						document.getElementById("#9").innerHTML = commandStr.slice(5);
					} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
						document.getElementById("#10").innerHTML = commandStr.slice(5);
					}
        		}
			break;
		}
	}
	return false;
}
function SaveStores() {
	var a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob([document.getElementById("acc").innerHTML+","+document.getElementById("#1").innerHTML+","+document.getElementById("#2").innerHTML+","+document.getElementById("#3").innerHTML+","+document.getElementById("#4").innerHTML+","+document.getElementById("#5").innerHTML+","+document.getElementById("#6").innerHTML+","+document.getElementById("#7").innerHTML+","+document.getElementById("#8").innerHTML+","+document.getElementById("#9").innerHTML+","+document.getElementById("#10").innerHTML], {type: 'text/csv'}));
	a.download = 'test.csv';

// Append anchor to body.
	document.body.appendChild(a)
	a.click();
	
	// Remove anchor from body
	document.body.removeChild(a)
}

function uploadfile() {
	for(i = 0; i >= 11; i++) {
		var reader = new FileReader();

		reader.onload = function(e) {
		}

		if(i==0) {
			document.getElementById("acc").innerHTML = 
			fileDisplayArea.innerText = reader.result.split(",")[0];
			reader.readAsText(file);
		} else {
			document.getElementById("#"+i).innerHTML = new FileReader().readAsText(document.getElementById('filepicker').files[0]).split(",")[i];
		}
	}
	
}