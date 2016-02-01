var curCommands = [
];
var runForTheFirstTime = false;
var straight = [true, true, true, true, true];
var foundBlkMarker = false;
var x = 0;
var i = 0;
var s = 0;
var t = 0;
var ss = false,
	sss = false;
var cmdString, cmdString2;
var rawCurCommands = "";
var prevText = "";
var tpr = [];
var mainWindow;
var blkNum = 0;
var curTpr = 0;
var stbCurTpr = 1;
var TimeToWait;
var ranAlready = false;
var stores = [
];
var looped = [false, false, false, false, false];
var done = false;
var storedValue = null;
var tprPositions = [0, 0, 0, 0, 0];
var outcomeToBePrinted = null;
var tapeValues = [];
String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}
function between(x, min, max) {
  return x >= min && x <= max;
}
function loopIt (element) {
	straight[parseInt(element.id.slice(6)) - 1] = !straight[parseInt(element.id.slice(6)) - 1];
	if (straight[parseInt(element.id.slice(6)) - 1])
		element.innerHTML = "Straight";
	if (!straight[parseInt(element.id.slice(6)) - 1])
		element.innerHTML = "Looped";
	looped[parseInt(element.id.slice(6))] = element.getDisabled();
	console.log(element.id + "  is changed");
}
function create () {
	this.inherited(arguments);


	stores["9"] = "0000000000000000";
}
function handleChange (ele) {
    ele.value = ele.value.replace(/(\n)+/ig, "\n");
	if (ele.id == "num1") {
		curCommands = ele.value.replace(/\n(\+|-|\*)/ig, "$1").replace(/\n\[[0-9]\]/ig, "").split("\n");
		for (i = 0; i < curCommands.length; i++) {
			//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
			if (curCommands[i] == "") {
				curCommands.splice(i, 1);
			}
		}
	}
	console.log(curCommands);
	tpr[parseInt(ele.id.substring(3)) - 1] = ele.value;
    tapeValues = tpr;
	console.log(tpr + " : " + curCommands);
}
function execCommands () {
	
	prevText = document.getElementById("log").innerHTML;
	if (curCommands[0].length != 3 && curCommands[0].length != 5 && curCommands[0].length != 14) {
		curTapeReader = "";
		document.getElementById("log").innerHTML = prevText + "Error: This Command/Block Marker must be 3 or 5 or 9 characters long with a plus/minus included, ex. [1], [2], 21000 or 10110<br />+12345678";
	} else {
		curTapeReader = "";
        if(runForTheFirstTime) {
            evaluate();
        } else {
			done = true;
			blkNum = "1";
			stbCurTpr = "1";
			searchForBlkMarker();
		}
		done = false;
        
	}
	return false;
}
function evaluate () {
	document.getElementById("num1").disabled = true;
	document.getElementById("num2").disabled = true;
	document.getElementById("num3").disabled = true;
	document.getElementById("num4").disabled = true;
	document.getElementById("button1").disabled = true;
	document.getElementById("button2").disabled = true;
	document.getElementById("button3").disabled = true;
	document.getElementById("button4").disabled = true;
	
	
	curCommands = document.getElementById("num" + (curTpr + 1)).value.replace(/(\n)+/ig, "test").replace(/test(\+|-|\*)/ig, "$1").replace(/test\[[0-9]\]/ig, "").split("test");
	for (i = 0; i < curCommands.length; i++) {
		//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
		if (curCommands[i] == "") {
			curCommands.splice(i, 1);
		}
	}
	
	
	
	
	if (curCommands[0] != "") {
		var overflow = 0;
		var prevText = document.getElementById("log").innerHTML;
		console.log(typeof(curCommands));
		if (curCommands != [] && curCommands[0][0] != "[" && curCommands[0][0] != "*" && isNaN(parseInt(curCommands[0]))) {
			document.getElementById("log").innerHTML = prevText + "<br />" + curCommands[0].replace(/(.....)(\+........|\*.....)/ig, "$1") + "<br />Error: Command(s) need to include only numbers and maybe plus signs and dashes";
		} else if (curCommands != []) {
			document.getElementById("log").innerHTML = prevText + "<br />" + curCommands[0].replace(/(.....)(\+........|\*.....)/ig, "$1");
		}
		var prevText = document.getElementById("log").innerHTML;
		ranAlready = true;
		var commandStr = curCommands[0];
		switch (commandStr[0]) {
		case "0":
			switch (commandStr[1]) {
			case "0":
				if(commandStr == "00100") {
					finishLightOn();
					var curTprStr = document.getElementById("num" + (curTpr + 1)).value.split("\n");
					for (g = 0; g < curTprStr.length; g++) {
						if (curTprStr.indexOf("") != -1) {
							curTprStr.splice(curTprStr.indexOf(""), 1);
						}
						if (curTprStr.indexOf("\n") != -1) {
							curTprStr.splice(curTprStr.indexOf("\n"), 1);
						}
					}
					console.log(curTprStr);
					if (straight[curTpr])
						curTprStr.shift();
					else
						curTprStr.push(curTprStr.shift());
					document.getElementById("num" + (curTpr + 1)).value = curTprStr.join("\n");
					stop();
				} else if(commandStr == "00200") {
					alarmLightOn();
					stop();
				}
			break;
			case "1":
				if(commandStr[2] == "1") {
					if(commandStr.slice(3, 5) == "08" || commandStr.slice(3, 5) == "09") {
						storedValue = document.getElementById("090").innerHTML == "0";
					} else if(parseInt(commandStr.slice(3, 5)) >= 10 && parseInt(commandStr.slice(3, 5)) <= 99) {
						var checkValue = document.getElementById("" + commandStr.slice(3, 5)).innerHTML;
						storedValue =  checkValue[0] == "0";
					}
				} else if(commandStr[2] == "2") {
					if(commandStr.slice(3, 5) == "08" || commandStr.slice(3, 5) == "09") {
						storedValue = document.getElementById("090").innerHTML == "9";
					} else if(parseInt(commandStr.slice(3, 5)) >= 10 && parseInt(commandStr.slice(3, 5)) <= 99) {
						var checkValue = document.getElementById("" + commandStr.slice(3, 5)).innerHTML;
						storedValue =  checkValue[0] == "9";
					}
				}
                prevText = document.getElementById("log").innerHTML;
				console.log(storedValue);
			break;
			case "2":
				if (commandStr[2] == "1") {
                    document.getElementById("log").innerHTML = prevText + "<br />Sign: Skip";
					curTpr = parseInt(commandStr.slice(3,5))-1;
					sv6();
				} else if (commandStr[2] == "2" && storedValue) {
                    curTpr = parseInt(commandStr.slice(3,5))-1;
					sv6();
					var prevText = document.getElementById("log").innerHTML;
                    document.getElementById("log").innerHTML = prevText + "<br />Sign: True";
				} else if (commandStr[2] == "2" && !storedValue) {
					var prevText = document.getElementById("log").innerHTML;
                    if(storedValue == null)
                        document.getElementById("log").innerHTML = prevText + "<br />Sign: Null";
                    else
                        document.getElementById("log").innerHTML = prevText + "<br />Sign: False";
				}
			break;
			case "3":
				blkNum = commandStr.slice(2, 3);
				stbCurTpr = commandStr.slice(4);
				done = true;
				searchForBlkMarker();
			break;
			case "5":
				if (storedValue) {
					blkNum = commandStr.slice(2, 3);
					stbCurTpr = commandStr.slice(4);
					done = true;
					searchForBlkMarker();
				} else if (commandStr[2] == "2" && !storedValue) {
					var prevText = document.getElementById("log").innerHTML;
					searchForBlkMarker();
					document.getElementById("log").innerHTML = prevText + "<br />Sign: True";
				} else {
					var prevText = document.getElementById("log").innerHTML;
					if(storedValue == null)
						document.getElementById("log").innerHTML = prevText + "<br />Sign: Null";
					else
						document.getElementById("log").innerHTML = prevText + "<br />Sign: False";
				}
			break;
			case "7": 
				var possibleOutcomes = ["lblblblblb", "", "", "5csign8d", "5csign8dlb", "5csign8dlblb", "6csign6d", "5csign6d", "5csign6dlb", "5csign6dlblb"];
				outcomeToBePrinted = possibleOutcomes[parseInt(commandStr.slice(2, 3))];
			break;
			}
		break;
		case "1":
		case "2":
			if(commandStr.slice(1,3) == "0"+(curTpr+1).toString()) {
				if(commandStr.slice(1,3) == "0"+(curTpr+1).toString()) {
					console.log("Adding to stores...");
					var finStr;
                    if(commandStr[5] && commandStr[5] == "*") {
                        var s1 = "0" + commandStr.slice(6) + "000";
                    } else {
		                console.log(commandStr.slice(5,14));
                        if (commandStr.slice(5, 6) == "+") {
							var s1 = "0" + commandStr.slice(6);
						} else {
							var s1 = "9" + (99999999 - parseInt(commandStr.slice(6)));
						}
                    }
					finStr = s1;
					if (commandStr.slice(3,5) == "09") {
						while ( finStr.length < 16 ) {
							finStr = finStr + "0";
						}
					}
					console.log(finStr);
					stores[parseInt(commandStr.slice(3, 5))] = finStr;
				} else if ((parseInt(commandStr.slice(3, 5)) - 10) / 9 < 0 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
					// sanity check for valid store addresses //
					document.getElementById("log").innerHTML = prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "with \"08-99\"";
				} else if (parseInt(commandStr.slice(3, 5)) == 8) {
					// accumulator store 08 //
					console.log("08ing");
				} else if (parseInt(commandStr.slice(3, 5)) == 9) {
					// accumulator store 09//
					console.log("09ing");
				} else if(document.getElementById("" + commandStr.slice(3, 5)) == " " || !between(parseInt(commandStr.slice(3, 5)), 8, 99)) {
					document.getElementById("log").innerHTML = prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
				}
			} else if(parseInt(commandStr.slice(3, 5)) == 1 || parseInt(commandStr.slice(3, 5)) == 3) {
					console.log("Printing.....");
					prevText = document.getElementById("printer").innerHTML;
					prevText += outcomeToBePrinted;
					prevText = prevText.replace(/lb/g, "<br />");
					if(commandStr.slice(1, 3) != "08" && commandStr.slice(1, 3) != "09") {
						var printText = document.getElementById("" + commandStr.slice(1, 3)).innerHTML;
					} else if(commandStr.slice(1, 3) == "08") {
						var printText = document.getElementById("" + commandStr.slice(1, 3)).innerHTML[0] + document.getElementById("" + commandStr.slice(1, 3)).innerHTML.slice(8, 15);
					} else if(commandStr.slice(1, 3) == "09") {
						var printText = document.getElementById("" + commandStr.slice(1, 3)).innerHTML.slice(0,9);
					}
					var printVal;
                    console.log(printText);
					if(printText[0] == "0") {
						prevText = prevText.replace(/sign/g, "+");
						printVal = parseInt(printText);
					}
					else {
						prevText = prevText.replace(/sign/g, "-");
						printVal=(999999999 - parseInt(printText));
					}
					if(outcomeToBePrinted != "lblblblblb") {
						var fixedValue;
						printVal = (printVal/10000000);
						fixedValue = printVal.toFixed(7);
						prevText = prevText.replace(/8d/g, fixedValue);
						prevText = prevText.replace(/6d/g, (Math.round(printVal/100)/100000));
					}
					prevText = prevText.replace(/5c/g, "  ");
					prevText = prevText.replace(/6c/g, "   ");
					document.getElementById("printer").innerHTML = prevText;
			} else if (document.getElementById("" + commandStr.slice(1, 3)) && document.getElementById("" + commandStr.slice(3, 5)) && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && document.getElementById("" + commandStr.slice(1, 3)).innerHTML != " ") {
					var s1 = parseInt(document.getElementById("" + commandStr.slice(3, 5)).innerHTML);
					var s2 = parseInt(document.getElementById("" + commandStr.slice(1, 3)).innerHTML);
					if (commandStr.slice(1,3) == "09") {
						s2 = Math.round((s2/10000000)-0.5);
					}
					var s3 = s1 + s2;
					if (Math.round((s3/1000000000)-0.5)) {
						s3 = (s3 - 1000000000)+1;
					}
					console.log("s1 - " + s1);
					console.log("s2 - " + s2);
					console.log("s3 - " + s3);
					finStr = (s3).toString();
					console.log("finStr - " + finStr);
					while ( finStr.length < 9 )
						finStr = "0" + finStr ;
					if (commandStr.slice(3,5) == "09") {
						while ( finStr.length < 16 ) {
							finStr = finStr + "0";
						}
					}

				console.log(finStr);
				console.log("Adding stores together!");
				stores[parseInt(commandStr.slice(3, 5))] = finStr;
				if (commandStr[0] == "2" ) {
					stores[parseInt(commandStr.slice(1, 3))] = "000000000";
					ss = true;
					cmdString = commandStr.slice(1, 3);
					updateStores();
				}

			}
			if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {
				console.log("first if statement!");
				sss = true;
				cmdString2 = commandStr.slice(1, 3);
				updateSecStores();
			} else if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) == "09") {
				updateTriStores();
			} else if (document.getElementById("" + commandStr.slice(3, 5)) && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && commandStr.slice(2, 3) == curTpr + 1) {
				console.log("Updating");
				ss = true;
				cmdString = commandStr.slice(3, 5);
				updateStores();
			} else if (commandStr.slice(1, 5).indexOf(curTpr + "09") != -1) {
				updateQudStores();
			} else if (commandStr.slice(1, 5).indexOf(curTpr + "08") !=-1) {
				updateQudStores();
			} else if (document.getElementById("" + commandStr.slice(1, 3)) && document.getElementById("" + commandStr.slice(3, 5)) && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && document.getElementById("" + commandStr.slice(1, 3)).innerHTML != " ") {
				console.log("Updating 2");
				ss = true;
				cmdString = commandStr.slice(3, 5);
				updateStores();
			}
			console.log(stores);
		break;
		case "3":
		case "4":
			if (commandStr.slice(2, 3) == (curTpr + 1).toString()) {
				if(commandStr.slice(1,3) == "0"+(curTpr+1).toString()) {
					console.log("Adding to stores...");
					var finStr;
                    if(commandStr[5] && commandStr[5] == "*") {
                        var s1 = "0" + commandStr.slice(6) + "000";
                    } else {
		                console.log(commandStr.slice(5,14));
                        if (commandStr.slice(5, 6) == "+") {
							var s1 = "0" + commandStr.slice(6);
						} else {
							var s1 = "9" + (99999999 - parseInt(commandStr.slice(6)));
						}
                    }
					finStr = s1;
					console.log(finStr);
					stores[parseInt(commandStr.slice(3, 5))] = finStr;
				} else if ((parseInt(commandStr.slice(3, 5)) - 10) / 9 < 0 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
					// sanity check for valid store addresses //
					document.getElementById("log").innerHTML = prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "with \"08-99\"";
				} else if (parseInt(commandStr.slice(3, 5)) == 8) {
					// accumulator store 08 //
					console.log("08ing");
				} else if (parseInt(commandStr.slice(3, 5)) == 9) {
					// accumulator store 09//
					console.log("09ing");
				} else if(document.getElementById("" + commandStr.slice(3, 5)) == " " || !between(parseInt(commandStr.slice(3, 5)), 8, 99)) {
					document.getElementById("log").innerHTML = prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
				}
			} else if(parseInt(commandStr.slice(3, 5)) == 1 || parseInt(commandStr.slice(3, 5)) == 3) {
					console.log("Printing.....");
					prevText = document.getElementById("printer").innerHTML;
					prevText += outcomeToBePrinted;
					prevText = prevText.replace(/lb/g, "<br />");
                    if(commandStr.slice(1, 3) != "08" && commandStr.slice(1, 3) != "09") {
		                var printText = document.getElementById("" + commandStr.slice(1, 3)).innerHTML;
                    } else if(commandStr.slice(1, 3) == "08") {
                        var printText = document.getElementById("" + commandStr.slice(1, 3)).innerHTML[0] + document.getElementById("" + commandStr.slice(1, 3)).innerHTML.slice(8, 15);
                    } else if(commandStr.slice(1, 3) != "09") {
                        var printText = document.getElementById("" + commandStr.slice(1, 3)).innerHTML[0] + document.getElementById("" + commandStr.slice(1, 3)).innerHTML.slice(8, 15);
                    }
					var printVal;
					if(printText[0] == "0") {
						prevText = prevText.replace(/sign/g, "+");
						printVal = parseInt(printText);
					}
					else {
						prevText = prevText.replace(/sign/g, "-");
						printVal=(999999999 - parseInt(printText));
					}
					if(outcomeToBePrinted != "lblblblblb") {
						prevText = prevText.replace(/8d/g, (printVal/10000000));
						prevText = prevText.replace(/6d/g, (Math.round(printVal/100)/100000));
					}
					prevText = prevText.replace(/5c/g, "  ");
					prevText = prevText.replace(/6c/g, "   ");
					document.getElementById("printer").innerHTML = prevText;
			} else if (document.getElementById("" + commandStr.slice(1, 3)) && document.getElementById("" + commandStr.slice(3, 5)) && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && document.getElementById("" + commandStr.slice(1, 3)).innerHTML != " ") {
					var s1 = parseInt(document.getElementById("" + commandStr.slice(3, 5)).innerHTML);
					var s2 = (999999999 - parseInt(document.getElementById("" + commandStr.slice(1, 3)).innerHTML));
					var s3 = s1+s2;
					if (Math.round((s3/1000000000)-0.5)) {
						s3 = (s3 - 1000000000)+1;
					}
					console.log("s1 - " + s1);
					console.log("s2 - " + s2);
					console.log("s3 - " + s3);
					finStr = (s3).toString();
					console.log("finStr - " + finStr);
					while ( finStr.length < 9 )
						finStr = "0" + finStr ;
				console.log(finStr);
				console.log("Adding stores together!");
				stores[parseInt(commandStr.slice(3, 5))] = finStr;
				if (commandStr[0] == "4" ) {
					stores[parseInt(commandStr.slice(1, 3))] = "000000000";
					ss = true;
					cmdString = commandStr.slice(1, 3);
					updateStores();
				}

			}
			if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {
				console.log("first if statement!");
				sss = true;
				cmdString2 = commandStr.slice(1, 3);
				updateSecStores();
			} else if (document.getElementById("" + commandStr.slice(3, 5)) && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && commandStr.slice(2, 3) == curTpr + 1 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
				console.log("Updating");
				ss = true;
				cmdString = commandStr.slice(3, 5);
				updateStores();
			} else if (commandStr.slice(1, 5).indexOf(curTpr + "09") != -1) {
				updateQudStores();
			} else if (commandStr.slice(1, 5).indexOf(curTpr + "08") !=-1) {
				updateQudStores();
			} else if (document.getElementById("" + commandStr.slice(1, 3)) && document.getElementById("" + commandStr.slice(3, 5)) && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && document.getElementById("" + commandStr.slice(1, 3)).innerHTML != " ") {
				console.log("Updating 2");
				ss = true;
				cmdString = commandStr.slice(3, 5);
				updateStores();
			}
			console.log(stores);
		break;
		case "5":
			console.log(document.getElementById("" + commandStr.slice(1, 3)).innerHTML);
			if (document.getElementById("" + commandStr.slice(1, 3)).innerHTML != " " && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " ") {
				var s1 = parseInt(document.getElementById("" + commandStr.slice(3, 5)).innerHTML);
				var s2 = parseInt(document.getElementById("" + commandStr.slice(1, 3)).innerHTML);
				var s3 = (s1 * s2);
				s3 = Math.round(s3);
				var carry_out = Math.round((s3/1000000000)-0.5);
				console.log("s1 - " + s1);
				console.log("s2 - " + s2);
				console.log("s3 - " + s3);
				if (carry_out) {
					s3 = (s3 - (carry_out * 1000000000))+carry_out;
				}
				finStr = (s3).toString();
				console.log("finStr - " + finStr);
				while ( finStr.length < 16 )
					finStr = "0" + finStr ;

				console.log(finStr);

				stores[9] = finStr;
			} else {
				document.getElementById("log").innerHTML = prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
			}
			if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {

			} else if (document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && commandStr.slice(3, 5) != "00") {
				cmdString = commandStr.slice(1, 3);
				updateQudStores();
				sss = true;
				cmdString2 = commandStr.slice(3, 5);
				updateSecStores();
			}
			console.log(stores);
			break;
		case "6":
			console.log(document.getElementById("" + commandStr.slice(1, 3)).innerHTML);
			if (document.getElementById("" + commandStr.slice(1, 3)).innerHTML != " " && document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " ") {
				var s1 = parseInt(stores[9].slice(0,9));
				var s2 = parseInt(document.getElementById("" + commandStr.slice(1, 3)).innerHTML);
				var s3 = (s1 / s2) * 10000000;
				console.log("s1 - " + s1);
				console.log("s2 - " + s2);
				console.log("s3 - " + s3);
				s3 = Math.round(s3);
				finStr = (s3).toString();
				console.log("finStr - " + finStr);
				while ( finStr.length < 9 )
					finStr = "0" + finStr;

				console.log(finStr);

				stores[commandStr.slice(3, 5)] = finStr;
			} else {
				document.getElementById("log").innerHTML = prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.";
			}
			if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {

			} else if (document.getElementById("" + commandStr.slice(3, 5)).innerHTML != " " && commandStr.slice(3, 5) != "00") {
				console.log("Updating 6");
				ss = true;
				cmdString = commandStr.slice(3, 5);
				updateStores();
				cmdString = commandStr.slice(1, 3);
				updateQudStores();
				sss = true;
				cmdString2 = commandStr.slice(3, 5);
				updateSecStores();
			}
			console.log(stores);
			break;
		}
		
		if (!done)
			setTimeout(switchback, 1506);
		if(document.getElementById("num" + (curTpr + 1)).value.indexOf(/<[^>]+>/ig) != -1 || document.getElementById("num" + (curTpr + 1)).value == "") {
			finishLightOn();
            stop();
        }
	}
}
function switchback () {
	var curTprStr = document.getElementById("num" + (curTpr + 1)).value.split("\n");
	for (g = 0; g < curTprStr.length; g++) {
		if (curTprStr.indexOf("") != -1) {
			curTprStr.splice(curTprStr.indexOf(""), 1);
		}
		if (curTprStr.indexOf("\n") != -1) {
			curTprStr.splice(curTprStr.indexOf("\n"), 1);
		}
	}
	console.log(curTprStr);
	if (straight[curTpr])
		curTprStr.shift();
	else
		curTprStr.push(curTprStr.shift());
	document.getElementById("num" + (curTpr + 1)).value = curTprStr.join("\n");
	if (curTprStr != "")
		evaluate();
	else {
        finishLightOn();
		stop();
    }
}
function updateStores () {
	console.log("updateStores!");
	console.log(cmdString + "-" + s);
	document.getElementById("" + cmdString).innerHTML = stores[parseInt(cmdString)];
	console.log(s);
	console.log(stores);
	s = 0;
	ss = false;
}
function updateSecStores () {
	console.log("updateSecStores!");
		console.log(cmdString2 + "-" + s);
		document.getElementById("" + cmdString2).innerHTML = "000000000";
		stores[parseInt(cmdString2)] = "000000000";
		console.log(stores);
		s = 0;
		sss = false;
		cmdString2 = "";
}
function updateTriStores () {
	document.getElementById("09").innerHTML = "0000000000000000";
}
function updateQudStores () {
	document.getElementById("09").innerHTML = stores[9];
}
function stop () {
	done = true;
	document.getElementById("num1").disabled = false;
	document.getElementById("num2").disabled = false;
	document.getElementById("num3").disabled = false;
	document.getElementById("num4").disabled = false;
	document.getElementById("button1").disabled = false;
	document.getElementById("button2").disabled = false;
	document.getElementById("button3").disabled = false;
	document.getElementById("button4").disabled = false;
	
}
function sv6() {
	evaluate();
}
function searchForBlkMarker () {
	if(done) {
		if (document.getElementById("num" + stbCurTpr).value != "" && done) {
			
			var curTprStr = document.getElementById("num" + stbCurTpr).value.split("\n");
			console.log(blkNum + ":" + curTprStr[0]);
			if (curTprStr[0] == "[" + blkNum + "]") {
				console.log("YESSSSSSS!");
				foundBlkMarker = true;
				done = false;
			}
			console.log(foundBlkMarker + ":" + done);
			for (g = 0; g < curTprStr.length; g++) {
				if (curTprStr.indexOf("") != -1) {
					curTprStr.splice(curTprStr.indexOf(""), 1);
				}
				if (curTprStr.indexOf("\n") != -1) {
					curTprStr.splice(curTprStr.indexOf("\n"), 1);
				}
			}
			console.log(curTprStr);
			if (straight[parseInt(stbCurTpr) - 1])
				curTprStr.shift();
			else
				curTprStr.push(curTprStr.shift());
			document.getElementById("num" + (stbCurTpr)).value = curTprStr.join("\n");
		}
		if (!foundBlkMarker && document.getElementById("num" + stbCurTpr).value == "") {
			var prevText = document.getElementById("log").innerHTML;
			if(runForTheFirstTime) {
				document.getElementById("log").innerHTML = prevText + "<br />Block marker not found";
			} else {
                alarmLightOn();
				document.getElementById("log").innerHTML = prevText + "<br />Block marker 1 not found on first tape reader";
				stop();
			}
				
			done = false;
			if(stbCurTpr != curTpr) {
				var curTprStr = document.getElementById("num" + (curTpr+1)).value.split("\n");
				for (g = 0; g < curTprStr.length; g++) {
					if (curTprStr.indexOf("") != -1) {
						curTprStr.splice(curTprStr.indexOf(""), 1);
					}
					if (curTprStr.indexOf("\n") != -1) {
						curTprStr.splice(curTprStr.indexOf("\n"), 1);
					}
				}
				console.log(curTprStr);
				if (straight[parseInt(curTpr) - 1])
					curTprStr.shift();
				else
					curTprStr.push(curTprStr.shift());
				document.getElementById("num" + (curTpr+1)).value = curTprStr.join("\n");
			}
			done = false;
			
			switchback();
		} else if (foundBlkMarker && document.getElementById("num" + stbCurTpr).value != "") {
			var curTprStr = document.getElementById("num" + (curTpr+1)).value.split("\n");
			for (g = 0; g < curTprStr.length; g++) {
				if (curTprStr.indexOf("") != -1) {
					curTprStr.splice(curTprStr.indexOf(""), 1);
				}
				if (curTprStr.indexOf("\n") != -1) {
					curTprStr.splice(curTprStr.indexOf("\n"), 1);
				}
			}
			if(stbCurTpr != curTpr + 1) {
				console.log(curTprStr);
				if (straight[parseInt(curTpr) - 1])
					curTprStr.shift();
				else
					curTprStr.push(curTprStr.shift());
				document.getElementById("num" + (curTpr+1)).value = curTprStr.join("\n");
			}
			done = false;
            var prevText = document.getElementById("log").innerHTML;
            if(!runForTheFirstTime) {
				document.getElementById("log").innerHTML = prevText + "<br />[1]";
			}
			evaluate();
			runForTheFirstTime = true;
			foundBlkMarker = false;
		} else if (!foundBlkMarker && document.getElementById("num" + stbCurTpr).value != "") {
			ranAlready = true;
			sv5();
			console.log("Ugghhhh!");
		}
	}
	console.log(done);
}
function sv5 () {
	setTimeout(searchForBlkMarker, 712);
}
function alarmLightOn() {
    document.getElementById("AlarmLight").checked = true;
}
function alarmLightOff() {
    document.getElementById("AlarmLight").checked = false;
}
function finishLightOn() {
    document.getElementById("FinishLight").checked = true;
}
function finishLightOff() {
    document.getElementById("FinishLight").checked = false;
}
function resetTapes() {
    finishLightOff();
    alarmLightOff();
    for(var ts = 1; ts <= 4; ts++) {
        if(tapeValues[ts-1] == undefined)
            tapeValues[ts-1] = "";
        document.getElementById("num" + ts).value = tapeValues[ts-1];
    }
    curTpr = 0;
    curCommands = document.getElementById("num1").value.replace(/\n(\+|-|\*)/ig, "$1").replace(/\n\[[0-9]\]/ig, "").split("\n");
    for (i = 0; i < curCommands.length; i++) {
    	//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
    	if (curCommands[i] == "") {
    		curCommands.splice(i, 1);
    	}
    }
    console.log(curCommands);
    for(var c=0; c<4; c++) {
        tpr[parseInt(document.getElementById("num" + (c+1)).id.substring(3)) - 1] = document.getElementById("num" + (c+1)).value;
    }
    runForTheFirstTime = false;
    done = true;
}
function saveFile() {
    var tprText = (isInSingleStepMode) ? "ss" : "as" + "\n";
    for(var x = 0; x<4; x++) {
        tprText = tprText + (looped[x] ? "l\n":"s\n") + this.$["num" + (x + 1)].get("value") + "\n";
    }
    console.log(tprText + " is the save file contents");
    var theBlob = new Blob([tprText], {type: "text/plain;charset=" + document.characterSet});
	var fileName = prompt("Enter your file name (no extension).", "program");
	if(fileName) {
    	saveAs(theBlob, fileName + ".wtpr");
	}
}
function loadTapesFile() {
    theObjInitializer = this;
    var doneWithReading = false;
    var fileSelector = document.createElement('input');
    var file;
    var reader;
    var loadedStepMode;
    var loadedText;
    var loadedTextArray;
    var loadedLoopedArray;
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.wtpr');
    fileSelector.setAttribute('multiple', 'false');
    fileSelector.onchange = function(event) {
        file = event.target.files[0];
        reader = new FileReader();
        reader.onload = function() {
            loadedText = reader.result;
            console.log(loadedText);
            loadedStepMode = loadedText.split(/\n/g)[0];
            loadedTextArray = loadedText.split(/[^sa][sl]\n/g);
            loadedLoopedArray = loadedText.split(/[^sl]+/g);
			loadedLoopedArray.shift();
            for(var x = 0; x<4; x++) {
				if(loadedLoopedArray[x] == "s") {
					looped[x] = false;
					straight[x] = true;
					document.getElementById("button"+(x+1)).innerHTML = "Straight";
				} else {
					looped[x] = true;
					straight[x] = false;
					document.getElementById("button"+(x+1)).innerHTML = "Looped";
				}
				if((document.getElementById("enableSingleStep").innerHTML=="Single Step Mode") != (loadedStepMode == "ss")) theObjInitializer.singleStepModeSwitch();
                document.getElementById("num" + (x + 1)).value = loadedTextArray[x + 1];
                handleChange(document.getElementById("num" + (x + 1)), null);
            }
        }
        reader.readAsText(file, "text/plain;charset=" + document.characterSet);
    }
    fileSelector.click();
}
function resizeHandler() {
	this.inherited(arguments);
	resizeTheDivs();
}
function shiftSelect(num, pow) {
	console.log("num initially is: " + num);
	console.log("pow initially is: " + pow);
	var numStr = (num * Math.pow(10 , pow)).toString();
	
	console.log("numStr after pow is: " + numStr);
	
	while ( numStr.length < 9 )
		numStr = "0" + numStr;
	
	console.log("numStr after adjustment is: " + numStr);
	if(numStr.length > 8) {
		if(pow >= 0) {
			numStr = numStr.slice(pow, 9);
		} else {
			numStr = numStr.slice(0, pow);
		}
	}
	
	console.log("numStr after slicing is: " + numStr);
	
	return parseInt(numStr);
}

