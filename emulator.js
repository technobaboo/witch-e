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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General
 * Public License along with this site/repo; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place, Suite 330,
 * Boston, MA  02111-1307  USA
 */




var curCommands = [];
var newCommands = "";
var d8 = [];
var x = 0;
var i = 0;
var stores = [];
var defaultStores = [];
var prevText = "";
var tpr = ["", "", "", "", "", "", ""];
var curTapeReader = "";
var mainWindow;

enyo.kind({
	name: "emulatorMain",
	classes:"moon enyo-unselectable enyo-fit",
	kind:"Control",
	components:[
		{name: "panels", kind: "moon.Panels", pattern: "activity", classes: "enyo-fit", style: "z-index: 500;", useHandle: false, components: [
            {title: "Stores", titleBelow:"Where the stuff goes", classes: "moon-7h", components: [
				{kind: 'moon.Scroller', fit:true, components: [
					{kind:"moon.Divider", content:"Accumulator"},
					{name:"acc", kind:"moon.Item", content:"Undefined"},
					{kind:"moon.Divider", content:"#1"},
					{name:"number1", kind:"moon.Item", content:"Undefined"},
					{kind:"moon.Divider", content:"#2"},
					{name:"number2", kind:"moon.Item", content:"Undefined"},
					{kind:"moon.Divider", content:"#3"},
					{name:"number3", kind:"moon.Item", content:"Undefined"},
					{kind:"moon.Divider", content:"#4"},
					{name:"number4", kind:"moon.Item", content:"Undefined"},
					{kind:"moon.Divider", content:"#5"},
					{name:"number5", kind:"moon.Item", content:"Undefined"},
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
			{title: "Log", titleBelow:"Commands", classes: "moon-7h", joinToPrev: true, components: [
				{kind: 'moon.Scroller', fit:true, components: [
					{kind: "moon.InputDecorator", fit:true, style:"height: 1000px; width:98%", fit:true, components: [
						{kind: "moon.TextArea", name:"log", disabled: true, spotlight:false, value:"WITCH-E v1.0.0", fit:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #1"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr1", placeholder: "Tape Reader 1 Input", dismissOnEnter:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #2"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr2", placeholder: "Tape Reader 2 Input", dismissOnEnter:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #3"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr3", placeholder: "Tape Reader 3 Input", dismissOnEnter:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #4"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr4", placeholder: "Tape Reader 4 Input", dismissOnEnter:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #5"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr5", placeholder: "Tape Reader 5 Input", dismissOnEnter:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #6"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr6", placeholder: "Tape Reader 6 Input", dismissOnEnter:true}
					]},
					{kind:"moon.Divider", content:"Tape Reader #7"},
					{kind: "moon.InputDecorator", fit:true, components: [
						{kind: "moon.Input", fit:true, spotlight:true, oninput:"handleChange", onchange:"handleChange", name:"tpr7", placeholder: "Tape Reader 7 Input", dismissOnEnter:true}
					]},
					{tag:"br"},
					{tag:"br"},
					{tag:"br"},
					{kind:"moon.Button", style:"align:center;", content:"Run Tape Reader 1", ontap:"execCommands"},
					{kind: "moon.Item", content:"Copyright Justin King, 2014 under the GPLv2 License"}
				]}
			]}
		]}
	],
	handleChange: function(inSender, inEvent) {
		if(inSender.name == "tpr1") {
			curCommands = inSender.getValue().split(" ");
		}
		tpr[parseInt(inSender.name.substring(3))-1] = inSender.getValue();
		console.log(tpr+" : "+curCommands);
	},
	
	execCommands: function() {
		prevText = this.$.log.getValue();
		if(curCommands[curCommands.length -1].length != 5 && curCommands[curCommands.length -1].length != 14) {
			curTapeReader = "";
			this.$.log.setValue(prevText + "\rError: This Command must be 5 or 14 characters long");
		} else {
			curTapeReader = "";
			this.evaluate(false);
		}
		return false;
	},
			
	evaluate: function(isd8) {
		curCommands = tpr[0].split(" ");
		for(i = 0; i < curCommands.length; i++) {
			var prevText = this.$.log.getValue();
			if(isNaN(parseInt(curCommands[i]))) {
				this.$.log.setValue(prevText + '\r' + curCommands[i] + "\rError: Command(s) need to include only numbers and maybe plus signs and dashes");
			} else {
				this.$.log.setValue(prevText + '\r' + curCommands[i]);
			}
			var commandStr = curCommands[i];
			switch(commandStr[0]) {
				case "0":
					switch(commandStr[1]) {
						case "2":
							if(commandStr.substring(0, 4) == "0210" && parseInt(commandStr.substring(4, 5)) < 8) {
								
							}
						break;
					}
				break;
				case "1":
					if(commandStr.slice(0, 3) != "101") {
						var store1 = NaN;
						var store2 = NaN;
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							store2 = this.$.number1;
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							store2 = this.$.number2;
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							store2 = this.$.number3;
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							store2 = this.$.number4;
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							store2 = this.$.number5;
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							store2 = this.$.number6;
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							store2 = this.$.number7;
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							store2 = this.$.number8;
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							store2 = this.$.number9;
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							store2 = this.$.number10;
						}
						
						if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
							store1 = this.$.number1;
						} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
							store1 = this.$.number2;
						} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
							store1 = this.$.number3;
						} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
							store1 = this.$.number4;
						} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
							store1 = this.$.number5;
						} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
							store1 = this.$.number6;
						} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
							store1 = this.$.number7;
						} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
							store1 = this.$.number8;
						} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
							store1 = this.$.number9;
						} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
							store1 = this.$.number10;
						}
						if(!isNaN(store1.getContent()) && !isNaN(store2.getContent())) {
							
							store2.setContent(parseInt(store1.getContent()) + parseInt(store2.getContent()));
							if(store2.getContent().toString().length < 8) {
								if(parseInt(store1.getContent()) + store2.getContent() < 0) {
									while(store2.getContent().toString().length < 9) {
										store2.setContent("-0" + store2.getContent().toString().slice(1));
									}
								} else {
									store2.setContent("+" + store2.getContent().toString());
									while(store2.getContent().toString().length < 9) {
										store2.setContent("+0" + store2.getContent().toString().slice(1));
									}
								}
							} else { 
								if(parseInt(store1.getContent()) + store2.getContent() > 0) {
									store2.setContent("+" + store2.getContent().toString());
								}
							}
						} else {
							this.$.log.setValue(prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
					} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
						this.$.log.setValue(prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
					} else if(parseInt(commandStr.slice(3, 5)) == 9) {
						this.$.acc.setContent(commandStr.slice(5));
					} else {
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19 && this.$.number1.getContent() == 0) {
							this.$.number1.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28 && this.$.number2.getContent() == 0) {
							this.$.number2.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37 && this.$.number3.getContent() == 0) {
							this.$.number3.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46 && this.$.number4.getContent() == 0) {
							this.$.number4.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55 && this.$.number5.getContent() == 0) {
							this.$.number5.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64 && this.$.number6.getContent() == 0) {
							this.$.number6.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73 && this.$.number7.getContent() == 0) {
							this.$.number7.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82 && this.$.number8.getContent() == 0) {
							this.$.number8.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91 && this.$.number9.getContent() == 0) {
							this.$.number9.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100 && this.$.number10.getContent() == 0) {
							this.$.number10.setContent(commandStr.slice(5));
						} else {
							this.$.log.setValue(prevText + "\rError: you must define a store, by using 3**00 or 4**00. ** means the store number to clear and set to +00000000.");
						}
					}
				
				break;
				
		
				case "2":
					if(commandStr.slice(0, 3) != "201") {
						var store1 = NaN;
						var store2 = NaN;
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							store2 = this.$.number1;
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							store2 = this.$.number2;
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							store2 = this.$.number3;
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							store2 = this.$.number4;
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							store2 = this.$.number5;
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							store2 = this.$.number6;
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							store2 = this.$.number7;
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							store2 = this.$.number8;
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							store2 = this.$.number9;
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							store2 = this.$.number10;
						} else if(parseInt(commandStr.slice(3)) == 0) {
							store2 = null;
						}
						
						if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
							store1 = this.$.number1;
						} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
							store1 = this.$.number2;
						} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
							store1 = this.$.number3;
						} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
							store1 = this.$.number4;
						} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
							store1 = this.$.number5;
						} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
							store1 = this.$.number6;
						} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
							store1 = this.$.number7;
						} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
							store1 = this.$.number8;
						} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
							store1 = this.$.number9;
						} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
							store1 = this.$.number10;
						} else if(parseInt(commandStr.slice(1, 3)) == 9) {
							store1 = this.$.acc;
						}
						if(store2 == null) {
							store1.setContent("+00000000");
						} else {
							if(!isNaN(store1.getContent()) && !isNaN(store2.getContent().toString())) {
								store2.setContent(parseInt(store1.getContent()) + parseInt(store2.getContent()));
								if(store2.getContent().toString().length < 8) {
									if(parseInt(store1.getContent()) + store2.getContent() < 0) {
										while(store2.getContent().toString().length < 9) {
											store2.setContent("-0" + store2.getContent().toString().slice(1));
										}
									} else {
										store2.setContent("+" + store2.getContent().toString());
										while(store2.getContent().toString().length < 9) {
											store2.setContent("+0" + store2.getContent().toString().slice(1));
										}
									}
								} else { 
									if(parseInt(store1.getContent()) + store2.getContent() > 0) {
										store2.setContent("+" + store2.getContent().toString());
									}
								}
								store1.setContent("+00000000");
							} else {
								this.$.log.setValue(prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						}
					} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
						this.$.log.setValue(prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
					} else if(parseInt(commandStr.slice(3, 5)) == 9) {
						this.$.acc.setContent(commandStr.slice(5));
					} else {
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							this.$.number1.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							this.$.number2.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							this.$.number3.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							this.$.number4.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							this.$.number5.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							this.$.number6.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							this.$.number7.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							this.$.number8.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							this.$.number9.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							this.$.number10.setContent(commandStr.slice(5));
						}
					}
				break;
				
				
				case "3":
					if(commandStr.slice(0, 3) != "301") {
						var store1 = NaN;
						var store2 = NaN;
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							store2 = this.$.number1;
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							store2 = this.$.number2;
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							store2 = this.$.number3;
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							store2 = this.$.number4;
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							store2 = this.$.number5;
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							store2 = this.$.number6;
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							store2 = this.$.number7;
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							store2 = this.$.number8;
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							store2 = this.$.number9;
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							store2 = this.$.number10;
						}
						
						if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
							store1 = this.$.number1;
						} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
							store1 = this.$.number2;
						} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
							store1 = this.$.number3;
						} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
							store1 = this.$.number4;
						} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
							store1 = this.$.number5;
						} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
							store1 = this.$.number6;
						} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
							store1 = this.$.number7;
						} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
							store1 = this.$.number8;
						} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
							store1 = this.$.number9;
						} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
							store1 = this.$.number10;
						}
						if(!isNaN(store1.getContent()) && !isNaN(store2.getContent().toString())) {
							
							store2.setContent(parseInt(store1.getContent()) - parseInt(store2.getContent()));
							if(store2.getContent().toString().length < 8) {
								if(parseInt(store1.getContent()) - store2.getContent() < 0) {
									while(store2.getContent().toString().length < 9) {
										store2.setContent("-0" + store2.getContent().toString().slice(1));
									}
								} else {
									store2.setContent("+" + store2.getContent().toString());
									while(store2.getContent().toString().length < 9) {
										store2.setContent("+0" + store2.getContent().toString().slice(1));
									}
								}
							} else { 
								if(parseInt(store1.getContent()) + store2.getContent() > 0) {
									store2.setContent("+" + store2.getContent().toString());
								}
							}
						} else {
							this.$.log.setValue(prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
						}
					} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
						this.$.log.setValue(prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
					} else if(parseInt(commandStr.slice(3, 5)) == 9) {
						this.$.acc.setContent(commandStr.slice(5));
					} else {
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							this.$.number1.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							this.$.number2.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							this.$.number3.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							this.$.number4.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							this.$.number5.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							this.$.number6.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							this.$.number7.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							this.$.number8.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							this.$.number9.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							this.$.number10.setContent(commandStr.slice(5));
						}
					}
				
				break;
				
				case "4":
					if(commandStr.slice(0, 3) != "301") {
						var store1 = NaN;
						var store2 = NaN;
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							store2 = this.$.number1;
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							store2 = this.$.number2;
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							store2 = this.$.number3;
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							store2 = this.$.number4;
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							store2 = this.$.number5;
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							store2 = this.$.number6;
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							store2 = this.$.number7;
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							store2 = this.$.number8;
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							store2 = this.$.number9;
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							store2 = this.$.number10;
						} else if(parseInt(commandStr.slice(3, 5)) == 0) {
							store2 = null;
						}
						
						if(parseInt(commandStr.slice(1, 3)) > 9 && parseInt(commandStr.slice(1, 3)) < 19) {
							store1 = this.$.number1;
						} else if(parseInt(commandStr.slice(1, 3)) >= 19 && parseInt(commandStr.slice(1, 3)) < 28) {
							store1 = this.$.number2;
						} else if(parseInt(commandStr.slice(1, 3)) >= 28 && parseInt(commandStr.slice(1, 3)) < 37) {
							store1 = this.$.number3;
						} else if(parseInt(commandStr.slice(1, 3)) >= 37 && parseInt(commandStr.slice(1, 3)) < 46) {
							store1 = this.$.number4;
						} else if(parseInt(commandStr.slice(1, 3)) >= 46 && parseInt(commandStr.slice(1, 3)) < 55) {
							store1 = this.$.number5;
						} else if(parseInt(commandStr.slice(1, 3)) >= 55 && parseInt(commandStr.slice(1, 3)) < 64) {
							store1 = this.$.number6;
						} else if(parseInt(commandStr.slice(1, 3)) >= 64 && parseInt(commandStr.slice(1, 3)) < 73) {
							store1 = this.$.number7;
						} else if(parseInt(commandStr.slice(1, 3)) >= 73 && parseInt(commandStr.slice(1, 3)) < 82) {
							store1 = this.$.number8;
						} else if(parseInt(commandStr.slice(1, 3)) >= 82 && parseInt(commandStr.slice(1, 3)) < 91) {
							store1 = this.$.number9;
						} else if(parseInt(commandStr.slice(1, 3)) >= 91 && parseInt(commandStr.slice(1, 3)) < 100) {
							store1 = this.$.number10;
						} else if(parseInt(commandStr.slice(1, 3)) == 9) {
							store1 = this.$.acc;
						}
						if(store2 == null) {
							store1.setContent("+00000000");
						} else {
							if(!isNaN(store1.getContent()) && !isNaN(store2.getContent().toString())) {
								
							store2.setContent(parseInt(store1.getContent()) - parseInt(store2.getContent()));
								if(store2.getContent().toString().length < 8) {
									if(parseInt(store1.getContent()) - store2.getContent() < 0) {
										while(store2.getContent().toString().length < 9) {
											store2.setContent("-0" + store2.getContent().toString().slice(1));
										}
									} else {
										store2.setContent("+" + store2.getContent().toString());
										while(store2.getContent().toString().length < 9) {
											store2.setContent("+0" + store2.getContent().toString().slice(1));
										}
									}
								} else { 
									if(parseInt(store1.getContent()) + store2.getContent() > 0) {
										store2.setContent("+" + store2.getContent().toString());
									}
								}
								store1.setContent("+00000000");
							} else {
								this.$.log.setValue(prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						}
					} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
						this.$.log.setValue(prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
					} else if(parseInt(commandStr.slice(3, 5)) == 9) {
						this.$.acc.setContent(commandStr.slice(5));
					} else {
						if(parseInt(commandStr.slice(3, 5)) > 9 && parseInt(commandStr.slice(3, 5)) < 19) {
							this.$.number1.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 19 && parseInt(commandStr.slice(3, 5)) < 28) {
							this.$.number2.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 28 && parseInt(commandStr.slice(3, 5)) < 37) {
							this.$.number3.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 37 && parseInt(commandStr.slice(3, 5)) < 46) {
							this.$.number4.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 46 && parseInt(commandStr.slice(3, 5)) < 55) {
							this.$.number5.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 55 && parseInt(commandStr.slice(3, 5)) < 64) {
							this.$.number6.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 64 && parseInt(commandStr.slice(3, 5)) < 73) {
							this.$.number7.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 73 && parseInt(commandStr.slice(3, 5)) < 82) {
							this.$.number8.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 82 && parseInt(commandStr.slice(3, 5)) < 91) {
							this.$.number9.setContent(commandStr.slice(5));
						} else if(parseInt(commandStr.slice(3, 5)) >= 91 && parseInt(commandStr.slice(3, 5)) < 100) {
							this.$.number10.setContent(commandStr.slice(5));
						}
					}
				break;
			}
		}
		return false;
	},
	SaveStores: function() {
		var a = window.document.createElement('a');
		a.href = window.URL.createObjectURL(new Blob([this.$.acc.getValue()+","+this.$.number1.getValue()+","+this.$.number2.getValue()+","+this.$.number3.getValue()+","+this.$.number4.getValue()+","+this.$.number5.getValue()+","+this.$.number6.getValue()+","+this.$.number7.getValue()+","+this.$.number8.getValue()+","+this.$.number9.getValue()+","+this.$.number10.getValue()], {type: 'text/csv'}));
		a.download = 'test.csv';
	
	// Append anchor to body.
		document.body.appendChild(a)
		a.click();
		
		// Remove anchor from body
		document.body.removeChild(a)
	},

	/*uploadfile: function() {
		for(i = 0; i >= 11; i++) {
			var reader = new FileReader();
	
			reader.onload = function(e) {
			}
	
			if(i==0) {
				this.$.acc.setValue(
				fileDisplayArea.innerText = reader.result.split(",")[0];
				reader.readAsText(file);
			} else {
				this.$.number"+i).setValue(new FileReader().readAsText(document.getElementById('filepicker').files[0]).split(",")[i];
			}
		}
		
	},*/
	openWindow: function(trnum) {
		var tprWindow = window.open("tapereader.html","_blank","toolbar=no, scrollbars=no, resizable=yes, top=500, left=500, width=400, height=400");
		mainWindow = window;
		tprWindow.window.location = "tapereader.html?tpr=" + trnum;
		tprWindow.window.onload=function() {
			tprWindow.this.$.txtBox.getValue() = localStorage.getItem(trnum);
		}
		
	},
	sendTape: function() {
		var query = window.location.search;
		// Skip the leading ?, which should always be there, 
		// but be careful anyway
		if (/\?tpr=[1-7]/.exec(query.substring(0, 6))) {
			query = query.substring(5, 6);
			document.cookie = query+"="+this.$.txtBox.getValue()+'; path=./';
			window.close();
		} else {
			document.writeln("Don't change the URL. Press the back button to set it to the right URL.");
		}
	}
});