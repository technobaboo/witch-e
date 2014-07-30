/*
 * WITCH-E - the WITCH Emulator
 *
 * Copyright (c) 2014 Justin King
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General
 * Public License along with this site/repo; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place, Suite 330,
 * Boston, MA 02111-1307 USA
 */
var curCommands = [
];
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
var stbCurTpr = 0;
var TimeToWait;
var ranAlready = [false,false,false,false,false];
var stores = [
];
var looped = [false, false, false, false, false];
var done = false;
var tprPositions = [0, 0, 0, 0, 0];
String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}
enyo.kind({
		name: "emulatorMain",
		classes: "moon enyo-unselectable enyo-fit",
		kind: "Control",
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
						/*{name:"panel", classes:"panels-sample-wide max-h", components: [
	{kind: "moon.Scroller", fit:true, classes: "enyo-fill", components: [
		{kind: "moon.Header", title: "Stores", titleBelow:"Where the stuff goes"},
		{tag:"br"},
		{tag:"br"},
		{kind:"moon.Divider", content:"Accumulator"},
		{name:"acc", kind:"moon.Item", content:"Undefined"},
		{kind: "FittableColumns", components: [
		 	{name:"column1", classes:"fiftyp", components: [
				{kind:"moon.Divider", content:"#1"},
				{name:"number1", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#2"},
				{name:"number2", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#3"},
				{name:"number3", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#4"},
				{name:"number4", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#5"},
				{name:"number5", kind:"moon.Item", content:"Undefined"}
			]},
			{name:"column2", classes:"fiftyp", components: [
				{kind:"moon.Divider", content:"#6"},
				{name:"number6", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#7"},
				{name:"number7", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#8"},
				{name:"number8", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#9"},
				{name:"number9", kind:"moon.Item", content:"Undefined"},
				{kind:"moon.Divider", content:"#10"},
				{name:"number10", kind:"moon.Item", content:"Undefined"}
			]}
		]},
		{kind:"moon.Button", style:"text-align:center; width:100%", content:"Run Tape Reader 1", classes:"center", ontap:"execCommands"}
	]}
				]},*/
							{
								name: "panel2",
								style: "height: 572px;",
								components: [
									{
										kind: "moon.Header",
										title: "Log",
										fit: true
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
														value: "WITCH-E v1.0.0",
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
										title: "Tape Readers"
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
										name: "090",
										content: " ",
										classes: "dek"
									},
									{
										name: "091",
										content: " ",
										classes: "dek"
									},
									{
										name: "092",
										content: " ",
										classes: "dek"
									},
									{
										name: "093",
										content: " ",
										classes: "dek"
									},
									{
										name: "094",
										content: " ",
										classes: "dek"
									},
									{
										name: "095",
										content: " ",
										classes: "dek"
									},
									{
										name: "096",
										content: " ",
										classes: "dek"
									},
									{
										name: "097",
										content: " ",
										classes: "dek"
									},
									{
										name: "098",
										content: " ",
										classes: "dek"
									},
									{
										name: "099",
										content: " ",
										classes: "dek"
									},
									{
										name: "0910",
										content: " ",
										classes: "dek"
									},
									{
										name: "0911",
										content: " ",
										classes: "dek"
									},
									{
										name: "0912",
										content: " ",
										classes: "dek"
									},
									{
										name: "0913",
										content: " ",
										classes: "dek"
									},
									{
										name: "0914",
										content: " ",
										classes: "dek"
									},
									{
										name: "0915",
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
								name: "column11",
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
												name: "990",
												content: " ",
												classes: "dek"
											},
											{
												name: "991",
												content: " ",
												classes: "dek"
											},
											{
												name: "992",
												content: " ",
												classes: "dek"
											},
											{
												name: "993",
												content: " ",
												classes: "dek"
											},
											{
												name: "994",
												content: " ",
												classes: "dek"
											},
											{
												name: "995",
												content: " ",
												classes: "dek"
											},
											{
												name: "996",
												content: " ",
												classes: "dek"
											},
											{
												name: "997",
												content: " ",
												classes: "dek"
											},
											{
												name: "998",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "890",
												content: " ",
												classes: "dek"
											},
											{
												name: "891",
												content: " ",
												classes: "dek"
											},
											{
												name: "892",
												content: " ",
												classes: "dek"
											},
											{
												name: "893",
												content: " ",
												classes: "dek"
											},
											{
												name: "894",
												content: " ",
												classes: "dek"
											},
											{
												name: "895",
												content: " ",
												classes: "dek"
											},
											{
												name: "896",
												content: " ",
												classes: "dek"
											},
											{
												name: "897",
												content: " ",
												classes: "dek"
											},
											{
												name: "898",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "790",
												content: " ",
												classes: "dek"
											},
											{
												name: "791",
												content: " ",
												classes: "dek"
											},
											{
												name: "792",
												content: " ",
												classes: "dek"
											},
											{
												name: "793",
												content: " ",
												classes: "dek"
											},
											{
												name: "794",
												content: " ",
												classes: "dek"
											},
											{
												name: "795",
												content: " ",
												classes: "dek"
											},
											{
												name: "796",
												content: " ",
												classes: "dek"
											},
											{
												name: "797",
												content: " ",
												classes: "dek"
											},
											{
												name: "798",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "690",
												content: " ",
												classes: "dek"
											},
											{
												name: "691",
												content: " ",
												classes: "dek"
											},
											{
												name: "692",
												content: " ",
												classes: "dek"
											},
											{
												name: "693",
												content: " ",
												classes: "dek"
											},
											{
												name: "694",
												content: " ",
												classes: "dek"
											},
											{
												name: "695",
												content: " ",
												classes: "dek"
											},
											{
												name: "696",
												content: " ",
												classes: "dek"
											},
											{
												name: "697",
												content: " ",
												classes: "dek"
											},
											{
												name: "698",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "590",
												content: " ",
												classes: "dek"
											},
											{
												name: "591",
												content: " ",
												classes: "dek"
											},
											{
												name: "592",
												content: " ",
												classes: "dek"
											},
											{
												name: "593",
												content: " ",
												classes: "dek"
											},
											{
												name: "594",
												content: " ",
												classes: "dek"
											},
											{
												name: "595",
												content: " ",
												classes: "dek"
											},
											{
												name: "596",
												content: " ",
												classes: "dek"
											},
											{
												name: "597",
												content: " ",
												classes: "dek"
											},
											{
												name: "598",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "490",
												content: " ",
												classes: "dek"
											},
											{
												name: "491",
												content: " ",
												classes: "dek"
											},
											{
												name: "492",
												content: " ",
												classes: "dek"
											},
											{
												name: "493",
												content: " ",
												classes: "dek"
											},
											{
												name: "494",
												content: " ",
												classes: "dek"
											},
											{
												name: "495",
												content: " ",
												classes: "dek"
											},
											{
												name: "496",
												content: " ",
												classes: "dek"
											},
											{
												name: "497",
												content: " ",
												classes: "dek"
											},
											{
												name: "498",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "390",
												content: " ",
												classes: "dek"
											},
											{
												name: "391",
												content: " ",
												classes: "dek"
											},
											{
												name: "392",
												content: " ",
												classes: "dek"
											},
											{
												name: "393",
												content: " ",
												classes: "dek"
											},
											{
												name: "394",
												content: " ",
												classes: "dek"
											},
											{
												name: "395",
												content: " ",
												classes: "dek"
											},
											{
												name: "396",
												content: " ",
												classes: "dek"
											},
											{
												name: "397",
												content: " ",
												classes: "dek"
											},
											{
												name: "398",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "290",
												content: " ",
												classes: "dek"
											},
											{
												name: "291",
												content: " ",
												classes: "dek"
											},
											{
												name: "292",
												content: " ",
												classes: "dek"
											},
											{
												name: "293",
												content: " ",
												classes: "dek"
											},
											{
												name: "294",
												content: " ",
												classes: "dek"
											},
											{
												name: "295",
												content: " ",
												classes: "dek"
											},
											{
												name: "296",
												content: " ",
												classes: "dek"
											},
											{
												name: "297",
												content: " ",
												classes: "dek"
											},
											{
												name: "298",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "190",
												content: " ",
												classes: "dek"
											},
											{
												name: "191",
												content: " ",
												classes: "dek"
											},
											{
												name: "192",
												content: " ",
												classes: "dek"
											},
											{
												name: "193",
												content: " ",
												classes: "dek"
											},
											{
												name: "194",
												content: " ",
												classes: "dek"
											},
											{
												name: "195",
												content: " ",
												classes: "dek"
											},
											{
												name: "196",
												content: " ",
												classes: "dek"
											},
											{
												name: "197",
												content: " ",
												classes: "dek"
											},
											{
												name: "198",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column10",
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
												name: "980",
												content: " ",
												classes: "dek"
											},
											{
												name: "981",
												content: " ",
												classes: "dek"
											},
											{
												name: "982",
												content: " ",
												classes: "dek"
											},
											{
												name: "983",
												content: " ",
												classes: "dek"
											},
											{
												name: "984",
												content: " ",
												classes: "dek"
											},
											{
												name: "985",
												content: " ",
												classes: "dek"
											},
											{
												name: "986",
												content: " ",
												classes: "dek"
											},
											{
												name: "987",
												content: " ",
												classes: "dek"
											},
											{
												name: "988",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "880",
												content: " ",
												classes: "dek"
											},
											{
												name: "881",
												content: " ",
												classes: "dek"
											},
											{
												name: "882",
												content: " ",
												classes: "dek"
											},
											{
												name: "883",
												content: " ",
												classes: "dek"
											},
											{
												name: "884",
												content: " ",
												classes: "dek"
											},
											{
												name: "885",
												content: " ",
												classes: "dek"
											},
											{
												name: "886",
												content: " ",
												classes: "dek"
											},
											{
												name: "887",
												content: " ",
												classes: "dek"
											},
											{
												name: "888",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "780",
												content: " ",
												classes: "dek"
											},
											{
												name: "781",
												content: " ",
												classes: "dek"
											},
											{
												name: "782",
												content: " ",
												classes: "dek"
											},
											{
												name: "783",
												content: " ",
												classes: "dek"
											},
											{
												name: "784",
												content: " ",
												classes: "dek"
											},
											{
												name: "785",
												content: " ",
												classes: "dek"
											},
											{
												name: "786",
												content: " ",
												classes: "dek"
											},
											{
												name: "787",
												content: " ",
												classes: "dek"
											},
											{
												name: "788",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "680",
												content: " ",
												classes: "dek"
											},
											{
												name: "681",
												content: " ",
												classes: "dek"
											},
											{
												name: "682",
												content: " ",
												classes: "dek"
											},
											{
												name: "683",
												content: " ",
												classes: "dek"
											},
											{
												name: "684",
												content: " ",
												classes: "dek"
											},
											{
												name: "685",
												content: " ",
												classes: "dek"
											},
											{
												name: "686",
												content: " ",
												classes: "dek"
											},
											{
												name: "687",
												content: " ",
												classes: "dek"
											},
											{
												name: "688",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "580",
												content: " ",
												classes: "dek"
											},
											{
												name: "581",
												content: " ",
												classes: "dek"
											},
											{
												name: "582",
												content: " ",
												classes: "dek"
											},
											{
												name: "583",
												content: " ",
												classes: "dek"
											},
											{
												name: "584",
												content: " ",
												classes: "dek"
											},
											{
												name: "585",
												content: " ",
												classes: "dek"
											},
											{
												name: "586",
												content: " ",
												classes: "dek"
											},
											{
												name: "587",
												content: " ",
												classes: "dek"
											},
											{
												name: "588",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "480",
												content: " ",
												classes: "dek"
											},
											{
												name: "481",
												content: " ",
												classes: "dek"
											},
											{
												name: "482",
												content: " ",
												classes: "dek"
											},
											{
												name: "483",
												content: " ",
												classes: "dek"
											},
											{
												name: "484",
												content: " ",
												classes: "dek"
											},
											{
												name: "485",
												content: " ",
												classes: "dek"
											},
											{
												name: "486",
												content: " ",
												classes: "dek"
											},
											{
												name: "487",
												content: " ",
												classes: "dek"
											},
											{
												name: "488",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "380",
												content: " ",
												classes: "dek"
											},
											{
												name: "381",
												content: " ",
												classes: "dek"
											},
											{
												name: "382",
												content: " ",
												classes: "dek"
											},
											{
												name: "383",
												content: " ",
												classes: "dek"
											},
											{
												name: "384",
												content: " ",
												classes: "dek"
											},
											{
												name: "385",
												content: " ",
												classes: "dek"
											},
											{
												name: "386",
												content: " ",
												classes: "dek"
											},
											{
												name: "387",
												content: " ",
												classes: "dek"
											},
											{
												name: "388",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "280",
												content: " ",
												classes: "dek"
											},
											{
												name: "281",
												content: " ",
												classes: "dek"
											},
											{
												name: "282",
												content: " ",
												classes: "dek"
											},
											{
												name: "283",
												content: " ",
												classes: "dek"
											},
											{
												name: "284",
												content: " ",
												classes: "dek"
											},
											{
												name: "285",
												content: " ",
												classes: "dek"
											},
											{
												name: "286",
												content: " ",
												classes: "dek"
											},
											{
												name: "287",
												content: " ",
												classes: "dek"
											},
											{
												name: "288",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "180",
												content: " ",
												classes: "dek"
											},
											{
												name: "181",
												content: " ",
												classes: "dek"
											},
											{
												name: "182",
												content: " ",
												classes: "dek"
											},
											{
												name: "183",
												content: " ",
												classes: "dek"
											},
											{
												name: "184",
												content: " ",
												classes: "dek"
											},
											{
												name: "185",
												content: " ",
												classes: "dek"
											},
											{
												name: "186",
												content: " ",
												classes: "dek"
											},
											{
												name: "187",
												content: " ",
												classes: "dek"
											},
											{
												name: "188",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column9",
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
												name: "970",
												content: " ",
												classes: "dek"
											},
											{
												name: "971",
												content: " ",
												classes: "dek"
											},
											{
												name: "972",
												content: " ",
												classes: "dek"
											},
											{
												name: "973",
												content: " ",
												classes: "dek"
											},
											{
												name: "974",
												content: " ",
												classes: "dek"
											},
											{
												name: "975",
												content: " ",
												classes: "dek"
											},
											{
												name: "976",
												content: " ",
												classes: "dek"
											},
											{
												name: "977",
												content: " ",
												classes: "dek"
											},
											{
												name: "978",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "870",
												content: " ",
												classes: "dek"
											},
											{
												name: "871",
												content: " ",
												classes: "dek"
											},
											{
												name: "872",
												content: " ",
												classes: "dek"
											},
											{
												name: "873",
												content: " ",
												classes: "dek"
											},
											{
												name: "874",
												content: " ",
												classes: "dek"
											},
											{
												name: "875",
												content: " ",
												classes: "dek"
											},
											{
												name: "876",
												content: " ",
												classes: "dek"
											},
											{
												name: "877",
												content: " ",
												classes: "dek"
											},
											{
												name: "878",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "770",
												content: " ",
												classes: "dek"
											},
											{
												name: "771",
												content: " ",
												classes: "dek"
											},
											{
												name: "772",
												content: " ",
												classes: "dek"
											},
											{
												name: "773",
												content: " ",
												classes: "dek"
											},
											{
												name: "774",
												content: " ",
												classes: "dek"
											},
											{
												name: "775",
												content: " ",
												classes: "dek"
											},
											{
												name: "776",
												content: " ",
												classes: "dek"
											},
											{
												name: "777",
												content: " ",
												classes: "dek"
											},
											{
												name: "778",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "670",
												content: " ",
												classes: "dek"
											},
											{
												name: "671",
												content: " ",
												classes: "dek"
											},
											{
												name: "672",
												content: " ",
												classes: "dek"
											},
											{
												name: "673",
												content: " ",
												classes: "dek"
											},
											{
												name: "674",
												content: " ",
												classes: "dek"
											},
											{
												name: "675",
												content: " ",
												classes: "dek"
											},
											{
												name: "676",
												content: " ",
												classes: "dek"
											},
											{
												name: "677",
												content: " ",
												classes: "dek"
											},
											{
												name: "678",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "570",
												content: " ",
												classes: "dek"
											},
											{
												name: "571",
												content: " ",
												classes: "dek"
											},
											{
												name: "572",
												content: " ",
												classes: "dek"
											},
											{
												name: "573",
												content: " ",
												classes: "dek"
											},
											{
												name: "574",
												content: " ",
												classes: "dek"
											},
											{
												name: "575",
												content: " ",
												classes: "dek"
											},
											{
												name: "576",
												content: " ",
												classes: "dek"
											},
											{
												name: "577",
												content: " ",
												classes: "dek"
											},
											{
												name: "578",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "470",
												content: " ",
												classes: "dek"
											},
											{
												name: "471",
												content: " ",
												classes: "dek"
											},
											{
												name: "472",
												content: " ",
												classes: "dek"
											},
											{
												name: "473",
												content: " ",
												classes: "dek"
											},
											{
												name: "474",
												content: " ",
												classes: "dek"
											},
											{
												name: "475",
												content: " ",
												classes: "dek"
											},
											{
												name: "476",
												content: " ",
												classes: "dek"
											},
											{
												name: "477",
												content: " ",
												classes: "dek"
											},
											{
												name: "478",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "370",
												content: " ",
												classes: "dek"
											},
											{
												name: "371",
												content: " ",
												classes: "dek"
											},
											{
												name: "372",
												content: " ",
												classes: "dek"
											},
											{
												name: "373",
												content: " ",
												classes: "dek"
											},
											{
												name: "374",
												content: " ",
												classes: "dek"
											},
											{
												name: "375",
												content: " ",
												classes: "dek"
											},
											{
												name: "376",
												content: " ",
												classes: "dek"
											},
											{
												name: "377",
												content: " ",
												classes: "dek"
											},
											{
												name: "378",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "270",
												content: " ",
												classes: "dek"
											},
											{
												name: "271",
												content: " ",
												classes: "dek"
											},
											{
												name: "272",
												content: " ",
												classes: "dek"
											},
											{
												name: "273",
												content: " ",
												classes: "dek"
											},
											{
												name: "274",
												content: " ",
												classes: "dek"
											},
											{
												name: "275",
												content: " ",
												classes: "dek"
											},
											{
												name: "276",
												content: " ",
												classes: "dek"
											},
											{
												name: "277",
												content: " ",
												classes: "dek"
											},
											{
												name: "278",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "170",
												content: " ",
												classes: "dek"
											},
											{
												name: "171",
												content: " ",
												classes: "dek"
											},
											{
												name: "172",
												content: " ",
												classes: "dek"
											},
											{
												name: "173",
												content: " ",
												classes: "dek"
											},
											{
												name: "174",
												content: " ",
												classes: "dek"
											},
											{
												name: "175",
												content: " ",
												classes: "dek"
											},
											{
												name: "176",
												content: " ",
												classes: "dek"
											},
											{
												name: "177",
												content: " ",
												classes: "dek"
											},
											{
												name: "178",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column8",
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
												name: "960",
												content: " ",
												classes: "dek"
											},
											{
												name: "961",
												content: " ",
												classes: "dek"
											},
											{
												name: "962",
												content: " ",
												classes: "dek"
											},
											{
												name: "963",
												content: " ",
												classes: "dek"
											},
											{
												name: "964",
												content: " ",
												classes: "dek"
											},
											{
												name: "965",
												content: " ",
												classes: "dek"
											},
											{
												name: "966",
												content: " ",
												classes: "dek"
											},
											{
												name: "967",
												content: " ",
												classes: "dek"
											},
											{
												name: "968",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "860",
												content: " ",
												classes: "dek"
											},
											{
												name: "861",
												content: " ",
												classes: "dek"
											},
											{
												name: "862",
												content: " ",
												classes: "dek"
											},
											{
												name: "863",
												content: " ",
												classes: "dek"
											},
											{
												name: "864",
												content: " ",
												classes: "dek"
											},
											{
												name: "865",
												content: " ",
												classes: "dek"
											},
											{
												name: "866",
												content: " ",
												classes: "dek"
											},
											{
												name: "867",
												content: " ",
												classes: "dek"
											},
											{
												name: "868",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "760",
												content: " ",
												classes: "dek"
											},
											{
												name: "761",
												content: " ",
												classes: "dek"
											},
											{
												name: "762",
												content: " ",
												classes: "dek"
											},
											{
												name: "763",
												content: " ",
												classes: "dek"
											},
											{
												name: "764",
												content: " ",
												classes: "dek"
											},
											{
												name: "765",
												content: " ",
												classes: "dek"
											},
											{
												name: "766",
												content: " ",
												classes: "dek"
											},
											{
												name: "767",
												content: " ",
												classes: "dek"
											},
											{
												name: "768",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "660",
												content: " ",
												classes: "dek"
											},
											{
												name: "661",
												content: " ",
												classes: "dek"
											},
											{
												name: "662",
												content: " ",
												classes: "dek"
											},
											{
												name: "663",
												content: " ",
												classes: "dek"
											},
											{
												name: "664",
												content: " ",
												classes: "dek"
											},
											{
												name: "665",
												content: " ",
												classes: "dek"
											},
											{
												name: "666",
												content: " ",
												classes: "dek"
											},
											{
												name: "667",
												content: " ",
												classes: "dek"
											},
											{
												name: "668",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "560",
												content: " ",
												classes: "dek"
											},
											{
												name: "561",
												content: " ",
												classes: "dek"
											},
											{
												name: "562",
												content: " ",
												classes: "dek"
											},
											{
												name: "563",
												content: " ",
												classes: "dek"
											},
											{
												name: "564",
												content: " ",
												classes: "dek"
											},
											{
												name: "565",
												content: " ",
												classes: "dek"
											},
											{
												name: "566",
												content: " ",
												classes: "dek"
											},
											{
												name: "567",
												content: " ",
												classes: "dek"
											},
											{
												name: "568",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "460",
												content: " ",
												classes: "dek"
											},
											{
												name: "461",
												content: " ",
												classes: "dek"
											},
											{
												name: "462",
												content: " ",
												classes: "dek"
											},
											{
												name: "463",
												content: " ",
												classes: "dek"
											},
											{
												name: "464",
												content: " ",
												classes: "dek"
											},
											{
												name: "465",
												content: " ",
												classes: "dek"
											},
											{
												name: "466",
												content: " ",
												classes: "dek"
											},
											{
												name: "467",
												content: " ",
												classes: "dek"
											},
											{
												name: "468",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "360",
												content: " ",
												classes: "dek"
											},
											{
												name: "361",
												content: " ",
												classes: "dek"
											},
											{
												name: "362",
												content: " ",
												classes: "dek"
											},
											{
												name: "363",
												content: " ",
												classes: "dek"
											},
											{
												name: "364",
												content: " ",
												classes: "dek"
											},
											{
												name: "365",
												content: " ",
												classes: "dek"
											},
											{
												name: "366",
												content: " ",
												classes: "dek"
											},
											{
												name: "367",
												content: " ",
												classes: "dek"
											},
											{
												name: "368",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "260",
												content: " ",
												classes: "dek"
											},
											{
												name: "261",
												content: " ",
												classes: "dek"
											},
											{
												name: "262",
												content: " ",
												classes: "dek"
											},
											{
												name: "263",
												content: " ",
												classes: "dek"
											},
											{
												name: "264",
												content: " ",
												classes: "dek"
											},
											{
												name: "265",
												content: " ",
												classes: "dek"
											},
											{
												name: "266",
												content: " ",
												classes: "dek"
											},
											{
												name: "267",
												content: " ",
												classes: "dek"
											},
											{
												name: "268",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "160",
												content: " ",
												classes: "dek"
											},
											{
												name: "161",
												content: " ",
												classes: "dek"
											},
											{
												name: "162",
												content: " ",
												classes: "dek"
											},
											{
												name: "163",
												content: " ",
												classes: "dek"
											},
											{
												name: "164",
												content: " ",
												classes: "dek"
											},
											{
												name: "165",
												content: " ",
												classes: "dek"
											},
											{
												name: "166",
												content: " ",
												classes: "dek"
											},
											{
												name: "167",
												content: " ",
												classes: "dek"
											},
											{
												name: "168",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column7",
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
												name: "950",
												content: " ",
												classes: "dek"
											},
											{
												name: "951",
												content: " ",
												classes: "dek"
											},
											{
												name: "952",
												content: " ",
												classes: "dek"
											},
											{
												name: "953",
												content: " ",
												classes: "dek"
											},
											{
												name: "954",
												content: " ",
												classes: "dek"
											},
											{
												name: "955",
												content: " ",
												classes: "dek"
											},
											{
												name: "956",
												content: " ",
												classes: "dek"
											},
											{
												name: "957",
												content: " ",
												classes: "dek"
											},
											{
												name: "958",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "850",
												content: " ",
												classes: "dek"
											},
											{
												name: "851",
												content: " ",
												classes: "dek"
											},
											{
												name: "852",
												content: " ",
												classes: "dek"
											},
											{
												name: "853",
												content: " ",
												classes: "dek"
											},
											{
												name: "854",
												content: " ",
												classes: "dek"
											},
											{
												name: "855",
												content: " ",
												classes: "dek"
											},
											{
												name: "856",
												content: " ",
												classes: "dek"
											},
											{
												name: "857",
												content: " ",
												classes: "dek"
											},
											{
												name: "858",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "750",
												content: " ",
												classes: "dek"
											},
											{
												name: "751",
												content: " ",
												classes: "dek"
											},
											{
												name: "752",
												content: " ",
												classes: "dek"
											},
											{
												name: "753",
												content: " ",
												classes: "dek"
											},
											{
												name: "754",
												content: " ",
												classes: "dek"
											},
											{
												name: "755",
												content: " ",
												classes: "dek"
											},
											{
												name: "756",
												content: " ",
												classes: "dek"
											},
											{
												name: "757",
												content: " ",
												classes: "dek"
											},
											{
												name: "758",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "650",
												content: " ",
												classes: "dek"
											},
											{
												name: "651",
												content: " ",
												classes: "dek"
											},
											{
												name: "652",
												content: " ",
												classes: "dek"
											},
											{
												name: "653",
												content: " ",
												classes: "dek"
											},
											{
												name: "654",
												content: " ",
												classes: "dek"
											},
											{
												name: "655",
												content: " ",
												classes: "dek"
											},
											{
												name: "656",
												content: " ",
												classes: "dek"
											},
											{
												name: "657",
												content: " ",
												classes: "dek"
											},
											{
												name: "658",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "550",
												content: " ",
												classes: "dek"
											},
											{
												name: "551",
												content: " ",
												classes: "dek"
											},
											{
												name: "552",
												content: " ",
												classes: "dek"
											},
											{
												name: "553",
												content: " ",
												classes: "dek"
											},
											{
												name: "554",
												content: " ",
												classes: "dek"
											},
											{
												name: "555",
												content: " ",
												classes: "dek"
											},
											{
												name: "556",
												content: " ",
												classes: "dek"
											},
											{
												name: "557",
												content: " ",
												classes: "dek"
											},
											{
												name: "558",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "450",
												content: " ",
												classes: "dek"
											},
											{
												name: "451",
												content: " ",
												classes: "dek"
											},
											{
												name: "452",
												content: " ",
												classes: "dek"
											},
											{
												name: "453",
												content: " ",
												classes: "dek"
											},
											{
												name: "454",
												content: " ",
												classes: "dek"
											},
											{
												name: "455",
												content: " ",
												classes: "dek"
											},
											{
												name: "456",
												content: " ",
												classes: "dek"
											},
											{
												name: "457",
												content: " ",
												classes: "dek"
											},
											{
												name: "458",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "350",
												content: " ",
												classes: "dek"
											},
											{
												name: "351",
												content: " ",
												classes: "dek"
											},
											{
												name: "352",
												content: " ",
												classes: "dek"
											},
											{
												name: "353",
												content: " ",
												classes: "dek"
											},
											{
												name: "354",
												content: " ",
												classes: "dek"
											},
											{
												name: "355",
												content: " ",
												classes: "dek"
											},
											{
												name: "356",
												content: " ",
												classes: "dek"
											},
											{
												name: "357",
												content: " ",
												classes: "dek"
											},
											{
												name: "358",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "250",
												content: " ",
												classes: "dek"
											},
											{
												name: "251",
												content: " ",
												classes: "dek"
											},
											{
												name: "252",
												content: " ",
												classes: "dek"
											},
											{
												name: "253",
												content: " ",
												classes: "dek"
											},
											{
												name: "254",
												content: " ",
												classes: "dek"
											},
											{
												name: "255",
												content: " ",
												classes: "dek"
											},
											{
												name: "256",
												content: " ",
												classes: "dek"
											},
											{
												name: "257",
												content: " ",
												classes: "dek"
											},
											{
												name: "258",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "150",
												content: " ",
												classes: "dek"
											},
											{
												name: "151",
												content: " ",
												classes: "dek"
											},
											{
												name: "152",
												content: " ",
												classes: "dek"
											},
											{
												name: "153",
												content: " ",
												classes: "dek"
											},
											{
												name: "154",
												content: " ",
												classes: "dek"
											},
											{
												name: "155",
												content: " ",
												classes: "dek"
											},
											{
												name: "156",
												content: " ",
												classes: "dek"
											},
											{
												name: "157",
												content: " ",
												classes: "dek"
											},
											{
												name: "158",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column6",
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
												name: "940",
												content: " ",
												classes: "dek"
											},
											{
												name: "941",
												content: " ",
												classes: "dek"
											},
											{
												name: "942",
												content: " ",
												classes: "dek"
											},
											{
												name: "943",
												content: " ",
												classes: "dek"
											},
											{
												name: "944",
												content: " ",
												classes: "dek"
											},
											{
												name: "945",
												content: " ",
												classes: "dek"
											},
											{
												name: "946",
												content: " ",
												classes: "dek"
											},
											{
												name: "947",
												content: " ",
												classes: "dek"
											},
											{
												name: "948",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "840",
												content: " ",
												classes: "dek"
											},
											{
												name: "841",
												content: " ",
												classes: "dek"
											},
											{
												name: "842",
												content: " ",
												classes: "dek"
											},
											{
												name: "843",
												content: " ",
												classes: "dek"
											},
											{
												name: "844",
												content: " ",
												classes: "dek"
											},
											{
												name: "845",
												content: " ",
												classes: "dek"
											},
											{
												name: "846",
												content: " ",
												classes: "dek"
											},
											{
												name: "847",
												content: " ",
												classes: "dek"
											},
											{
												name: "848",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "740",
												content: " ",
												classes: "dek"
											},
											{
												name: "741",
												content: " ",
												classes: "dek"
											},
											{
												name: "742",
												content: " ",
												classes: "dek"
											},
											{
												name: "743",
												content: " ",
												classes: "dek"
											},
											{
												name: "744",
												content: " ",
												classes: "dek"
											},
											{
												name: "745",
												content: " ",
												classes: "dek"
											},
											{
												name: "746",
												content: " ",
												classes: "dek"
											},
											{
												name: "747",
												content: " ",
												classes: "dek"
											},
											{
												name: "748",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "640",
												content: " ",
												classes: "dek"
											},
											{
												name: "641",
												content: " ",
												classes: "dek"
											},
											{
												name: "642",
												content: " ",
												classes: "dek"
											},
											{
												name: "643",
												content: " ",
												classes: "dek"
											},
											{
												name: "644",
												content: " ",
												classes: "dek"
											},
											{
												name: "645",
												content: " ",
												classes: "dek"
											},
											{
												name: "646",
												content: " ",
												classes: "dek"
											},
											{
												name: "647",
												content: " ",
												classes: "dek"
											},
											{
												name: "648",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "540",
												content: " ",
												classes: "dek"
											},
											{
												name: "541",
												content: " ",
												classes: "dek"
											},
											{
												name: "542",
												content: " ",
												classes: "dek"
											},
											{
												name: "543",
												content: " ",
												classes: "dek"
											},
											{
												name: "544",
												content: " ",
												classes: "dek"
											},
											{
												name: "545",
												content: " ",
												classes: "dek"
											},
											{
												name: "546",
												content: " ",
												classes: "dek"
											},
											{
												name: "547",
												content: " ",
												classes: "dek"
											},
											{
												name: "548",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "440",
												content: " ",
												classes: "dek"
											},
											{
												name: "441",
												content: " ",
												classes: "dek"
											},
											{
												name: "442",
												content: " ",
												classes: "dek"
											},
											{
												name: "443",
												content: " ",
												classes: "dek"
											},
											{
												name: "444",
												content: " ",
												classes: "dek"
											},
											{
												name: "445",
												content: " ",
												classes: "dek"
											},
											{
												name: "446",
												content: " ",
												classes: "dek"
											},
											{
												name: "447",
												content: " ",
												classes: "dek"
											},
											{
												name: "448",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "340",
												content: " ",
												classes: "dek"
											},
											{
												name: "341",
												content: " ",
												classes: "dek"
											},
											{
												name: "342",
												content: " ",
												classes: "dek"
											},
											{
												name: "343",
												content: " ",
												classes: "dek"
											},
											{
												name: "344",
												content: " ",
												classes: "dek"
											},
											{
												name: "345",
												content: " ",
												classes: "dek"
											},
											{
												name: "346",
												content: " ",
												classes: "dek"
											},
											{
												name: "347",
												content: " ",
												classes: "dek"
											},
											{
												name: "348",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "240",
												content: " ",
												classes: "dek"
											},
											{
												name: "241",
												content: " ",
												classes: "dek"
											},
											{
												name: "242",
												content: " ",
												classes: "dek"
											},
											{
												name: "243",
												content: " ",
												classes: "dek"
											},
											{
												name: "244",
												content: " ",
												classes: "dek"
											},
											{
												name: "245",
												content: " ",
												classes: "dek"
											},
											{
												name: "246",
												content: " ",
												classes: "dek"
											},
											{
												name: "247",
												content: " ",
												classes: "dek"
											},
											{
												name: "248",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "140",
												content: " ",
												classes: "dek"
											},
											{
												name: "141",
												content: " ",
												classes: "dek"
											},
											{
												name: "142",
												content: " ",
												classes: "dek"
											},
											{
												name: "143",
												content: " ",
												classes: "dek"
											},
											{
												name: "144",
												content: " ",
												classes: "dek"
											},
											{
												name: "145",
												content: " ",
												classes: "dek"
											},
											{
												name: "146",
												content: " ",
												classes: "dek"
											},
											{
												name: "147",
												content: " ",
												classes: "dek"
											},
											{
												name: "148",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column5",
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
												name: "930",
												content: " ",
												classes: "dek"
											},
											{
												name: "931",
												content: " ",
												classes: "dek"
											},
											{
												name: "932",
												content: " ",
												classes: "dek"
											},
											{
												name: "933",
												content: " ",
												classes: "dek"
											},
											{
												name: "934",
												content: " ",
												classes: "dek"
											},
											{
												name: "935",
												content: " ",
												classes: "dek"
											},
											{
												name: "936",
												content: " ",
												classes: "dek"
											},
											{
												name: "937",
												content: " ",
												classes: "dek"
											},
											{
												name: "938",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "830",
												content: " ",
												classes: "dek"
											},
											{
												name: "831",
												content: " ",
												classes: "dek"
											},
											{
												name: "832",
												content: " ",
												classes: "dek"
											},
											{
												name: "833",
												content: " ",
												classes: "dek"
											},
											{
												name: "834",
												content: " ",
												classes: "dek"
											},
											{
												name: "835",
												content: " ",
												classes: "dek"
											},
											{
												name: "836",
												content: " ",
												classes: "dek"
											},
											{
												name: "837",
												content: " ",
												classes: "dek"
											},
											{
												name: "838",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "730",
												content: " ",
												classes: "dek"
											},
											{
												name: "731",
												content: " ",
												classes: "dek"
											},
											{
												name: "732",
												content: " ",
												classes: "dek"
											},
											{
												name: "733",
												content: " ",
												classes: "dek"
											},
											{
												name: "734",
												content: " ",
												classes: "dek"
											},
											{
												name: "735",
												content: " ",
												classes: "dek"
											},
											{
												name: "736",
												content: " ",
												classes: "dek"
											},
											{
												name: "737",
												content: " ",
												classes: "dek"
											},
											{
												name: "738",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "630",
												content: " ",
												classes: "dek"
											},
											{
												name: "631",
												content: " ",
												classes: "dek"
											},
											{
												name: "632",
												content: " ",
												classes: "dek"
											},
											{
												name: "633",
												content: " ",
												classes: "dek"
											},
											{
												name: "634",
												content: " ",
												classes: "dek"
											},
											{
												name: "635",
												content: " ",
												classes: "dek"
											},
											{
												name: "636",
												content: " ",
												classes: "dek"
											},
											{
												name: "637",
												content: " ",
												classes: "dek"
											},
											{
												name: "638",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "530",
												content: " ",
												classes: "dek"
											},
											{
												name: "531",
												content: " ",
												classes: "dek"
											},
											{
												name: "532",
												content: " ",
												classes: "dek"
											},
											{
												name: "533",
												content: " ",
												classes: "dek"
											},
											{
												name: "534",
												content: " ",
												classes: "dek"
											},
											{
												name: "535",
												content: " ",
												classes: "dek"
											},
											{
												name: "536",
												content: " ",
												classes: "dek"
											},
											{
												name: "537",
												content: " ",
												classes: "dek"
											},
											{
												name: "538",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "430",
												content: " ",
												classes: "dek"
											},
											{
												name: "431",
												content: " ",
												classes: "dek"
											},
											{
												name: "432",
												content: " ",
												classes: "dek"
											},
											{
												name: "433",
												content: " ",
												classes: "dek"
											},
											{
												name: "434",
												content: " ",
												classes: "dek"
											},
											{
												name: "435",
												content: " ",
												classes: "dek"
											},
											{
												name: "436",
												content: " ",
												classes: "dek"
											},
											{
												name: "437",
												content: " ",
												classes: "dek"
											},
											{
												name: "438",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "330",
												content: " ",
												classes: "dek"
											},
											{
												name: "331",
												content: " ",
												classes: "dek"
											},
											{
												name: "332",
												content: " ",
												classes: "dek"
											},
											{
												name: "333",
												content: " ",
												classes: "dek"
											},
											{
												name: "334",
												content: " ",
												classes: "dek"
											},
											{
												name: "335",
												content: " ",
												classes: "dek"
											},
											{
												name: "336",
												content: " ",
												classes: "dek"
											},
											{
												name: "337",
												content: " ",
												classes: "dek"
											},
											{
												name: "338",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "230",
												content: " ",
												classes: "dek"
											},
											{
												name: "231",
												content: " ",
												classes: "dek"
											},
											{
												name: "232",
												content: " ",
												classes: "dek"
											},
											{
												name: "233",
												content: " ",
												classes: "dek"
											},
											{
												name: "234",
												content: " ",
												classes: "dek"
											},
											{
												name: "235",
												content: " ",
												classes: "dek"
											},
											{
												name: "236",
												content: " ",
												classes: "dek"
											},
											{
												name: "237",
												content: " ",
												classes: "dek"
											},
											{
												name: "238",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "130",
												content: " ",
												classes: "dek"
											},
											{
												name: "131",
												content: " ",
												classes: "dek"
											},
											{
												name: "132",
												content: " ",
												classes: "dek"
											},
											{
												name: "133",
												content: " ",
												classes: "dek"
											},
											{
												name: "134",
												content: " ",
												classes: "dek"
											},
											{
												name: "135",
												content: " ",
												classes: "dek"
											},
											{
												name: "136",
												content: " ",
												classes: "dek"
											},
											{
												name: "137",
												content: " ",
												classes: "dek"
											},
											{
												name: "138",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column4",
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
												name: "920",
												content: " ",
												classes: "dek"
											},
											{
												name: "921",
												content: " ",
												classes: "dek"
											},
											{
												name: "922",
												content: " ",
												classes: "dek"
											},
											{
												name: "923",
												content: " ",
												classes: "dek"
											},
											{
												name: "924",
												content: " ",
												classes: "dek"
											},
											{
												name: "925",
												content: " ",
												classes: "dek"
											},
											{
												name: "926",
												content: " ",
												classes: "dek"
											},
											{
												name: "927",
												content: " ",
												classes: "dek"
											},
											{
												name: "928",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "820",
												content: " ",
												classes: "dek"
											},
											{
												name: "821",
												content: " ",
												classes: "dek"
											},
											{
												name: "822",
												content: " ",
												classes: "dek"
											},
											{
												name: "823",
												content: " ",
												classes: "dek"
											},
											{
												name: "824",
												content: " ",
												classes: "dek"
											},
											{
												name: "825",
												content: " ",
												classes: "dek"
											},
											{
												name: "826",
												content: " ",
												classes: "dek"
											},
											{
												name: "827",
												content: " ",
												classes: "dek"
											},
											{
												name: "828",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "720",
												content: " ",
												classes: "dek"
											},
											{
												name: "721",
												content: " ",
												classes: "dek"
											},
											{
												name: "722",
												content: " ",
												classes: "dek"
											},
											{
												name: "723",
												content: " ",
												classes: "dek"
											},
											{
												name: "724",
												content: " ",
												classes: "dek"
											},
											{
												name: "725",
												content: " ",
												classes: "dek"
											},
											{
												name: "726",
												content: " ",
												classes: "dek"
											},
											{
												name: "727",
												content: " ",
												classes: "dek"
											},
											{
												name: "728",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "620",
												content: " ",
												classes: "dek"
											},
											{
												name: "621",
												content: " ",
												classes: "dek"
											},
											{
												name: "622",
												content: " ",
												classes: "dek"
											},
											{
												name: "623",
												content: " ",
												classes: "dek"
											},
											{
												name: "624",
												content: " ",
												classes: "dek"
											},
											{
												name: "625",
												content: " ",
												classes: "dek"
											},
											{
												name: "626",
												content: " ",
												classes: "dek"
											},
											{
												name: "627",
												content: " ",
												classes: "dek"
											},
											{
												name: "628",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "520",
												content: " ",
												classes: "dek"
											},
											{
												name: "521",
												content: " ",
												classes: "dek"
											},
											{
												name: "522",
												content: " ",
												classes: "dek"
											},
											{
												name: "523",
												content: " ",
												classes: "dek"
											},
											{
												name: "524",
												content: " ",
												classes: "dek"
											},
											{
												name: "525",
												content: " ",
												classes: "dek"
											},
											{
												name: "526",
												content: " ",
												classes: "dek"
											},
											{
												name: "527",
												content: " ",
												classes: "dek"
											},
											{
												name: "528",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "420",
												content: " ",
												classes: "dek"
											},
											{
												name: "421",
												content: " ",
												classes: "dek"
											},
											{
												name: "422",
												content: " ",
												classes: "dek"
											},
											{
												name: "423",
												content: " ",
												classes: "dek"
											},
											{
												name: "424",
												content: " ",
												classes: "dek"
											},
											{
												name: "425",
												content: " ",
												classes: "dek"
											},
											{
												name: "426",
												content: " ",
												classes: "dek"
											},
											{
												name: "427",
												content: " ",
												classes: "dek"
											},
											{
												name: "428",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "320",
												content: " ",
												classes: "dek"
											},
											{
												name: "321",
												content: " ",
												classes: "dek"
											},
											{
												name: "322",
												content: " ",
												classes: "dek"
											},
											{
												name: "323",
												content: " ",
												classes: "dek"
											},
											{
												name: "324",
												content: " ",
												classes: "dek"
											},
											{
												name: "325",
												content: " ",
												classes: "dek"
											},
											{
												name: "326",
												content: " ",
												classes: "dek"
											},
											{
												name: "327",
												content: " ",
												classes: "dek"
											},
											{
												name: "328",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "220",
												content: " ",
												classes: "dek"
											},
											{
												name: "221",
												content: " ",
												classes: "dek"
											},
											{
												name: "222",
												content: " ",
												classes: "dek"
											},
											{
												name: "223",
												content: " ",
												classes: "dek"
											},
											{
												name: "224",
												content: " ",
												classes: "dek"
											},
											{
												name: "225",
												content: " ",
												classes: "dek"
											},
											{
												name: "226",
												content: " ",
												classes: "dek"
											},
											{
												name: "227",
												content: " ",
												classes: "dek"
											},
											{
												name: "228",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "120",
												content: " ",
												classes: "dek"
											},
											{
												name: "121",
												content: " ",
												classes: "dek"
											},
											{
												name: "122",
												content: " ",
												classes: "dek"
											},
											{
												name: "123",
												content: " ",
												classes: "dek"
											},
											{
												name: "124",
												content: " ",
												classes: "dek"
											},
											{
												name: "125",
												content: " ",
												classes: "dek"
											},
											{
												name: "126",
												content: " ",
												classes: "dek"
											},
											{
												name: "127",
												content: " ",
												classes: "dek"
											},
											{
												name: "128",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
								name: "column3",
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
												name: "910",
												content: " ",
												classes: "dek"
											},
											{
												name: "911",
												content: " ",
												classes: "dek"
											},
											{
												name: "912",
												content: " ",
												classes: "dek"
											},
											{
												name: "913",
												content: " ",
												classes: "dek"
											},
											{
												name: "914",
												content: " ",
												classes: "dek"
											},
											{
												name: "915",
												content: " ",
												classes: "dek"
											},
											{
												name: "916",
												content: " ",
												classes: "dek"
											},
											{
												name: "917",
												content: " ",
												classes: "dek"
											},
											{
												name: "918",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "810",
												content: " ",
												classes: "dek"
											},
											{
												name: "811",
												content: " ",
												classes: "dek"
											},
											{
												name: "812",
												content: " ",
												classes: "dek"
											},
											{
												name: "813",
												content: " ",
												classes: "dek"
											},
											{
												name: "814",
												content: " ",
												classes: "dek"
											},
											{
												name: "815",
												content: " ",
												classes: "dek"
											},
											{
												name: "816",
												content: " ",
												classes: "dek"
											},
											{
												name: "817",
												content: " ",
												classes: "dek"
											},
											{
												name: "818",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "710",
												content: " ",
												classes: "dek"
											},
											{
												name: "711",
												content: " ",
												classes: "dek"
											},
											{
												name: "712",
												content: " ",
												classes: "dek"
											},
											{
												name: "713",
												content: " ",
												classes: "dek"
											},
											{
												name: "714",
												content: " ",
												classes: "dek"
											},
											{
												name: "715",
												content: " ",
												classes: "dek"
											},
											{
												name: "716",
												content: " ",
												classes: "dek"
											},
											{
												name: "717",
												content: " ",
												classes: "dek"
											},
											{
												name: "718",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "610",
												content: " ",
												classes: "dek"
											},
											{
												name: "611",
												content: " ",
												classes: "dek"
											},
											{
												name: "612",
												content: " ",
												classes: "dek"
											},
											{
												name: "613",
												content: " ",
												classes: "dek"
											},
											{
												name: "614",
												content: " ",
												classes: "dek"
											},
											{
												name: "615",
												content: " ",
												classes: "dek"
											},
											{
												name: "616",
												content: " ",
												classes: "dek"
											},
											{
												name: "617",
												content: " ",
												classes: "dek"
											},
											{
												name: "618",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "510",
												content: " ",
												classes: "dek"
											},
											{
												name: "511",
												content: " ",
												classes: "dek"
											},
											{
												name: "512",
												content: " ",
												classes: "dek"
											},
											{
												name: "513",
												content: " ",
												classes: "dek"
											},
											{
												name: "514",
												content: " ",
												classes: "dek"
											},
											{
												name: "515",
												content: " ",
												classes: "dek"
											},
											{
												name: "516",
												content: " ",
												classes: "dek"
											},
											{
												name: "517",
												content: " ",
												classes: "dek"
											},
											{
												name: "518",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "410",
												content: " ",
												classes: "dek"
											},
											{
												name: "411",
												content: " ",
												classes: "dek"
											},
											{
												name: "412",
												content: " ",
												classes: "dek"
											},
											{
												name: "413",
												content: " ",
												classes: "dek"
											},
											{
												name: "414",
												content: " ",
												classes: "dek"
											},
											{
												name: "415",
												content: " ",
												classes: "dek"
											},
											{
												name: "416",
												content: " ",
												classes: "dek"
											},
											{
												name: "417",
												content: " ",
												classes: "dek"
											},
											{
												name: "418",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "310",
												content: " ",
												classes: "dek"
											},
											{
												name: "311",
												content: " ",
												classes: "dek"
											},
											{
												name: "312",
												content: " ",
												classes: "dek"
											},
											{
												name: "313",
												content: " ",
												classes: "dek"
											},
											{
												name: "314",
												content: " ",
												classes: "dek"
											},
											{
												name: "315",
												content: " ",
												classes: "dek"
											},
											{
												name: "316",
												content: " ",
												classes: "dek"
											},
											{
												name: "317",
												content: " ",
												classes: "dek"
											},
											{
												name: "318",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "210",
												content: " ",
												classes: "dek"
											},
											{
												name: "211",
												content: " ",
												classes: "dek"
											},
											{
												name: "212",
												content: " ",
												classes: "dek"
											},
											{
												name: "213",
												content: " ",
												classes: "dek"
											},
											{
												name: "214",
												content: " ",
												classes: "dek"
											},
											{
												name: "215",
												content: " ",
												classes: "dek"
											},
											{
												name: "216",
												content: " ",
												classes: "dek"
											},
											{
												name: "217",
												content: " ",
												classes: "dek"
											},
											{
												name: "218",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "110",
												content: " ",
												classes: "dek"
											},
											{
												name: "111",
												content: " ",
												classes: "dek"
											},
											{
												name: "112",
												content: " ",
												classes: "dek"
											},
											{
												name: "113",
												content: " ",
												classes: "dek"
											},
											{
												name: "114",
												content: " ",
												classes: "dek"
											},
											{
												name: "115",
												content: " ",
												classes: "dek"
											},
											{
												name: "116",
												content: " ",
												classes: "dek"
											},
											{
												name: "117",
												content: " ",
												classes: "dek"
											},
											{
												name: "118",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }]
                        }, {
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
												name: "900",
												content: " ",
												classes: "dek"
											},
											{
												name: "901",
												content: " ",
												classes: "dek"
											},
											{
												name: "902",
												content: " ",
												classes: "dek"
											},
											{
												name: "903",
												content: " ",
												classes: "dek"
											},
											{
												name: "904",
												content: " ",
												classes: "dek"
											},
											{
												name: "905",
												content: " ",
												classes: "dek"
											},
											{
												name: "906",
												content: " ",
												classes: "dek"
											},
											{
												name: "907",
												content: " ",
												classes: "dek"
											},
											{
												name: "908",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "800",
												content: " ",
												classes: "dek"
											},
											{
												name: "801",
												content: " ",
												classes: "dek"
											},
											{
												name: "802",
												content: " ",
												classes: "dek"
											},
											{
												name: "803",
												content: " ",
												classes: "dek"
											},
											{
												name: "804",
												content: " ",
												classes: "dek"
											},
											{
												name: "805",
												content: " ",
												classes: "dek"
											},
											{
												name: "806",
												content: " ",
												classes: "dek"
											},
											{
												name: "807",
												content: " ",
												classes: "dek"
											},
											{
												name: "808",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "700",
												content: " ",
												classes: "dek"
											},
											{
												name: "701",
												content: " ",
												classes: "dek"
											},
											{
												name: "702",
												content: " ",
												classes: "dek"
											},
											{
												name: "703",
												content: " ",
												classes: "dek"
											},
											{
												name: "704",
												content: " ",
												classes: "dek"
											},
											{
												name: "705",
												content: " ",
												classes: "dek"
											},
											{
												name: "706",
												content: " ",
												classes: "dek"
											},
											{
												name: "707",
												content: " ",
												classes: "dek"
											},
											{
												name: "708",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "600",
												content: " ",
												classes: "dek"
											},
											{
												name: "601",
												content: " ",
												classes: "dek"
											},
											{
												name: "602",
												content: " ",
												classes: "dek"
											},
											{
												name: "603",
												content: " ",
												classes: "dek"
											},
											{
												name: "604",
												content: " ",
												classes: "dek"
											},
											{
												name: "605",
												content: " ",
												classes: "dek"
											},
											{
												name: "606",
												content: " ",
												classes: "dek"
											},
											{
												name: "607",
												content: " ",
												classes: "dek"
											},
											{
												name: "608",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "500",
												content: " ",
												classes: "dek"
											},
											{
												name: "501",
												content: " ",
												classes: "dek"
											},
											{
												name: "502",
												content: " ",
												classes: "dek"
											},
											{
												name: "503",
												content: " ",
												classes: "dek"
											},
											{
												name: "504",
												content: " ",
												classes: "dek"
											},
											{
												name: "505",
												content: " ",
												classes: "dek"
											},
											{
												name: "506",
												content: " ",
												classes: "dek"
											},
											{
												name: "507",
												content: " ",
												classes: "dek"
											},
											{
												name: "508",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "400",
												content: " ",
												classes: "dek"
											},
											{
												name: "401",
												content: " ",
												classes: "dek"
											},
											{
												name: "402",
												content: " ",
												classes: "dek"
											},
											{
												name: "403",
												content: " ",
												classes: "dek"
											},
											{
												name: "404",
												content: " ",
												classes: "dek"
											},
											{
												name: "405",
												content: " ",
												classes: "dek"
											},
											{
												name: "406",
												content: " ",
												classes: "dek"
											},
											{
												name: "407",
												content: " ",
												classes: "dek"
											},
											{
												name: "408",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "300",
												content: " ",
												classes: "dek"
											},
											{
												name: "301",
												content: " ",
												classes: "dek"
											},
											{
												name: "302",
												content: " ",
												classes: "dek"
											},
											{
												name: "303",
												content: " ",
												classes: "dek"
											},
											{
												name: "304",
												content: " ",
												classes: "dek"
											},
											{
												name: "305",
												content: " ",
												classes: "dek"
											},
											{
												name: "306",
												content: " ",
												classes: "dek"
											},
											{
												name: "307",
												content: " ",
												classes: "dek"
											},
											{
												name: "308",
												content: " ",
												classes: "dek"
											}
                                    ]
                                }, {
										classes: "dekcell",
										components: [
											{
												name: "200",
												content: " ",
												classes: "dek"
											},
											{
												name: "201",
												content: " ",
												classes: "dek"
											},
											{
												name: "202",
												content: " ",
												classes: "dek"
											},
											{
												name: "203",
												content: " ",
												classes: "dek"
											},
											{
												name: "204",
												content: " ",
												classes: "dek"
											},
											{
												name: "205",
												content: " ",
												classes: "dek"
											},
											{
												name: "206",
												content: " ",
												classes: "dek"
											},
											{
												name: "207",
												content: " ",
												classes: "dek"
											},
											{
												name: "208",
												content: " ",
												classes: "dek"
											}
                                    ]
                                },
									{
										classes: "dekcell",
										components: [
											{
												name: "100",
												content: " ",
												classes: "dek"
											},
											{
												name: "101",
												content: " ",
												classes: "dek"
											},
											{
												name: "102",
												content: " ",
												classes: "dek"
											},
											{
												name: "103",
												content: " ",
												classes: "dek"
											},
											{
												name: "104",
												content: " ",
												classes: "dek"
											},
											{
												name: "105",
												content: " ",
												classes: "dek"
											},
											{
												name: "106",
												content: " ",
												classes: "dek"
											},
											{
												name: "107",
												content: " ",
												classes: "dek"
											},
											{
												name: "108",
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
				inSender.setContent("Straight");
			if (!straight[parseInt(inSender.name.slice(6)) - 1])
				inSender.setContent("Looped");
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
				curCommands = inSender.getValue().replace(/(<[^>]*>)+/ig, "test").replace(/test(\+|-)/ig, "$1").replace(/test\[[0-9]\]/ig, "").split("test");
				for (i = 0; i < curCommands.length; i++) {
					//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
					if (curCommands[i] == "") {
						curCommands.splice(i, 1);
					}
				}
			}
			enyo.log(curCommands);
			tpr[parseInt(inSender.name.substring(3)) - 1] = inSender.getValue();
			console.log(tpr + " : " + curCommands);
		},
		execCommands: function () {
			prevText = this.$.log.getValue();
			if (curCommands[0].length != 3 && curCommands[0].length != 5 && curCommands[0].length != 14) {
				curTapeReader = "";
				this.$.log.setValue(prevText + "Error: This Command/Block Marker must be 1 or 5 or 9 characters long with a plus/minus included, ex. [1], [2], 21000 or 10110\n+12345678");
			} else {
				curTapeReader = "";
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
			//this.$.storesPopup.show();
			curCommands = this.$["num" + (curTpr + 1)].getValue().replace(/(<[^>]*>)+/ig, "test").replace(/test(\+|-)/ig, "$1").replace(/test\[[0-9]\]/ig, "").split("test");
			for (i = 0; i < curCommands.length; i++) {
				//curCommands[i].replace(/(<.{1,4}>)+/ig, "");
				if (curCommands[i] == "") {
					curCommands.splice(i, 1);
				}
			}
			
			
			
			
			if (curCommands[0] != "") {
				var overflow = 0;
				var prevText = this.$.log.getValue();
				console.log(typeof(curCommands));
				if (curCommands != [] && curCommands[0][0] != "[" && isNaN(parseInt(curCommands[0]))) {
					this.$.log.setValue(prevText + "\n" + curCommands[0] + "\nError: Command(s) need to include only numbers and maybe plus signs and dashes");
				} else if (curCommands != []) {
					this.$.log.setValue(prevText + "\n" + curCommands[0]);
				}
				var prevText = this.$.log.getValue();
				if(curCommands[0] != "[1]" && !ranAlready) {
					this.$.log.setValue(prevText + "\n" + curCommands[0] + "\nError: [1] is required as the first command");
					ranAlready = true;
					this.stop();
				} else {
					ranAlready = true;
					var commandStr = curCommands[0];
					switch (commandStr[0]) {
					case "0":
						switch (commandStr[1]) {
						case "0":
							if(commandStr == "00100") {
								var curTprStr = this.$["num" + (curTpr + 1)].getValue().split(/(<[^>]+>)+/ig);
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
								this.$["num" + (curTpr + 1)].setValue(curTprStr.join("<br>"));
								this.stop();
							}
						break;
						case "2":
							if (commandStr[2] == "1") {
								curTpr = parseInt(commandStr.slice(3,5))-1;
								this.sv6();
							}
							break;
						case "3":
							blkNum = commandStr.slice(2, 3);
							stbCurTpr = commandStr.slice(4);
							done = true;
							this.searchForBlkMarker();
							break;
						}
					break;
					case "1":
						if (commandStr.slice(2, 3) == curTpr.toString()) {
							console.log(this.$[commandStr.slice(1, 3) + "0"].getContent());
							if (this.$[commandStr.slice(1, 3) + "0"].getContent() != " " && this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
								if (this.$[commandStr.slice(3, 5) + "0"].getContent() == "0")
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								else
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								if (this.$[commandStr.slice(1, 3) + "0"].getContent() == "0")
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								else
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								finStr = (s2 + s1).toString();
								console.log(finStr);
								if (parseInt(finStr) > 0) {
									finStr = "0" + finStr;
								}
								if (parseInt(finStr) < 0) {
									while (finStr.length < 9) {
										finStr = "90" + finStr.slice(1);
										console.log(finStr);
									}
								} else {
									while (finStr.length < 9) {
										finStr = "00" + finStr.slice(1);
									}
								}
								stores[parseInt(commandStr.slice(3, 5) + 0)] = finStr[0];
								stores[parseInt(commandStr.slice(3, 5) + 1)] = finStr[1];
								stores[parseInt(commandStr.slice(3, 5) + 2)] = finStr[2];
								stores[parseInt(commandStr.slice(3, 5) + 3)] = finStr[3];
								stores[parseInt(commandStr.slice(3, 5) + 4)] = finStr[4];
								stores[parseInt(commandStr.slice(3, 5) + 5)] = finStr[5];
								stores[parseInt(commandStr.slice(3, 5) + 6)] = finStr[6];
								stores[parseInt(commandStr.slice(3, 5) + 7)] = finStr[7];
								stores[parseInt(commandStr.slice(3, 5) + 8)] = finStr[8];
							} else {
								this.$.log.setValue(prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						} else if ((parseInt(commandStr.slice(3, 5)) - 10) / 9 < 0 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
							this.$.log.setValue(prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
						} else if (parseInt(commandStr.slice(3, 5)) == 8) {
							finStr = commandStr.slice(5);
							if (finStr[0] == "+") finStr = finStr.replaceAt(0, "0");
							else finStr = finStr.replaceAt(0, "9");
							console.log(finStr);
							stores[0] = finStr[0];
							stores[9] = finStr[1];
							stores[10] = finStr[2];
							stores[11] = finStr[3];
							stores[12] = finStr[4];
							stores[13] = finStr[5];
							stores[14] = finStr[6];
							stores[15] = finStr[7];
							console.log(stores);
						} else if (parseInt(commandStr.slice(3, 5)) == 9) {
							finStr = commandStr.slice(5);
							if (finStr[0] == "+") finStr = finStr.replaceAt(0, "0");
							else finStr = finStr.replaceAt(0, "9");
							console.log(finStr);
							stores[0] = finStr[0];
							stores[1] = finStr[1];
							stores[2] = finStr[2];
							stores[3] = finStr[3];
							stores[4] = finStr[4];
							stores[5] = finStr[5];
							stores[6] = finStr[6];
							stores[7] = finStr[7];
							stores[8] = finStr[8];
							console.log(stores);
						} else {
							var finStr;
							for (var i = 0; i < 9; i++) {
								var isEight = i == 8;
								if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
									if (commandStr.slice(5, 6) == "+") {
										var s1 = "0" + commandStr.slice(6);
									} else {
										var s1 = "9" + commandStr.slice(6);
									}
									finStr = s1;
									if (finStr[0] == "9")
										finStr.replaceAt(1, (9 - parseInt(finStr[i])).toString());
									console.log((9 - parseInt(finStr[i])).toString());
									if (finStr.length < 9 && 8 - i - 1 > finStr.length) {
										stores[parseInt(commandStr.slice(3, 5) + i)] = "0";
									} else {
										stores[parseInt(commandStr.slice(3, 5) + i)] = finStr[i];
									}
	
								}
							}
						}
	
						if (this.$[commandStr.slice(3, 5) + "0"] && this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && commandStr.slice(2, 3) == curTpr && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
							ss = true;
							cmdString = commandStr.slice(3, 5);
							this.updateStores();
						} else if (commandStr.slice(1, 5).indexOf(curTpr + "09") != -1) {
	
							this.updateQudStores();
						} else if (commandStr.slice(1, 5).indexOf(curTpr + "08") !=-1) {
	
							this.updateQudStores();
						} else if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && this.$[commandStr.slice(1, 3) + "0"].getContent() != " ") {
							ss = true;
							cmdString = commandStr.slice(3, 5);
							this.updateStores();
						}
						console.log(stores);
					break;
					case "2":
						if (commandStr.slice(3, 5) != "00") {
							console.log(this.$[commandStr.slice(1, 3) + "0"].getContent());
							if (this.$[commandStr.slice(1, 3) + "0"].getContent() != " " && this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
								if (this.$[commandStr.slice(3, 5) + "0"].getContent() == "0")
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								else
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								if (this.$[commandStr.slice(1, 3) + "0"].getContent() == "0")
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								else
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								finStr = (s2 - s1).toString();
								console.log(finStr);
								if (parseInt(finStr) > 0) {
									finStr = "0" + finStr;
								}
								if (parseInt(finStr) < 0) {
									while (finStr.length < 9) {
										finStr = "90" + finStr.slice(1);
										console.log(finStr);
									}
									for (var d = 0; d < 9; d++) {
										finStr[d] = (9 - parseInt(finStr[d])).toString();
									}
								} else {
									while (finStr.length < 9) {
										finStr = "00" + finStr.slice(1);
									}
								}
								stores[parseInt(commandStr.slice(3, 5) + 0)] = finStr[0];
								stores[parseInt(commandStr.slice(3, 5) + 1)] = finStr[1];
								stores[parseInt(commandStr.slice(3, 5) + 2)] = finStr[2];
								stores[parseInt(commandStr.slice(3, 5) + 3)] = finStr[3];
								stores[parseInt(commandStr.slice(3, 5) + 4)] = finStr[4];
								stores[parseInt(commandStr.slice(3, 5) + 5)] = finStr[5];
								stores[parseInt(commandStr.slice(3, 5) + 6)] = finStr[6];
								stores[parseInt(commandStr.slice(3, 5) + 7)] = finStr[7];
								stores[parseInt(commandStr.slice(3, 5) + 8)] = finStr[8];
							} else {
								this.$.log.setValue(prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						} else if ((parseInt(commandStr.slice(1, 3)) - 10) / 9 < 0 && commandStr.slice(1, 3) != "09") {
							this.$.log.setValue(prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
						}
						if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {
							sss = true;
							cmdString2 = commandStr.slice(1, 3);
							this.updateSecStores();
						} else if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) == "09") {
							this.updateTriStores();
						} else if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && commandStr.slice(3, 5) != "00") {
							ss = true;
							cmdString = commandStr.slice(3, 5);
							this.updateStores();
							sss = true;
							cmdString2 = commandStr.slice(1, 3);
							this.updateSecStores();
						}
						console.log(stores);
					break;
					case "3":
						if (commandStr.slice(2, 3) == curTpr.toString()) {
							console.log(this.$[commandStr.slice(1, 3) + "0"].getContent());
							if (this.$[commandStr.slice(1, 3) + "0"].getContent() != " " && this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
								if (this.$[commandStr.slice(3, 5) + "0"].getContent() == "0")
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								else
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								if (this.$[commandStr.slice(1, 3) + "0"].getContent() == "0")
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								else
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								finStr = (s2 - s1).toString();
								console.log(finStr);
								if (parseInt(finStr) > 0) {
									finStr = "0" + finStr;
								}
								if (parseInt(finStr) < 0) {
									while (finStr.length < 9) {
										finStr = "90" + finStr.slice(1);
										console.log(finStr);
									}
								} else {
									while (finStr.length < 9) {
										finStr = "00" + finStr.slice(1);
									}
								}
								stores[parseInt(commandStr.slice(3, 5) + 0)] = finStr[0];
								stores[parseInt(commandStr.slice(3, 5) + 1)] = finStr[1];
								stores[parseInt(commandStr.slice(3, 5) + 2)] = finStr[2];
								stores[parseInt(commandStr.slice(3, 5) + 3)] = finStr[3];
								stores[parseInt(commandStr.slice(3, 5) + 4)] = finStr[4];
								stores[parseInt(commandStr.slice(3, 5) + 5)] = finStr[5];
								stores[parseInt(commandStr.slice(3, 5) + 6)] = finStr[6];
								stores[parseInt(commandStr.slice(3, 5) + 7)] = finStr[7];
								stores[parseInt(commandStr.slice(3, 5) + 8)] = finStr[8];
							} else {
								this.$.log.setValue(prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						} else if ((parseInt(commandStr.slice(3, 5)) - 10) / 9 < 0 && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
							this.$.log.setValue(prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
						} else if (parseInt(commandStr.slice(3, 5)) == 8) {
							finStr = commandStr.slice(5);
							if (finStr[0] == "+") finStr = finStr.replaceAt(0, "0");
							else finStr = finStr.replaceAt(0, "9");
							console.log(finStr);
							stores[0] = finStr[0];
							stores[9] = finStr[1];
							stores[10] = finStr[2];
							stores[11] = finStr[3];
							stores[12] = finStr[4];
							stores[13] = finStr[5];
							stores[14] = finStr[6];
							stores[15] = finStr[7];
							console.log(stores);
						} else if (parseInt(commandStr.slice(3, 5)) == 9) {
							finStr = commandStr.slice(5);
							if (finStr[0] == "+") finStr = finStr.replaceAt(0, "0");
							else finStr = finStr.replaceAt(0, "9");
							console.log(finStr);
							stores[0] = finStr[0];
							stores[1] = finStr[1];
							stores[2] = finStr[2];
							stores[3] = finStr[3];
							stores[4] = finStr[4];
							stores[5] = finStr[5];
							stores[6] = finStr[6];
							stores[7] = finStr[7];
							stores[8] = finStr[8];
							console.log(stores);
						} else {
							var finStr;
							for (var i = 0; i < 9; i++) {
								var isEight = i == 8;
								if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
									if (commandStr.slice(5, 6) == "+") {
										var s1 = "0" + commandStr.slice(6);
									} else {
										var s1 = "9" + commandStr.slice(6);
									}
									finStr = s1;
									if (commandStr.slice(5, 6) == "9")
										finStr[i] = (9 - parseInt(finStr[i])).toString;
									if (i == 0) {
										if (commandStr.slice(5, 6) == "-") stores[parseInt(commandStr.slice(3, 5) + i)] = "9";
										else stores[parseInt(commandStr.slice(3, 5) + i)] = "0";
									} else {
										if (finStr.length < 9 && 8 - i - 1 > finStr.length) {
											stores[parseInt(commandStr.slice(3, 5) + i)] = "0";
										} else {
											stores[parseInt(commandStr.slice(3, 5) + i)] = finStr[i];
										}
									}
								}
							}
						}
	
						if (this.$[commandStr.slice(3, 5) + "0"] && this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && commandStr.slice(2, 3) == curTpr && commandStr.slice(3, 5) != "09" && commandStr.slice(3, 5) != "08") {
							ss = true;
							cmdString = commandStr.slice(3, 5);
							this.updateStores();
						} else if (commandStr.slice(1, 5).indexOf(curTpr + "09") != -1) {
	
							this.updateQudStores();
						} else if (commandStr.slice(1, 5).indexOf(curTpr + "08") !=-1) {
	
							this.updateQudStores();
						} else if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && this.$[commandStr.slice(1, 3) + "0"].getContent() != " ") {
							ss = true;
							cmdString = commandStr.slice(3, 5);
							this.updateStores();
						}
						console.log(stores);
						break;
						case "4":
							if (commandStr.slice(3, 5) != "00") {
								console.log(this.$[commandStr.slice(1, 3) + "0"].getContent());
								if (this.$[commandStr.slice(1, 3) + "0"].getContent() != " " && this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
									if (this.$[commandStr.slice(3, 5) + "0"].getContent() == "0")
										var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
									else
										var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
									if (this.$[commandStr.slice(1, 3) + "0"].getContent() == "0")
										var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
									else
										var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
									finStr = (s2 - s1).toString();
									console.log(finStr);
									if (parseInt(finStr) > 0) {
										finStr = "0" + finStr;
									}
									if (parseInt(finStr) < 0) {
										while (finStr.length < 9) {
											finStr = "90" + finStr.slice(1);
											console.log(finStr);
										}
										for (var d = 0; d < 9; d++) {
											finStr[d] = (9 - parseInt(finStr[d])).toString();
										}
									} else {
										while (finStr.length < 9) {
											finStr = "00" + finStr.slice(1);
										}
									}
									stores[parseInt(commandStr.slice(3, 5) + 0)] = finStr[0];
									stores[parseInt(commandStr.slice(3, 5) + 1)] = finStr[1];
									stores[parseInt(commandStr.slice(3, 5) + 2)] = finStr[2];
									stores[parseInt(commandStr.slice(3, 5) + 3)] = finStr[3];
									stores[parseInt(commandStr.slice(3, 5) + 4)] = finStr[4];
									stores[parseInt(commandStr.slice(3, 5) + 5)] = finStr[5];
									stores[parseInt(commandStr.slice(3, 5) + 6)] = finStr[6];
									stores[parseInt(commandStr.slice(3, 5) + 7)] = finStr[7];
									stores[parseInt(commandStr.slice(3, 5) + 8)] = finStr[8];
								} else {
									this.$.log.setValue(prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
								}
							} else if ((parseInt(commandStr.slice(1, 3)) - 10) / 9 < 0 && commandStr.slice(1, 3) != "09") {
								this.$.log.setValue(prevText + "Error: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
							} else if (parseInt(commandStr.slice(1, 3)) == 9) {
								this.$.acc.setContent(commandStr.slice(5));
							}
							if (commandStr.slice(3, 5) == "00") {
								sss = true;
								cmdString2 = commandStr.slice(1, 3);
								this.updateSecStores();
							} else if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && commandStr.slice(3, 5) != "00") {
								ss = true;
								cmdString = commandStr.slice(3, 5);
								this.updateStores();
								sss = true;
								cmdString2 = commandStr.slice(1, 3);
								this.updateSecStores();
							}
							console.log(stores);
							break;
						case "5":
							console.log(this.$[commandStr.slice(1, 3) + "0"].getContent());
							if (this.$[commandStr.slice(1, 3) + "0"].getContent() != " " && this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
								if (this.$[commandStr.slice(3, 5) + "0"].getContent() == "0")
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								else
									var s1 = parseInt(this.$[commandStr.slice(3, 5) + "1"].getContent() + this.$[commandStr.slice(3, 5) + "2"].getContent() + this.$[commandStr.slice(3, 5) + "3"].getContent() + this.$[commandStr.slice(3, 5) + "4"].getContent() + this.$[commandStr.slice(3, 5) + "5"].getContent() + this.$[commandStr.slice(3, 5) + "6"].getContent() + this.$[commandStr.slice(3, 5) + "7"].getContent() + this.$[commandStr.slice(3, 5) + "8"].getContent());
								if (this.$[commandStr.slice(1, 3) + "0"].getContent() == "0")
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								else
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								finStr = (s2 * s1).toString();
								console.log(finStr);
								if (parseInt(finStr) > 0) {
									finStr = "0" + finStr;
								}
								if (parseInt(finStr) < 0) {
									if (finStr.length > 16) {
										prevText = this.$.log.getValue();
										this.$.log.setValue(prevText + "\nThe accumulator has been overfilled!");
										finStr = finStr.slice(0, 1) + finStr.slice(2);
									}
									while (finStr.length < 16) {
										finStr = "90" + finStr.slice(1);
										console.log(finStr);
									}
									for (var d = 0; d < 16; d++) {
										finStr[d] = (9 - parseInt(finStr[d])).toString();
									}
								} else {
									if (finStr.length > 16) {
										prevText = this.$.log.getValue();
										this.$.log.setValue(prevText + "\nThe accumulator has been overfilled!");
										finStr = finStr.slice(0, 1) + finStr.slice(2);
									}
									while (finStr.length < 16) {
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
								this.$.log.setValue(prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
							if (commandStr.slice(3, 5) == "00" && commandStr.slice(1, 3) != "09") {

							} else if (this.$[commandStr.slice(3, 5) + "0"].getContent() != " " && commandStr.slice(3, 5) != "00") {
								cmdString = commandStr.slice(1, 3);
								this.updateQudStores();
							}
							console.log(stores);
							break;
						case "6":
							console.log(this.$[commandStr.slice(1, 3) + "0"].getContent());
							if (this.$[commandStr.slice(1, 3) + "0"].getContent() != " " && this.$[commandStr.slice(3, 5) + "0"].getContent() != " ") {
								if (this.$["090"].getContent() == "0")
									var s1 = parseInt(this.$["091"].getContent() + this.$["092"].getContent() + this.$["093"].getContent() + this.$["094"].getContent() + this.$["095"].getContent() + this.$["096"].getContent() + this.$["097"].getContent() + this.$["098"].getContent() + this.$["099"].getContent() + this.$["0910"].getContent() + this.$["0911"].getContent() + this.$["0912"].getContent() + this.$["0913"].getContent() + this.$["0914"].getContent() + this.$["0915"].getContent());
								else
									var s1 = parseInt(this.$["091"].getContent() + this.$["092"].getContent() + this.$["093"].getContent() + this.$["094"].getContent() + this.$["095"].getContent() + this.$["096"].getContent() + this.$["097"].getContent() + this.$["098"].getContent() + this.$["099"].getContent() + this.$["0910"].getContent() + this.$["0911"].getContent() + this.$["0912"].getContent() + this.$["0913"].getContent() + this.$["0914"].getContent() + this.$["0915"].getContent());
								if (this.$[commandStr.slice(1, 3) + "0"].getContent() == "0")
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								else
									var s2 = parseInt(this.$[commandStr.slice(1, 3) + "1"].getContent() + this.$[commandStr.slice(1, 3) + "2"].getContent() + this.$[commandStr.slice(1, 3) + "3"].getContent() + this.$[commandStr.slice(1, 3) + "4"].getContent() + this.$[commandStr.slice(1, 3) + "5"].getContent() + this.$[commandStr.slice(1, 3) + "6"].getContent() + this.$[commandStr.slice(1, 3) + "7"].getContent() + this.$[commandStr.slice(1, 3) + "8"].getContent());
								var finStr3 = Math.floor(s1 / s2).toString();
								console.log(finStr3);
								if (parseInt(finStr3) > 0) {
									finStr3 = "0" + finStr3;
								}
								if (parseInt(finStr3) < 0) {
									while (finStr3.length < 9) {
										finStr3 = "90" + finStr3.slice(1);
										console.log(finStr3);
									}
									for (var d = 0; d < 16; d++) {
										finStr3[d] = (9 - parseInt(finStr3[d])).toString();
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
								this.$.log.setValue(prevText + "Error: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
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
							enyo.job("j1", enyo.bind(this, "switchback"), 1503);
					} 
					
				}
			},
			switchback: function () {
				var curTprStr = this.$["num" + (curTpr + 1)].getValue().split(/(<[^>]+>)+/ig);
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
				this.$["num" + (curTpr + 1)].setValue(curTprStr.join("<br>"));
				if (curTprStr != "")
					this.evaluate();
				else
					this.stop();
			},
			updateStores: function () {
				if (s < 9) {
					this.$[cmdString + s].setContent(stores[parseInt(cmdString + s)]);
					console.log(s);

					if (!done)
						this.switchbackv2();
				} else {
					s = 0;
					ss = false;
				}
			},
			updateSecStores: function () {
				if (s < 9) {
					this.$[cmdString2 + s].setContent("000000000" [s]);
					if (!done)
						this.switchbackv2();
				} else {
					s = 0;
					sss = false;
				}
			},
			updateTriStores: function () {
				if (t < 16) {
					this.$["09" + t].setContent("000000000000000" [t]);
					if (!done)
						this.sv3();
				} else {
					t = 0;
				}
			},
			updateQudStores: function () {
				if (t < 16) {
					this.$["09" + t].setContent(stores[parseInt("00" + t)]);
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
				if (this.$["num" + stbCurTpr].getValue() != "" && done) {
					var curTprStr = this.$["num" + stbCurTpr].getValue().split(/(<[^>]+>)+/ig);
					for (g = 0; g < curTprStr.length; g++) {
						if (curTprStr.indexOf("") != -1) {
							curTprStr.splice(curTprStr.indexOf(""), 1);
						}
						if (curTprStr.indexOf("<br>") != -1) {
							curTprStr.splice(curTprStr.indexOf("<br>"), 1);
						}
					}
					if (curTprStr[0] == "[" + blkNum + "]") {
						foundBlkMarker = true;
						done = false;
					}
					console.log(curTprStr);
					if (straight[parseInt(stbCurTpr) - 1])
						curTprStr.shift();
					else
						curTprStr.push(curTprStr.shift());
					this.$["num" + (stbCurTpr)].setValue(curTprStr.join("<br>"));
				}
				if (!foundBlkMarker && this.$["num" + stbCurTpr].getValue() == "") {
					var prevText = this.$.log.getValue();
					this.$.log.setValue(prevText + "\nBlock marker not found");
					done = false;
					var curTprStr = this.$["num" + (curTpr+1)].getValue().split(/(<[^>]+>)+/ig);
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
					this.$["num" + (curTpr+1)].setValue(curTprStr.join("<br>"));
					done = false;
					
					this.switchback();
				} else if (foundBlkMarker && this.$["num" + stbCurTpr].getValue() != "") {
					done = false;
					this.switchback();
					foundBlkMarker = false;
				} else if (!foundBlkMarker && this.$["num" + stbCurTpr].getValue() != "") {
					this.sv5();
					console.log("Ugghhhh!");
				}
				console.log(done);
			},
			sv5: function () {
				enyo.job("j5", enyo.bind(this, "searchForBlkMarker"), 712);
			}
		});