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
var tapeValues = ["", "", "", "", ""];
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
												name: "resetTapes",
												classes: "fontsize mouseover",
												fit: true,
												style: "height:50px; width:128px",
												onclick: "resetTapes",
												content: "Reset Tapes"
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
                                    content:"",
									style: "overflow: scroll; font-size: 15px; white-space: pre; border: 3px solid #cccccc; padding: 5px; background: #FFFFFF; background-position: bottom right; background-repeat: no-repeat;"
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
								kind: "FittableRows",
								components: [
									{
										content: "9",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "99",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "89",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "79",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "69",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "59",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "49",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "39",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "29",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "19",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "8",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "98",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "88",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "78",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "68",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "58",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "48",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "38",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "28",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "18",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "7",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "97",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "87",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "77",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "67",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "57",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "47",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "37",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "27",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "17",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "6",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "96",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "86",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "76",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "66",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "56",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "46",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "36",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "26",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "16",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "5",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "95",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "85",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "75",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "65",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "55",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "45",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "35",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "25",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "15",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "4",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "94",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "84",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "74",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "64",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "54",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "44",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "34",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "24",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "14",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
				]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "3",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "93",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "83",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "73",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "63",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "53",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "43",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "33",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "23",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "13",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "2",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "92",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "82",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "72",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "62",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "52",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "42",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "32",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "22",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "12",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
								kind: "FittableRows",
								components: [
									{
										content: "1",
										classes: "tblcell"
									},
									{
										classes: "dekcell",
										components: [
											{
												name: "91",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "81",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "71",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "61",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "51",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "41",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "31",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "21",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "11",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }
							]
                        },{
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


			stores["9"] = "0000000000000000";
		},
		handleChange: function (inSender, inEvent) {
            inSender.set("value", inSender.get("value").replace(/<br><br>/ig, "<br>").replace(/<[^br][^>]*>/ig, ""));
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
            tapeValues = tpr;
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
					this.$.log.set("value", prevText + "\n" + curCommands[0].replace(/(.....)\+......../ig, "$1") + "\nError: Command(s) need to include only numbers and maybe plus signs and dashes");
				} else if (curCommands != []) {
					this.$.log.set("value", prevText + "\n" + curCommands[0].replace(/(.....)\+......../ig, "$1"));
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
								var checkValue = this.$[commandStr.slice(3, 5)].get("content");
								storedValue =  checkValue[0] == "0";
							}
						} else if(commandStr[2] == "2") {
							if(commandStr.slice(3, 5) == "08" || commandStr.slice(3, 5) == "09") {
								storedValue = this.$["090"].get("content") == "9";
							} else if(parseInt(commandStr.slice(3, 5)) >= 10 && parseInt(commandStr.slice(3, 5)) <= 99) {
								var checkValue = this.$[commandStr.slice(3, 5)].get("content");
								storedValue =  checkValue[0] == "9";
							}
						}
                        prevText = this.$.log.get("value");
						console.log(storedValue);
					break;
					case "2":
						if (commandStr[2] == "1") {
                            this.$.log.set("value", prevText + "\nSign: Skip");
							curTpr = parseInt(commandStr.slice(3,5))-1;
							this.sv6();
						} else if (commandStr[2] == "2" && storedValue) {
                            curTpr = parseInt(commandStr.slice(3,5))-1;
							this.sv6();
							var prevText = this.$.log.get("value");
                            this.$.log.set("value", prevText + "\nSign: True");
						} else if (commandStr[2] == "2" && !storedValue) {
							var prevText = this.$.log.get("value");
                            if(storedValue == null)
                                this.$.log.set("value", prevText + "\nSign: Null");
                            else
                                this.$.log.set("value", prevText + "\nSign: False");
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
						} else if (commandStr[2] == "2" && !storedValue) {
							var prevText = this.$.log.get("value");
							this.searchForBlkMarker();
                            this.$.log.set("value", prevText + "\nSign: True");
						} else {
							var prevText = this.$.log.get("value");
                            if(storedValue == null)
                                this.$.log.set("value", prevText + "\nSign: Null");
                            else
                                this.$.log.set("value", prevText + "\nSign: False");
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
							this.$.log.set("value", prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "with \"08-99\"");
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
							if(commandStr.slice(1, 3) != "08" && commandStr.slice(1, 3) != "09") {
								var printText = this.$[commandStr.slice(1, 3)].get("content");
							} else if(commandStr.slice(1, 3) == "08") {
								var printText = this.$[commandStr.slice(1, 3)].get("content")[0] + this.$[commandStr.slice(1, 3)].get("content").slice(8, 15);
							} else if(commandStr.slice(1, 3) == "09") {
								var printText = this.$[commandStr.slice(1, 3)].get("content").slice(0,9);
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
							this.$.printer.set("content", prevText);
					} else if (this.$[commandStr.slice(1, 3)] && this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && this.$[commandStr.slice(1, 3)].get("content") != " ") {
							var s1 = parseInt(this.$[commandStr.slice(3, 5)].get("content"));
							var s2 = parseInt(this.$[commandStr.slice(1, 3)].get("content"));
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
						console.log(finStr);
						console.log("Adding stores together!");
						stores[parseInt(commandStr.slice(3, 5))] = finStr;
						if (commandStr[0] == "2" ) {
							stores[parseInt(commandStr.slice(1, 3))] = "000000000";
							ss = true;
							cmdString = commandStr.slice(1, 3);
							this.updateStores();
						}

					}
					if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {
						console.log("first if statement!");
						sss = true;
						cmdString2 = commandStr.slice(1, 3);
						this.updateSecStores();
					} else if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) == "09") {
						this.updateTriStores();
					} else if (this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && commandStr.slice(2, 3) == curTpr + 1) {
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
							this.$.log.set("value", prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "with \"08-99\"");
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
                            if(commandStr.slice(1, 3) != "08" && commandStr.slice(1, 3) != "09") {
				                var printText = this.$[commandStr.slice(1, 3)].get("content");
                            } else if(commandStr.slice(1, 3) == "08") {
                                var printText = this.$[commandStr.slice(1, 3)].get("content")[0] + this.$[commandStr.slice(1, 3)].get("content").slice(8, 15);
                            } else if(commandStr.slice(1, 3) != "09") {
                                var printText = this.$[commandStr.slice(1, 3)].get("content")[0] + this.$[commandStr.slice(1, 3)].get("content").slice(8, 15);
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
							this.$.printer.set("content", prevText);
					} else if (this.$[commandStr.slice(1, 3)] && this.$[commandStr.slice(3, 5)] && this.$[commandStr.slice(3, 5)].get("content") != " " && this.$[commandStr.slice(1, 3)].get("content") != " ") {
							var s1 = parseInt(this.$[commandStr.slice(3, 5)].get("content"));
							var s2 = (999999999 - parseInt(this.$[commandStr.slice(1, 3)].get("content")));
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
							this.updateStores();
						}

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
						console.log(this.$[commandStr.slice(1, 3)].get("content"));
						if (this.$[commandStr.slice(1, 3)].get("content") != " " && this.$[commandStr.slice(3, 5)].get("content") != " ") {
							var s1 = parseInt(this.$[commandStr.slice(3, 5)].get("content"));
							var s2 = parseInt(this.$[commandStr.slice(1, 3)].get("content"));
							var s3 = (s1 * s2);
//							s3 = Math.round(s3);
//							var carry_out = Math.round((s3/1000000000)-0.5);
							console.log("s1 - " + s1);
							console.log("s2 - " + s2);
							console.log("s3 - " + s3);
//							if (carry_out) {
//								s3 = (s3 - (carry_out * 1000000000))+carry_out;
//							}
							finStr = (s3).toString();
							console.log("finStr - " + finStr);
							while ( finStr.length < 16 )
								finStr = "0" + finStr ;

							console.log(finStr);

							stores[9] = finStr;
						} else {
							this.$.log.set("value", prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
						if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {

						} else if (this.$[commandStr.slice(3, 5)].get("content") != " " && commandStr.slice(3, 5) != "00") {
							cmdString = commandStr.slice(1, 3);
							this.updateQudStores();
							sss = true;
							cmdString2 = commandStr.slice(3, 5);
							this.updateSecStores();
						}
						console.log(stores);
						break;
					case "6":
						console.log(this.$[commandStr.slice(1, 3)].get("content"));
						if (this.$[commandStr.slice(1, 3)].get("content") != " " && this.$[commandStr.slice(3, 5)].get("content") != " ") {
							var s1 = parseInt(stores[9]);
							var s2 = parseInt(this.$[commandStr.slice(1, 3)].get("content"));
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
							this.$.log.set("value", prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
						if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {

						} else if (this.$[commandStr.slice(3, 5)].get("content") != " " && commandStr.slice(3, 5) != "00") {
							console.log("Updating 6");
							ss = true;
							cmdString = commandStr.slice(3, 5);
							this.updateStores();
//							cmdString = commandStr.slice(1, 3);
//							this.updateQudStores();
//							sss = true;
//							cmdString2 = commandStr.slice(3, 5);
//							this.updateSecStores();
						}
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
				this.$["09"].set("content", "000000000000000");
			},
			updateQudStores: function () {
				this.$["09"].set("content", stores[9]);
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
			},
            resetTapes: function() {
                for(var ts = 1; ts <= 5; ts++) {
                    if(tapeValues[ts-1] == undefined)
                        tapeValues[ts-1] = "";
                    this.$["num" + ts].set("value", tapeValues[ts-1]);
                }
                curTpr = 0;
            }
});