window.onload = function() {
	var table = document.getElementById("stores");
	
	for(var x = 1; x<10; x++) {
		var row = document.createElement("tr");
		table.children[0].appendChild(row);
		var tempColumn = document.createElement("td");
		tempColumn.innerHTML = x;
		tempColumn.style.width = "2ch";
		tempColumn.classList.add("tblcell");
		tempColumn.classList.add("text-fit");
		row.appendChild(tempColumn);
		for(var y = 0; y<10; y++) {
			var column = document.createElement("td");
			column.id = x.toString()+y.toString();
			column.innerHTML = "         ";
			column.style.width = "9ch";
			column.classList.add("tblcell");
			tempColumn.classList.add("text-fit");
			row.appendChild(column);
		}
	}
}	

function autoResizeTextArea(ele) {
	ele.style.overflowY = "hidden";
	ele.style.height = "auto";
	ele.style.height = ele.scrollHeight+"px";
	document.getElementById("num1").style.height = ele.style.height;
	document.getElementById("num2").style.height = ele.style.height;
	document.getElementById("num3").style.height = ele.style.height;
	document.getElementById("num4").style.height = ele.style.height;
}

//window.onresize = resizeTheDivs;

/*function resizeTheDivs() {
	x=getWinDims()[0];
	y=getWinDims()[1];
	console.log("X: "+x+" Y:"+y);
	if(x<1400 || y<880) {
		document.body.style.webkitTransform = document.body.style.msTransform = document.body.style.mozTransform = document.body.style.transform="scale("+Math.min(y/880,  x/1400)+","+Math.min(y/880,  x/1350)+")";
		document.body.style.webkitTransformOrigin = document.body.style.msTransformOrigin = document.body.style.mozTransformOrigin = document.body.style.transformOrigin=Math.min(y/880,  x/1400)+"% "+Math.min(y/880,  x/1350)+"%";
	} else {
		document.getElementById('spacer').style.webkitTransform = document.getElementById('spacer').style.msTransform = document.getElementById('spacer').style.mozTransform = document.getElementById('spacer').style.transform="scale("+Math.min(y/880,  x/1450)+","+Math.min(y/880,  x/1450)+")";
		document.getElementById('spacer').style.webkitTransformOrigin = document.getElementById('spacer').style.msTransformOrigin = document.getElementById('spacer').style.mozTransformOrigin = document.getElementById('spacer').style.transformOrigin=Math.min(y/880,  x/1450)+"% "+Math.min(y/880,  x/1450)+"%";
	}
}
function getWinDims() {
	var viewportwidth;
	var viewportheight;
	
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerWidth,
			viewportheight = window.innerHeight
	} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		viewportwidth = document.documentElement.clientWidth,
		viewportheight = document.documentElement.clientHeight
	} else {
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		viewportheight = document.getElementsByTagName('body')[0].clientHeight
	}
	return [viewportwidth, viewportheight];
}*/
