/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/
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
String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}
function between(x, min, max) {
  return x >= min && x <= max;
}
enyo.kind({
	name: "emulatorMain",
	kind: "Control",
	classes: "moon enyo-fit enyo-fill",
	pattern:"activity",
	components: [
			{
				kind: "moon.Scroller",
				fit: true,
				classes: "enyo-fill",
				components: [
					{
						name: "panels",
						kind: "FittableColumns",
						pattern: "none",
						fit: true,
						style: "height:475px",
						components: [
							{
								name: "panel2",
								style: "height: 572px;",
								components: [
									{
										kind: "moon.Header",
										title: "Log",
										classes: "headers"
								},
									{
										kind: "moon.Scroller",
										fit: true,
										horizontal: "hidden",
										classes: "enyo-fill",
										spotlight: false,
										components: [
											{
												kind: "moon.InputDecorator",
												classes: "closetohundred",
												style: "height:410px;",
												fit: true,
												components: [
													{
														kind: "enyo.TextArea",
														classes: "dek",
														name: "log",
														classes: "enyo-fill",
														disabled: true,
														value: "WITCH-E v2.0.0",
														fit: true,
														spotlight: false
                                                }
                                            ]
                                        }
                                    ]
                                },
									{
										tag: "br"
									},
									{
										tag: "br"
									}
                            ]
                        },
                        /*
				{name:"panel3", components: [
	{kind: "moon.Header", title: "Printer", titleBelow:"Out it goes!", fit:true},
	{kind: "moon.InputDecorator", fit:true, classes:"enyo-fill", style:"height:500px;", fit:true, components: [
			{kind: "moon.TextArea", classes:"dek", name:"log", classes:"enyo-fill", disabled: true, spotlight:false, value:"Ready to print", fit:true}
		]},
	
				]}*/
							{
								name: "panel4",
								kind: "FittableRows",
								classes: "tapereaderpanel",
								components: [
									{
										kind: "moon.Header",
										title: "Tape Readers",
										classes: "headers"
									},
									{
										kind: "FittableColumns",
										components: [
											{
												name: "button1",
												kind: "enyo.Button",
												style: "font-size: 27px; width:128px;",
												content: "Straight",
												onclick: "loopIt"
											},

											{
												name: "button2",
												kind: "enyo.Button",
												style: "font-size: 27px; width:128px;",
												content: "Straight",
												onclick: "loopIt"
											},

											{
												name: "button3",
												kind: "enyo.Button",
												style: "font-size: 27px; width:128px;",
												content: "Straight",
												onclick: "loopIt"
											},

											{
												name: "button4",
												kind: "enyo.Button",
												style: "font-size: 27px; width:128px;",
												content: "Straight",
												onclick: "loopIt"
											},

											{
												name: "button5",
												kind: "enyo.Button",
												style: "font-size: 27px; width:128px;",
												content: "Straight",
												onclick: "loopIt"
											}
									]
									},
									{
										classes: "highlight"
									},
									{
										kind: "FittableColumns",
										style: "height:300px;",
										components: [
											{
												name: "num1",
												kind: "enyo.RichText",
												classes: "tapereaderimage samplebox",
												source: "images/tapereader.png",
												oninput: "handleChange",
												onchange: "handleChange"
											},
											{
												name: "num2",
												kind: "enyo.RichText",
												classes: "tapereaderimage samplebox",
												source: "images/tapereader.png",
												oninput: "handleChange",
												onchange: "handleChange"
											},
											{
												name: "num3",
												kind: "enyo.RichText",
												classes: "tapereaderimage samplebox",
												source: "images/tapereader.png",
												oninput: "handleChange",
												onchange: "handleChange"
											},
											{
												name: "num4",
												kind: "enyo.RichText",
												classes: "tapereaderimage samplebox",
												source: "images/tapereader.png",
												oninput: "handleChange",
												onchange: "handleChange"
											},
											{
												name: "num5",
												kind: "enyo.RichText",
												classes: "tapereaderimage samplebox",
												source: "images/tapereader.png",
												oninput: "handleChange",
												onchange: "handleChange"
											}

                                    ]
                                },
									{
										style: "height:8px;"
									},
									{
										kind: "FittableColumns",
										components: [
											{
												name: "start",
												classes: "fontsize mouseover",
												fit: true,
												style: "height:50px; width:128px",
												onclick: "execCommands",
												content: "Start"
											},
											{
												name: "stop",
												classes: "fontsize mouseover",
												fit: true,
												style: "height:50px; width:128px",
												onclick: "stop",
												content: "Stop"
											}

                                    ]
                                }
                            ]
                        },
						{
						name: "panel2",
						style: "height: 572px;",
						components: [
							{
								kind: "moon.Header",
								title: "Printer",
								fit: true,
								classes: "headers"
							},
							{
								kind: "moon.Scroller",
								fit: true,
								horizontal: "hidden",
								classes: "enyo-fill",
								spotlight: false,
								components: [
								{
									classes: "printer textarea",
									name: "printer",
									style: "font-size: 15px; white-space: pre; border: 3px solid #cccccc; padding: 5px; background: #FFFFFF; background-position: bottom right; background-repeat: no-repeat;"
                                }
                            ]
                        }
						
                    
					]
                }
									
                            
							]
                        },
					{
						content: "STORES",
						style: "padding-left: 460px; font-family: 'Moonstone Miso'; font-size: 37.5px;"
					},
					{
						content: "ACCUMULATOR",
						style: "padding-left: 1076px; font-family: 'Moonstone Miso'; font-size: 37.5px;"
				},
					{
						kind: "FittableColumns",
						components: [
							{
								classes: "space"
					},
							{
								classes: "acc",
								components: [
									{
										name: "09",
										content: " ",
										classes: "dek"
									}
					]
							}
				]
					},
					{

						kind: "FittableColumns",
						style: "height:250px; width:100%;",
						components: [
							{
								name: "column2",
								kind: "FittableRows",
								components: [
									{
										classes: "tblcell"
									},
									{
										content: "90",
										classes: "tblcell"
									},
									{
										content: "80",
										classes: "tblcell"
									},
									{
										content: "70",
										classes: "tblcell"
									},
									{
										content: "60",
										classes: "tblcell"
									},
									{
										content: "50",
										classes: "tblcell"
									},
									{
										content: "40",
										classes: "tblcell"
									},
									{
										content: "30",
										classes: "tblcell"
									},
									{
										content: "20",
										classes: "tblcell"
									},
									{
										content: "10",
										classes: "tblcell"
									}

                            ]
                        },
							{
								name: "column2",
								kind: "FittableRows",
								components: [
									{
										content: "0",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "90",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "80",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "70",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "60",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "50",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "40",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "30",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "20",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "10",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]

                        },
					]
                },
					{
						kind: "moon.Item",
						content: "Copyright Justin King, 2014 under the GPLv2 License",
						classes: "center",
						style: "font-size: 10px;",
						spotlight: false
                }
            ]
        }
    ],
		loopIt: function (inSender, inEvent) {
			straight[parseInt(inSender.name.slice(6)) - 1] = !straight[parseInt(inSender.name.slice(6)) - 1];
			if (straight[parseInt(inSender.name.slice(6)) - 1])
				inSender.set("content", "Straight");
			if (!straight[parseInt(inSender.name.slice(6)) - 1])
				inSender.set("content", "Looped");
			looped[parseInt(inSender.name.slice(6))] = inSender.getDisabled();
			console.log(inSender.name + "  is changed");
		},
		create: function () {
			this.inherited(arguments);


			stores[parseInt("00" + 0)] = "0";
			stores[parseInt("00" + 1)] = "0";
			stores[parseInt("00" + 2)] = "0";
			stores[parseInt("00" + 3)] = "0";
			stores[parseInt("00" + 4)] = "0";
			stores[parseInt("00" + 5)] = "0";
			stores[parseInt("00" + 6)] = "0";
			stores[parseInt("00" + 7)] = "0";
			stores[parseInt("00" + 8)] = "0";
			stores[parseInt("00" + 9)] = "0";
			stores[parseInt("00" + 10)] = "0";
			stores[parseInt("00" + 11)] = "0";
			stores[parseInt("00" + 12)] = "0";
			stores[parseInt("00" + 13)] = "0";
			stores[parseInt("00" + 14)] = "0";
			stores[parseInt("00" + 15)] = "0";
		},
		handleChange: function (inSender, inEvent) {
			if (inSender.name == "num1") {
				curCommands = inSender.get("value").replace(/(<[^>]*>)+/ig, "test").replace(/test(\+|-)/ig, "$1").replace(/test\[[0-9]\]/ig, "").split("test");
				for (i = 0; i < curCommands.length; i++) {
					//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
					if (curCommands[i] == "") {
						curCommands.splice(i, 1);
					}
				}
			}
			enyo.log(curCommands);
			tpr[parseInt(inSender.name.substring(3)) - 1] = inSender.get("value");
			console.log(tpr + " : " + curCommands);
		},
		execCommands: function () {
			
			prevText = this.$.log.get("value");
			if (curCommands[0].length != 3 && curCommands[0].length != 5 && curCommands[0].length != 14) {
				curTapeReader = "";
				this.$.log.set("value", prevText + "Error: This Command/Block Marker must be 3 or 5 or 9 characters long with a plus/minus included, ex. [1], [2], 21000 or 10110\n+12345678");
			} else {
				curTapeReader = "";
				if(!runForTheFirstTime) {
					done = true;
					blkNum = "1";
					stbCurTpr = "1";
					this.searchForBlkMarker();
				}
				done = false;
				this.evaluate();
			}
			return false;
		},
		evaluate: function () {
			this.$.num1.setDisabled(true);
			this.$.num2.setDisabled(true);
			this.$.num3.setDisabled(true);
			this.$.num4.setDisabled(true);
			this.$.num5.setDisabled(true);
			this.$.button1.setDisabled(true);
			this.$.button2.setDisabled(true);
			this.$.button3.setDisabled(true);
			this.$.button4.setDisabled(true);
			this.$.button5.setDisabled(true);
			
			curCommands = this.$["num" + (curTpr + 1)].get("value").replace(/(<[^>]*>)+/ig, "test").replace(/test(\+|-)/ig, "$1").replace(/test\[[0-9]\]/ig, "").split("test");
			for (i = 0; i < curCommands.length; i++) {
				//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
				if (curCommands[i] == "") {
					curCommands.splice(i, 1);
				}
			}
			
			
			
			
			if (curCommands[0] != "") {
				var overflow = 0;
				var prevText = this.$.log.get("value");
				console.log(typeof(curCommands));
				if (curCommands != [] && curCommands[0][0] != "[" && isNaN(parseInt(curCommands[0]))) {
					this.$.log.set("value", prevText + "\n" + curCommands[0] + "\nError: Command(s) need to include only numbers and maybe plus signs and dashes");
				} else if (curCommands != []) {
					this.$.log.set("value", prevText + "\n" + curCommands[0]);
				}
				var prevText = this.$.log.get("value");
				ranAlready = true;
				var commandStr = curCommands[0];
				switch (commandStr[0]) {
				case "0":
					switch (commandStr[1]) {
					case "0":
						if(commandStr == "00100") {
							var curTprStr = this.$["num" + (curTpr + 1)].get("value").split(/(<[^>]+>)+/ig);
							for (g = 0; g < curTprStr.length; g++) {
								if (curTprStr.indexOf("") != -1) {
									curTprStr.splice(curTprStr.indexOf(""), 1);
								}
								if (curTprStr.indexOf("<br>") != -1) {
									curTprStr.splice(curTprStr.indexOf("<br>"), 1);
								}
							}
							console.log(curTprStr);
							if (straight[curTpr])
								curTprStr.shift();
							else
								curTprStr.push(curTprStr.shift());
							this.$["num" + (curTpr + 1)].set("value", curTprStr.join("<br>"));
							this.stop();
						}
					break;
					case "1":
						if(commandStr[2] == "1") {
							if(commandStr.slice(3, 5) == "08" || commandStr.slice(3, 5) == "09") {
								storedValue = this.$["090"].get("content") == "0";
							} else if(parseInt(commandStr.slice(3, 5)) >= 10 && parseInt(commandStr.slice(3, 5)) <= 99) {
								storedValue = this.$[commandStr.slice(3, 5) + "0"].get("content") == "0";
							}
						} else if(commandStr[2] == "2") {
							if(commandStr.slice(3, 5) == "08" || commandStr.slice(3, 5) == "09") {
								storedValue = this.$["090"].get("content") == "9";
							} else if(parseInt(commandStr.slice(3, 5)) >= 10 && parseInt(commandStr.slice(3, 5)) <= 99) {
								storedValue = this.$[commandStr.slice(3, 5) + "0"].get("content") == "9";
							}
						}
						console.log(storedValue);
					break;
					case "2":
						if (commandStr[2] == "1") {
							curTpr = parseInt(commandStr.slice(3,5))-1;
							this.sv6();
						} else if (commandStr[2] == "2" && storedValue) {
							curTpr = parseInt(commandStr.slice(3,5))-1;
							this.sv6();
						} else if (commandStr[2] == "2" && !storedValue) {
							var prevText = this.$.log.get("value");
							this.$.log.set("value", prevText + "\nError: The stored value is either NO or UNDEFINED.");
						}
					break;
					case "3":
						blkNum = commandStr.slice(2, 3);
						stbCurTpr = commandStr.slice(4);
						done = true;
						this.searchForBlkMarker();
					break;
					case "5": 
						if (storedValue) {
							blkNum = commandStr.slice(2, 3);
							stbCurTpr = commandStr.slice(4);
							done = true;
							this.searchForBlkMarker();
						} else {
							var prevText = this.$.log.get("value");
							this.$.log.set("value", prevText + "\nError: The stored value is either NO or UNDEFINED.");
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
					if (commandStr.slice(2, 3) == (curTpr + 1).toString()) {
						if(commandStr.slice(1,3) == "0"+(curTpr+1).toString()) {
							console.log("Adding to stores...");
							var finStr;
							console.log(commandStr.slice(5,14));
								if (commandStr.slice(5, 6) == "+") {
									var s1 = "0" + commandStr.slice(6);
								} else {
									var s1 = "9" + (99999999 - parseInt(commandStr.slice(6)));
								}
								finStr = s1;
								console.log(finStr);
								stores[parseInt(commandStr.slice(3, 5))] = finStr;
						} else if ((parseInt(commandStr.slice(3, 5)) - 10) / 9 < 0 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
							// sanity check for valid store addresses //
							this.$.log.set("value", prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"08-99\"");
						} else if (parseInt(commandStr.slice(3, 5)) == 8) {
							// accumulator store 08 //
							console.log("08ing");
						} else if (parseInt(commandStr.slice(3, 5)) == 9) {
							// accumulator store 09//
							console.log("09ing");
						} else if(this.$[commandStr.slice(3, 5)] == " " || !between(parseInt(commandStr.slice(3, 5)), 8, 99)) {
							this.$.log.set("value", prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
					} else if(parseInt(commandStr.slice(3, 5)) == 1 || parseInt(commandStr.slice(3, 5)) == 3) {
							console.log("Printing.....");
							prevText = this.$.printer.get("content");
							prevText += outcomeToBePrinted;
							prevText = prevText.replace(/lb/g, "\n");
							if(this.$[commandStr.slice(3, 5) + "0"] == "0")
								prevText = prevText.replace(/sign/g, "+");
							else
								prevText = prevText.replace(/sign/g, "-");
							if(outcomeToBePrinted != "lblblblblb") {
								if(commandStr.slice(1,3) == "08")  {
									prevText = prevText.replace(/8d/g, this.$["099"].get("content") + this.$["0910"].get("content") + this.$["0911"].get("content") + this.$["0912"].get("content") + this.$["0913"].get("content") + this.$["0914"].get("content") + this.$["0915"].get("content") + " ");
									prevText = prevText.replace(/6d/g, this.$["099"].get("content") + this.$["0910"].get("content") + this.$["0911"].get("content") + this.$["0912"].get("content") + this.$["0913"].get("content") + this.$["0914"].get("content"));
								} else {
									prevText = prevText.replace(/8d/g, this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content") + this.$[commandStr.slice(1, 3) + "7"].get("content") + this.$[commandStr.slice(1, 3) + "8"].get("content"));
									prevText = prevText.replace(/6d/g, this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content"));
								}
							}
							prevText = prevText.replace(/5c/g, "  ");
							prevText = prevText.replace(/6c/g, "   ");
							this.$.printer.set("content", prevText);
					} else if (this.$[commandStr.slice(1, 3)] && this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && this.$[commandStr.slice(1, 3)].get("content") != " ") {
							var s1 = parseInt(this.$[commandStr.slice(3, 5)].get("content"));
							var s2 = parseInt(this.$[commandStr.slice(1, 3)].get("content"));
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
						console.log(finStr);
						console.log("Adding stores together!");
						stores[parseInt(commandStr.slice(3, 5))] = finStr;
						if (commandStr[0] == 2 )
						stores[parseInt(commandStr.slice(1, 3))] = "000000000";

					}
					if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {
						console.log("first if statement!");
						sss = true;
						cmdString2 = commandStr.slice(1, 3);
						this.updateSecStores();
					} else if (this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && commandStr.slice(2, 3) == curTpr + 1 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
						console.log("Updating");
						ss = true;
						cmdString = commandStr.slice(3, 5);
						this.updateStores();
					} else if (commandStr.slice(1, 5).indexOf(curTpr + "09") != -1) {
						this.updateQudStores();
					} else if (commandStr.slice(1, 5).indexOf(curTpr + "08") !=-1) {
						this.updateQudStores();
					} else if (this.$[commandStr.slice(1, 3)] && this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && this.$[commandStr.slice(1, 3)].get("content") != " ") {
						console.log("Updating 2");
						ss = true;
						cmdString = commandStr.slice(3, 5);
						this.updateStores();
					}
					console.log(stores);
				break;
				case "3":
				case "4":
					if (commandStr.slice(2, 3) == (curTpr + 1).toString()) {
						if(commandStr.slice(1,3) == "0"+(curTpr+1).toString()) {
							console.log("Adding to stores...");
							var finStr;
							console.log(commandStr.slice(5,14));
								if (commandStr.slice(5, 6) == "+") {
									var s1 = "0" + commandStr.slice(6);
								} else {
									var s1 = "9" + (99999999 - parseInt(commandStr.slice(6)));
								}
								finStr = s1;
								console.log(finStr);
								stores[parseInt(commandStr.slice(3, 5))] = finStr;
						} else if ((parseInt(commandStr.slice(3, 5)) - 10) / 9 < 0 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
							// sanity check for valid store addresses //
							this.$.log.set("value", prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"08-99\"");
						} else if (parseInt(commandStr.slice(3, 5)) == 8) {
							// accumulator store 08 //
							console.log("08ing");
						} else if (parseInt(commandStr.slice(3, 5)) == 9) {
							// accumulator store 09//
							console.log("09ing");
						} else if(this.$[commandStr.slice(3, 5)] == " " || !between(parseInt(commandStr.slice(3, 5)), 8, 99)) {
							this.$.log.set("value", prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
					} else if(parseInt(commandStr.slice(3, 5)) == 1 || parseInt(commandStr.slice(3, 5)) == 3) {
							console.log("Printing.....");
							prevText = this.$.printer.get("content");
							prevText += outcomeToBePrinted;
							prevText = prevText.replace(/lb/g, "\n");
							if(this.$[commandStr.slice(3, 5) + "0"] == "0")
								prevText = prevText.replace(/sign/g, "+");
							else
								prevText = prevText.replace(/sign/g, "-");
							if(outcomeToBePrinted != "lblblblblb") {
								if(commandStr.slice(1,3) == "08")  {
									prevText = prevText.replace(/8d/g, this.$["099"].get("content") + this.$["0910"].get("content") + this.$["0911"].get("content") + this.$["0912"].get("content") + this.$["0913"].get("content") + this.$["0914"].get("content") + this.$["0915"].get("content") + " ");
									prevText = prevText.replace(/6d/g, this.$["099"].get("content") + this.$["0910"].get("content") + this.$["0911"].get("content") + this.$["0912"].get("content") + this.$["0913"].get("content") + this.$["0914"].get("content"));
								} else {
									prevText = prevText.replace(/8d/g, this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content") + this.$[commandStr.slice(1, 3) + "7"].get("content") + this.$[commandStr.slice(1, 3) + "8"].get("content"));
									prevText = prevText.replace(/6d/g, this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content"));
								}
							}
							prevText = prevText.replace(/5c/g, "  ");
							prevText = prevText.replace(/6c/g, "   ");
							this.$.printer.set("content", prevText);
					} else if (this.$[commandStr.slice(1, 3)] && this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && this.$[commandStr.slice(1, 3)].get("content") != " ") {
							var s1 = parseInt(this.$[commandStr.slice(3, 5)].get("content"));
							var s2 = parseInt(this.$[commandStr.slice(1, 3)].get("content"));
							var s3 = s1-s2;
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
						if (commandStr[0] == 2 )
						stores[parseInt(commandStr.slice(1, 3))] = "000000000";

					}
					if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {
						console.log("first if statement!");
						sss = true;
						cmdString2 = commandStr.slice(1, 3);
						this.updateSecStores();
					} else if (this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && commandStr.slice(2, 3) == curTpr + 1 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
						console.log("Updating");
						ss = true;
						cmdString = commandStr.slice(3, 5);
						this.updateStores();
					} else if (commandStr.slice(1, 5).indexOf(curTpr + "09") != -1) {
						this.updateQudStores();
					} else if (commandStr.slice(1, 5).indexOf(curTpr + "08") !=-1) {
						this.updateQudStores();
					} else if (this.$[commandStr.slice(1, 3)] && this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && this.$[commandStr.slice(1, 3)].get("content") != " ") {
						console.log("Updating 2");
						ss = true;
						cmdString = commandStr.slice(3, 5);
						this.updateStores();
					}
					console.log(stores);
				break;
					case "5":
						console.log(this.$[commandStr.slice(1, 3) + "0"].get("content"));
						if (this.$[commandStr.slice(1, 3) + "0"].get("content") != " " && this.$[commandStr.slice(3, 5) + "0"].get("content") != " ") {
							if (this.$[commandStr.slice(3, 5) + "0"].get("content") == "0")
								var s1 = parseInt("+" + this.$[commandStr.slice(3, 5) + "1"].get("content") + this.$[commandStr.slice(3, 5) + "2"].get("content") + this.$[commandStr.slice(3, 5) + "3"].get("content") + this.$[commandStr.slice(3, 5) + "4"].get("content") + this.$[commandStr.slice(3, 5) + "5"].get("content") + this.$[commandStr.slice(3, 5) + "6"].get("content") + this.$[commandStr.slice(3, 5) + "7"].get("content") + this.$[commandStr.slice(3, 5) + "8"].get("content"));
							else
								var s1 = parseInt("-" + this.$[commandStr.slice(3, 5) + "1"].get("content") + this.$[commandStr.slice(3, 5) + "2"].get("content") + this.$[commandStr.slice(3, 5) + "3"].get("content") + this.$[commandStr.slice(3, 5) + "4"].get("content") + this.$[commandStr.slice(3, 5) + "5"].get("content") + this.$[commandStr.slice(3, 5) + "6"].get("content") + this.$[commandStr.slice(3, 5) + "7"].get("content") + this.$[commandStr.slice(3, 5) + "8"].get("content"));
							if (this.$[commandStr.slice(1, 3) + "0"].get("content") == "0")
								var s2 = parseInt("+" + this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content") + this.$[commandStr.slice(1, 3) + "7"].get("content") + this.$[commandStr.slice(1, 3) + "8"].get("content"));
							else
								var s2 = parseInt("-" + this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content") + this.$[commandStr.slice(1, 3) + "7"].get("content") + this.$[commandStr.slice(1, 3) + "8"].get("content"));
							finStr = (s2 * s1).toString();
							if(finStr[0] != "-") {
								finStr = finStr + "0";
							} else {
								finStr = finStr.replace(/-/ig, "9");
							}
							console.log(finStr);
							if (finStr.length > 16) {
								prevText = this.$.log.get("value");
								this.$.log.set("value", prevText + "\nThe accumulator has been overfilled!");
								finStr = finStr.slice(0, 1) + finStr.slice(2);
							}
							if (finStr[0] == "9") {
								while (finStr.length < 9) {
									finStr = "90" + finStr.slice(1);
									console.log(finStr);
								}
							} else {
								while (finStr.length < 9) {
									finStr = "00" + finStr.slice(1);
								}
							}

							stores[parseInt("00" + 0)] = (parseInt(finStr[0]) + parseInt("00")).toString();
							stores[parseInt("00" + 1)] = (parseInt(finStr[1]) + parseInt("00")).toString();
							stores[parseInt("00" + 2)] = (parseInt(finStr[2]) + parseInt("00")).toString();
							stores[parseInt("00" + 3)] = (parseInt(finStr[3]) + parseInt("00")).toString();
							stores[parseInt("00" + 4)] = (parseInt(finStr[4]) + parseInt("00")).toString();
							stores[parseInt("00" + 5)] = (parseInt(finStr[5]) + parseInt("00")).toString();
							stores[parseInt("00" + 6)] = (parseInt(finStr[6]) + parseInt("00")).toString();
							stores[parseInt("00" + 7)] = (parseInt(finStr[7]) + parseInt("00")).toString();
							stores[parseInt("00" + 8)] = (parseInt(finStr[8]) + parseInt("00")).toString();
							stores[parseInt("00" + 9)] = (parseInt(finStr[9]) + parseInt("00")).toString();
							stores[parseInt("00" + 10)] = (parseInt(finStr[10]) + parseInt("00")).toString();
							stores[parseInt("00" + 11)] = (parseInt(finStr[11]) + parseInt("00")).toString();
							stores[parseInt("00" + 12)] = (parseInt(finStr[12]) + parseInt("00")).toString();
							stores[parseInt("00" + 13)] = (parseInt(finStr[13]) + parseInt("00")).toString();
							stores[parseInt("00" + 14)] = (parseInt(finStr[14]) + parseInt("00")).toString();
							stores[parseInt("00" + 15)] = (parseInt(finStr[15]) + parseInt("00")).toString();
						} else {
							this.$.log.set("value", prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
						if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {

						} else if (this.$[commandStr.slice(3, 5) + "0"].get("content") != " " && commandStr.slice(3, 5) != "00") {
							cmdString = commandStr.slice(1, 3);
							this.updateQudStores();
							sss = true;
							cmdString2 = commandStr.slice(3, 5);
							this.updateSecStores();
						}
						console.log(stores);
						break;
					case "6":
						console.log(this.$[commandStr.slice(1, 3) + "0"].get("content"));
						if (this.$[commandStr.slice(1, 3) + "0"].get("content") != " " && this.$[commandStr.slice(3, 5) + "0"].get("content") != " ") {
							if (this.$["090"].get("content") == "0")
								var s1 = parseInt(this.$["091"].get("content") + this.$["092"].get("content") + this.$["093"].get("content") + this.$["094"].get("content") + this.$["095"].get("content") + this.$["096"].get("content") + this.$["097"].get("content") + this.$["098"].get("content") + this.$["099"].get("content") + this.$["0910"].get("content") + this.$["0911"].get("content") + this.$["0912"].get("content") + this.$["0913"].get("content") + this.$["0914"].get("content") + this.$["0915"].get("content"));
							else
								var s1 = parseInt(this.$["091"].get("content") + this.$["092"].get("content") + this.$["093"].get("content") + this.$["094"].get("content") + this.$["095"].get("content") + this.$["096"].get("content") + this.$["097"].get("content") + this.$["098"].get("content") + this.$["099"].get("content") + this.$["0910"].get("content") + this.$["0911"].get("content") + this.$["0912"].get("content") + this.$["0913"].get("content") + this.$["0914"].get("content") + this.$["0915"].get("content"));
							if (this.$[commandStr.slice(1, 3) + "0"].get("content") == "0")
								var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content") + this.$[commandStr.slice(1, 3) + "7"].get("content") + this.$[commandStr.slice(1, 3) + "8"].get("content"));
							else
								var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].get("content") + this.$[commandStr.slice(1, 3) + "2"].get("content") + this.$[commandStr.slice(1, 3) + "3"].get("content") + this.$[commandStr.slice(1, 3) + "4"].get("content") + this.$[commandStr.slice(1, 3) + "5"].get("content") + this.$[commandStr.slice(1, 3) + "6"].get("content") + this.$[commandStr.slice(1, 3) + "7"].get("content") + this.$[commandStr.slice(1, 3) + "8"].get("content"));
							var finStr3 = Math.floor(s1 / s2).toString();
							if(finStr3[0] != "-") {
								finStr3 = finStr3 + "0";
							} else {
								finStr3 = finStr3.replace(/-/ig, "9");
							}
							console.log(finStr3);
							if (finStr3[0] == "9") {
								while (finStr3.length < 9) {
									finStr3 = "90" + finStr.slice(1);
									console.log(finStr3);
								}
							} else {
								while (finStr3.length < 9) {
									finStr3 = "00" + finStr3.slice(1);
								}
							}

							stores[parseInt(commandStr.slice(3, 5) + 0)] = finStr3[0];
							stores[parseInt(commandStr.slice(3, 5) + 1)] = finStr3[1];
							stores[parseInt(commandStr.slice(3, 5) + 2)] = finStr3[2];
							stores[parseInt(commandStr.slice(3, 5) + 3)] = finStr3[3];
							stores[parseInt(commandStr.slice(3, 5) + 4)] = finStr3[4];
							stores[parseInt(commandStr.slice(3, 5) + 5)] = finStr3[5];
							stores[parseInt(commandStr.slice(3, 5) + 6)] = finStr3[6];
							stores[parseInt(commandStr.slice(3, 5) + 7)] = finStr3[7];
							stores[parseInt(commandStr.slice(3, 5) + 8)] = finStr3[8];
						} else {
							3
							this.$.log.set("value", prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
						ss = true;
						cmdString = commandStr.slice(3, 5);
						this.updateStores();
						finStr = (s1 % s2).toString();
						console.log(finStr + " is the initial string");
						if (parseInt(finStr) < 0) {
							while (finStr.length < 16) {
								finStr = "90" + finStr.slice(1);
								console.log(finStr);
							}
							for (var d = 0; d < 16; d++) {
								finStr[d] = (9 - parseInt(finStr[d])).toString();
							}
						} else {
							finStr = "0" + finStr;
							while (finStr.length < 16) {
								finStr = "00" + finStr.slice(1);
							}
						}

						stores[parseInt("00" + 0)] = finStr[0];
						stores[parseInt("00" + 1)] = finStr[1];
						stores[parseInt("00" + 2)] = finStr[2];
						stores[parseInt("00" + 3)] = finStr[3];
						stores[parseInt("00" + 4)] = finStr[4];
						stores[parseInt("00" + 5)] = finStr[5];
						stores[parseInt("00" + 6)] = finStr[6];
						stores[parseInt("00" + 7)] = finStr[7];
						stores[parseInt("00" + 8)] = finStr[8];
						stores[parseInt("00" + 9)] = finStr[9];
						stores[parseInt("00" + 10)] = finStr[10];
						stores[parseInt("00" + 11)] = finStr[11];
						stores[parseInt("00" + 12)] = finStr[12];
						stores[parseInt("00" + 13)] = finStr[13];
						stores[parseInt("00" + 14)] = finStr[14];
						stores[parseInt("00" + 15)] = finStr[15];
						this.updateQudStores();
						console.log(stores);
						break;
					}
					
					if (!done)
						enyo.job("j1", enyo.bind(this, "switchback"), 1506);
					if(this.$["num" + (curTpr + 1)].get("value").indexOf(/<[^>]+>/ig) != -1 || this.$["num" + (curTpr + 1)].get("value") == "")
						this.stop();
				}
			},
			switchback: function () {
				var curTprStr = this.$["num" + (curTpr + 1)].get("value").split(/(<[^>]+>)+/ig);
				for (g = 0; g < curTprStr.length; g++) {
					if (curTprStr.indexOf("") != -1) {
						curTprStr.splice(curTprStr.indexOf(""), 1);
					}
					if (curTprStr.indexOf("<br>") != -1) {
						curTprStr.splice(curTprStr.indexOf("<br>"), 1);
					}
				}
				console.log(curTprStr);
				if (straight[curTpr])
					curTprStr.shift();
				else
					curTprStr.push(curTprStr.shift());
				this.$["num" + (curTpr + 1)].set("value", curTprStr.join("<br>"));
				if (curTprStr != "")
					this.evaluate();
				else
					this.stop();
			},
			updateStores: function () {
				console.log("updateStores!");
				console.log(cmdString + "-" + s);
				this.$[cmdString].set("content", stores[parseInt(cmdString)]);
				console.log(s);
				console.log(stores);
//				this.switchbackv2();
				s = 0;
				ss = false;
			},
			updateSecStores: function () {
				console.log("updateSecStores!");
					console.log(cmdString2 + "-" + s);
					this.$[cmdString2].set("content", "000000000");
					stores[parseInt(cmdString2)] = "000000000";
					console.log(stores);
					s = 0;
					sss = false;
					cmdString2 = "";
			},
			updateTriStores: function () {
				if (t < 16) {
					this.$["09" + t].set("content", "000000000000000"[t]);
					if (!done)
						this.sv3();
				} else {
					t = 0;
				}
			},
			updateQudStores: function () {
				if (t < 16) {
					this.$["09" + t].set("content", stores[parseInt("00" + t)]);
					console.log(t + " is the current qud num");
					if (!done)
						this.sv4();
				} else {
					t = 0;
				}
			},
			sv3: function () {
				t++;
				enyo.job("j4", enyo.bind(this, "updateTriStores"), 92);
			},
			sv4: function () {
				t++;
				enyo.job("j5", enyo.bind(this, "updateQudStores"), 92);
			},
			switchbackv2: function () {
				s++;
				if (ss) {
					enyo.job("j2", enyo.bind(this, "updateStores"), 165);
				}
				if (sss) {
					enyo.job("j3", enyo.bind(this, "updateSecStores"), 165);
				}
			},
			stop: function () {
				done = true;
				this.$.num1.setDisabled(false);
				this.$.num2.setDisabled(false);
				this.$.num3.setDisabled(false);
				this.$.num4.setDisabled(false);
				this.$.num5.setDisabled(false);
				this.$.button1.setDisabled(false);
				this.$.button2.setDisabled(false);
				this.$.button3.setDisabled(false);
				this.$.button4.setDisabled(false);
				this.$.button5.setDisabled(false);
			},
			sv6: function() {
				this.evaluate();
			},
			searchForBlkMarker: function () {
				if(done) {
					if (this.$["num" + stbCurTpr].get("value") != "" && done) {
						
						var curTprStr = this.$["num" + stbCurTpr].get("value").split(/(<[^>]+>)+/ig);
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
							if (curTprStr.indexOf("<br>") != -1) {
								curTprStr.splice(curTprStr.indexOf("<br>"), 1);
							}
						}
						console.log(curTprStr);
						if (straight[parseInt(stbCurTpr) - 1])
							curTprStr.shift();
						else
							curTprStr.push(curTprStr.shift());
						this.$["num" + (stbCurTpr)].set("value", curTprStr.join("<br>"));
					}
					if (!foundBlkMarker && this.$["num" + stbCurTpr].get("value") == "") {
						var prevText = this.$.log.get("value");
						if(runForTheFirstTime) {
							this.$.log.set("value", prevText + "\nBlock marker not found");
						} else {
							this.$.log.set("value", prevText + "\nBlock marker 1 not found on first tape reader");
							this.stop();
						}
							
						done = false;
						if(stbCurTpr != curTpr) {
							var curTprStr = this.$["num" + (curTpr+1)].get("value").split(/(<[^>]+>)+/ig);
							for (g = 0; g < curTprStr.length; g++) {
								if (curTprStr.indexOf("") != -1) {
									curTprStr.splice(curTprStr.indexOf(""), 1);
								}
								if (curTprStr.indexOf("<br>") != -1) {
									curTprStr.splice(curTprStr.indexOf("<br>"), 1);
								}
							}
							console.log(curTprStr);
							if (straight[parseInt(curTpr) - 1])
								curTprStr.shift();
							else
								curTprStr.push(curTprStr.shift());
							this.$["num" + (curTpr+1)].set("value", curTprStr.join("<br>"));
						}
						done = false;
						
						this.switchback();
					} else if (foundBlkMarker && this.$["num" + stbCurTpr].get("value") != "") {
						var curTprStr = this.$["num" + (curTpr+1)].get("value").split(/(<[^>]+>)+/ig);
						for (g = 0; g < curTprStr.length; g++) {
							if (curTprStr.indexOf("") != -1) {
								curTprStr.splice(curTprStr.indexOf(""), 1);
							}
							if (curTprStr.indexOf("<br>") != -1) {
								curTprStr.splice(curTprStr.indexOf("<br>"), 1);
							}
						}
						if(stbCurTpr != curTpr + 1) {
							console.log(curTprStr);
							if (straight[parseInt(curTpr) - 1])
								curTprStr.shift();
							else
								curTprStr.push(curTprStr.shift());
							this.$["num" + (curTpr+1)].set("value", curTprStr.join("<br>"));
						}
						done = false;
						runForTheFirstTime = true;
						this.evaluate();
						foundBlkMarker = false;
					} else if (!foundBlkMarker && this.$["num" + stbCurTpr].get("value") != "") {
						ranAlready = true;
						this.sv5();
						console.log("Ugghhhh!");
					}
				}
				console.log(done);
			},
			sv5: function () {
				enyo.job("j5", enyo.bind(this, "searchForBlkMarker"), 712);
			}
});
