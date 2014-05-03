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
var x = 0;
var i = 0;
var prevText = "";
var tpr = ["", "", "", "", "", "", ""];
var mainWindow;
var curPopupWindow = 0;

enyo.kind({
	name: "emulatorMain",
	classes:"moon enyo-unselectable enyo-fit",
	kind:"Control",
	components:[
		{kind: 'moon.Scroller', fit:true, classes: "enyo-fill", components: [
			{name: "panels", kind: "FittableColumns", pattern: "none", fit: true, style: "height:90%", components: [
		        /*{name:"panel", classes:"panels-sample-wide max-h", components: [
					{kind: 'moon.Scroller', fit:true, classes: "enyo-fill", components: [
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
						{kind:"moon.Button", style:"text-align:center; width:100%", content:"Run Tape Reader 1", ontap:"execCommands"}
					]}
				]},*/
				{name:"panel2", components: [
					{kind: "moon.Header", title: "Log", titleBelow:"Commands", fit:true},
					{kind: 'moon.Scroller', fit:true, horizontal:"hidden", classes: "enyo-fill", components: [
						{kind: "moon.InputDecorator", fit:true, classes:"closetohundred", style:"height:410px;", fit:true, components: [
							{kind: "moon.TextArea", name:"log", classes:"enyo-fill", disabled: true, spotlight:false, value:"WITCH-E v1.0.0", fit:true}
						]}
					]},
					{tag:"br"},
					{tag:"br"},
					{tag:"br"}
				]},/*
				{name:"panel3", components: [
					{kind: "moon.Header", title: "Printer", titleBelow:"Out it goes!", fit:true},
					{kind: "moon.InputDecorator", fit:true, classes:"enyo-fill", style:"height:500px;", fit:true, components: [
							{kind: "moon.TextArea", name:"log", classes:"enyo-fill", disabled: true, spotlight:false, value:"Ready to print", fit:true}
						]},
					
				]}*/
				{name:"panel4", kind:"FittableRows", classes:"tapereaderpanel", components: [
					{kind: "moon.Header", title: "Tape Readers", titleBelow:"Write on them!", fit:true},
					{kind:"FittableColumns", style:"height:356px;", components:[
					{name:"num1", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #1"},
					{name:"num2", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #2"},
					{name:"num3", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #3"}/*,
					{name:"num4", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #4"},
					{name:"num5", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #5"},
					{name:"num6", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #6"},
					{name:"num7", classes:"tapereaderimage samplebox", source: "images/tapereader.png", onclick:"showPopup", content:"Edit Tape Reader #7"}*/
					]},
					{tag:"br"},
					{kind:"FittableColumns", style:"height:50px; width:128px", components:[
						{name:"button1", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"execCommands", content:"Run Tape Reader #1"},
						{name:"button2", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"", content:"Run Tape Reader #2"},
						{name:"button3", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"", content:"Run Tape Reader #3"}/*,
						{name:"button4", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"", content:"Run Tape Reader #4"},
						{name:"button5", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"", content:"Run Tape Reader #5"},
						{name:"button6", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"", content:"Run Tape Reader #6"},
						{name:"button7", classes:"fontsize mouseover enyo-fill", fit: true, onclick:"", content:"Run Tape Reader #7"}*/
					]}
				]}
			]},
			{kind:"moon.Button", style:"text-align:center; width:100%", content:"Open Stores", ontap:"storesPopup"},
			{kind:"moon.Item", content:"Copyright Justin King, 2014 under the GPLv2 License"},
			
			
			
			
			{name: "storesPopup", kind: "moon.Popup", floating:true, components: [
				{kind: "moon.Divider", name:"thedivider", content: "Stores"},
				{classes: "moon-hspacing", components: [
					{kind: 'moon.Scroller', fit:true, vertical:"hidden", classes: "enyo-fill", components: [
						{kind:"FittableColumns", style:"height:700px; width:100%", components:[
							{name:"column2", kind:"FittableRows", components: [
								{content:"", classes:"tblcell"},
								{content:"10", classes:"tblcell"},
								{content:"20", classes:"tblcell"},
								{content:"30", classes:"tblcell"},
								{content:"40", classes:"tblcell"},
								{content:"50", classes:"tblcell"},
								{content:"60", classes:"tblcell"},
								{content:"70", classes:"tblcell"},
								{content:"80", classes:"tblcell"},
								{content:"90", classes:"tblcell"}
							]},
							{name:"column2", kind:"FittableRows", components: [
									{content:"0", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"100", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"101", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"102", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"103", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"104", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"105", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"106", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"107", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"108", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"200", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"201", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"202", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"203", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"204", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"205", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"206", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"207", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"208", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"300", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"301", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"302", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"303", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"304", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"305", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"306", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"307", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"308", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"400", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"401", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"402", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"403", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"404", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"405", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"406", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"407", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"408", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"500", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"501", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"502", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"503", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"504", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"505", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"506", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"507", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"508", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"600", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"601", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"602", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"603", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"604", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"605", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"606", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"607", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"608", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"700", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"701", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"702", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"703", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"704", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"705", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"706", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"707", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"708", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"800", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"801", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"802", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"803", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"804", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"805", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"806", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"807", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"808", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"900", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"901", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"902", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"903", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"904", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"905", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"906", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"907", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"908", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column3", kind:"FittableRows", components: [
									{content:"1", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"110", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"111", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"112", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"113", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"114", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"115", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"116", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"117", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"118", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"210", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"211", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"212", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"213", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"214", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"215", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"216", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"217", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"218", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"310", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"311", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"312", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"313", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"314", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"315", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"316", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"317", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"318", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"410", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"411", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"412", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"413", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"414", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"415", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"416", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"417", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"418", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"510", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"511", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"512", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"513", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"514", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"515", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"516", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"517", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"518", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"610", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"611", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"612", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"613", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"614", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"615", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"616", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"617", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"618", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"710", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"711", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"712", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"713", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"714", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"715", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"716", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"717", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"718", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"810", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"811", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"812", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"813", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"814", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"815", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"816", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"817", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"818", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"910", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"911", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"912", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"913", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"914", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"915", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"916", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"917", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"918", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column4", kind:"FittableRows", components: [
									{content:"2", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"120", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"121", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"122", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"123", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"124", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"125", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"126", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"127", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"128", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"220", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"221", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"222", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"223", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"224", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"225", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"226", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"227", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"228", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"320", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"321", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"322", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"323", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"324", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"325", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"326", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"327", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"328", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"420", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"421", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"422", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"423", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"424", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"425", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"426", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"427", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"428", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"520", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"521", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"522", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"523", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"524", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"525", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"526", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"527", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"528", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"620", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"621", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"622", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"623", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"624", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"625", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"626", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"627", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"628", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"720", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"721", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"722", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"723", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"724", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"725", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"726", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"727", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"728", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"820", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"821", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"822", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"823", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"824", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"825", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"826", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"827", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"828", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"920", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"921", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"922", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"923", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"924", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"925", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"926", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"927", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"928", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column5", kind:"FittableRows", components: [
									{content:"3", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"130", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"131", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"132", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"133", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"134", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"135", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"136", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"137", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"138", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"230", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"231", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"232", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"233", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"234", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"235", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"236", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"237", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"238", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"330", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"331", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"332", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"333", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"334", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"335", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"336", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"337", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"338", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"430", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"431", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"432", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"433", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"434", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"435", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"436", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"437", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"438", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"530", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"531", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"532", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"533", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"534", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"535", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"536", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"537", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"538", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"630", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"631", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"632", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"633", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"634", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"635", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"636", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"637", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"638", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"730", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"731", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"732", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"733", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"734", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"735", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"736", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"737", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"738", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"830", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"831", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"832", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"833", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"834", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"835", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"836", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"837", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"838", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"930", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"931", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"932", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"933", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"934", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"935", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"936", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"937", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"938", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column6", kind:"FittableRows", components: [
									{content:"4", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"140", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"141", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"142", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"143", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"144", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"145", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"146", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"147", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"148", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"240", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"241", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"242", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"243", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"244", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"245", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"246", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"247", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"248", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"340", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"341", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"342", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"343", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"344", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"345", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"346", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"347", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"348", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"440", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"441", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"442", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"443", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"444", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"445", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"446", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"447", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"448", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"540", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"541", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"542", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"543", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"544", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"545", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"546", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"547", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"548", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"640", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"641", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"642", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"643", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"644", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"645", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"646", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"647", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"648", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"740", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"741", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"742", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"743", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"744", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"745", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"746", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"747", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"748", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"840", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"841", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"842", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"843", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"844", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"845", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"846", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"847", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"848", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"940", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"941", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"942", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"943", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"944", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"945", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"946", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"947", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"948", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column7", kind:"FittableRows", components: [
									{content:"5", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"150", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"151", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"152", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"153", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"154", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"155", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"156", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"157", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"158", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"250", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"251", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"252", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"253", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"254", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"255", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"256", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"257", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"258", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"350", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"351", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"352", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"353", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"354", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"355", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"356", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"357", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"358", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"450", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"451", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"452", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"453", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"454", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"455", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"456", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"457", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"458", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"550", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"551", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"552", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"553", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"554", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"555", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"556", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"557", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"558", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"650", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"651", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"652", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"653", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"654", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"655", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"656", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"657", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"658", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"750", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"751", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"752", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"753", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"754", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"755", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"756", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"757", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"758", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"850", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"851", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"852", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"853", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"854", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"855", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"856", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"857", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"858", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"950", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"951", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"952", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"953", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"954", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"955", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"956", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"957", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"958", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column8", kind:"FittableRows", components: [
									{content:"6", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"160", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"161", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"162", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"163", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"164", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"165", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"166", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"167", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"168", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"260", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"261", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"262", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"263", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"264", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"265", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"266", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"267", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"268", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"360", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"361", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"362", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"363", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"364", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"365", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"366", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"367", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"368", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"460", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"461", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"462", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"463", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"464", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"465", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"466", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"467", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"468", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"560", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"561", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"562", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"563", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"564", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"565", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"566", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"567", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"568", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"660", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"661", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"662", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"663", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"664", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"665", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"666", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"667", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"668", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"760", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"761", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"762", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"763", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"764", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"765", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"766", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"767", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"768", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"860", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"861", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"862", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"863", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"864", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"865", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"866", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"867", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"868", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"960", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"961", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"962", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"963", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"964", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"965", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"966", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"967", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"968", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column9", kind:"FittableRows", components: [
									{content:"7", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"170", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"171", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"172", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"173", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"174", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"175", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"176", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"177", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"178", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"270", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"271", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"272", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"273", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"274", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"275", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"276", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"277", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"278", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"370", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"371", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"372", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"373", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"374", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"375", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"376", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"377", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"378", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"470", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"471", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"472", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"473", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"474", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"475", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"476", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"477", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"478", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"570", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"571", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"572", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"573", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"574", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"575", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"576", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"577", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"578", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"670", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"671", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"672", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"673", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"674", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"675", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"676", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"677", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"678", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"770", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"771", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"772", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"773", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"774", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"775", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"776", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"777", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"778", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"870", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"871", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"872", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"873", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"874", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"875", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"876", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"877", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"878", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"970", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"971", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"972", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"973", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"974", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"975", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"976", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"977", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"978", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column10", kind:"FittableRows", components: [
									{content:"8", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"180", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"181", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"182", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"183", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"184", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"185", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"186", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"187", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"188", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"280", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"281", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"282", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"283", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"284", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"285", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"286", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"287", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"288", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"380", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"381", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"382", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"383", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"384", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"385", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"386", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"387", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"388", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"480", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"481", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"482", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"483", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"484", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"485", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"486", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"487", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"488", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"580", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"581", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"582", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"583", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"584", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"585", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"586", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"587", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"588", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"680", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"681", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"682", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"683", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"684", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"685", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"686", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"687", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"688", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"780", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"781", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"782", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"783", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"784", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"785", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"786", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"787", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"788", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"880", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"881", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"882", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"883", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"884", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"885", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"886", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"887", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"888", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"980", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"981", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"982", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"983", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"984", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"985", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"986", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"987", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"988", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]},
								{name:"column11", kind:"FittableRows", components: [
									{content:"9", classes:"tblcell"},
									{classes:"dekcell", components:[
										{name:"190", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"191", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"192", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"193", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"194", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"195", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"196", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"197", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"198", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"290", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"291", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"292", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"293", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"294", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"295", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"296", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"297", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"298", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									]},
									{classes:"dekcell", components:[
										{name:"390", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"391", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"392", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"393", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"394", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"395", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"396", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"397", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"398", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"490", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"491", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"492", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"493", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"494", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"495", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"496", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"497", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"498", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"590", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"591", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"592", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"593", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"594", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"595", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"596", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"597", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"598", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
										
									]},
									{classes:"dekcell", components:[
										{name:"690", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"691", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"692", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"693", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"694", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"695", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"696", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"697", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"698", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"790", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"791", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"792", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"793", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"794", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"795", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"796", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"797", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"798", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"890", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"891", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"892", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"893", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"894", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"895", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"896", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"897", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"898", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]},
									{classes:"dekcell", components:[
										{name:"990", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"991", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"992", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"993", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"994", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"995", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"996", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"997", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"},
										{name:"998", kind:"Image", src:"images/dummy.png", style:"height:50%; vertical-align:middle;"}
									
									]}
								]}
		
						]}
					]}
				]}
			]},
			
			
			
			
			{name: "buttonPopup", kind: "moon.Popup", floating:true, components: [
				{kind: "moon.Divider", name:"thedivider", content: "Buttons in popup example"},
				{classes: "moon-hspacing", components: [
					{kind: "moon.InputDecorator", style:"width:80%", components: [
						{name:"code", kind: "moon.Input", classes:"ahundredp", placeholder: "Type codes here", oninput:"handleChange", onchange:"handleChange"}
					]},
					{kind: "moon.Button", content: "Done", style:"width:20%", onclick:"hidePopup"}
				]}
			]}
		]}
	],
	
	
	
	
	showPopup: function(inSender, inEvent) {
		curPopupWindow = parseInt(inSender.getName().substring(3));
		this.$.thedivider.setContent("Tape Reader #"+inSender.getName().substring(3));
		this.$.code.setValue(tpr[curPopupWindow-1]);
		this.$.buttonPopup.show();
	},
	hidePopup: function(inSender, inEvent) {
		tpr[curPopupWindow-1] = this.$.code.getValue();
		this.$.buttonPopup.hide();
	},
	storesPopup: function() {
		this.$.storesPopup.show();
	},
	hideStores: function() {
		this.$.storesPopup.hide();
	},
	handleChange: function(inSender, inEvent) {
		if(inSender.name == "tpr1") {
			curCommands = inSender.getValue().split(" ");
		}
		tpr[parseInt(inSender.name.substring(3))-1] = inSender.getValue();
		console.log(tpr+" : "+curCommands);
	},
	
	execCommands: function() {
		curCommands = tpr[0].split(" ");
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
		for(z = 0; z < curCommands.length; z++) {
			var prevText = this.$.log.getValue();
			if(isNaN(parseInt(curCommands[z]))) {
				this.$.log.setValue(prevText + '\r' + curCommands[z] + "\rError: Command(s) need to include only numbers and maybe plus signs and dashes");
			} else {
				this.$.log.setValue(prevText + '\r' + curCommands[z]);
			}
			var commandStr = curCommands[z];
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
					var overflow = 0;
					if(this.$[commandStr.slice(3, 5)+"0"].getSrc() != "images/dummy.png") {
						this.$[commandStr.slice(3, 5)+"0"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"1"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"2"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"3"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"4"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"5"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"6"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"7"].setSrc("images/dekani.gif");
						this.$[commandStr.slice(3, 5)+"8"].setSrc("images/dekani.gif");
					}
					
					for(var i = 0; i<9; i++) {
						if(commandStr.slice(0, 3) != "101") {
							var store1 = parseInt(this.$[commandStr.slice(0, 3)+(9-i)].getSrc().slice(10, 11));
							var store2 = parseInt(this.$[commandStr.slice(3, 5)+(9-i)].getSrc().slice(10, 11));
							
							if(this.$[commandStr.slice(1, 3)+"0"].getSrc() != "images/dummy.png" && this.$[commandStr.slice(3, 5)+"0"].getSrc() != "images/dummy.png") {
								if(parseInt(this.$[commandStr.slice(1, 3)+"0"].getSrc().slice(10, 11)) == 0) {
									if(parseInt(this.$[commandStr.slice(3, 5)+"9"].getSrc().slice(10, 11)) == 0) {
										var runningTotal = (parseInt(this.$[commandStr.slice(3, 5)+(9-i)].getSrc().slice(10, 11))+parseInt(this.$[commandStr.slice(3, 5)+(9-i)].getSrc().slice(10, 11)));
										if(i == 8) {
											this.$[commandStr.slice(3, 5)+"0"].setSrc("images/dek0.gif");
										} else {
											this.$[commandStr.slice(3, 5)+(9-i)].setSrc("images/dek"+(runningTotal+overflow).toString()[(runningTotal+overflow).toString().length-1]+".png");
											if(runningTotal+overflow > 9) {
												overflow = 1;
											} else {
												overflow = 0;
											}
										}
									} else {
										if(i == 0) {
											
											if(abs(store1) < abs(store2)) {
												this.$[commandStr.slice(3, 5)+"9"].setSrc("images/dek"+(9-parseInt(this.$[commandStr.slice(3, 5)+"9"].getSrc().slice(10, 11)))+".png");
											}
										} else if(i == 8) {
											
										} else {
											if(abs(store1) < abs(store2)) {
												
											}
										}
									}
									
								} else {
									if(store2 == 0) {
										
									} else {
										
									}
								}
								
								//if(overflow
								
							} else {
								this.$.log.setValue(prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						} else if((parseInt(commandStr.slice(3, 5)) - 10)/9 < 0 && commandStr.slice(3, 5) != "09") {
							this.$.log.setValue(prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
						} else if(parseInt(commandStr.slice(3, 5)) == 9) {
							this.$.acc.setContent(commandStr.slice(5));
						} else {
							if(this.$[commandStr.slice(3, 5)+"0"].getSrc() != "images/dummy.png") {
								if(this.$[commandStr.slice(3, 5)+"0"].getSrc().slice(10, 11) == "0") {
									var s1 = parseInt(this.$[commandStr.slice(3, 5)+"1"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"2"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"3"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"4"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"5"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"6"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"7"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"8"].getSrc().slice(10, 11));
								} else {
									var s1 = parseInt("-"+this.$[commandStr.slice(3, 5)+"1"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"2"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"3"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"4"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"5"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"6"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"7"].getSrc().slice(10, 11) + this.$[commandStr.slice(3, 5)+"8"].getSrc().slice(10, 11));
								}
								var curNum = parseInt(commandStr.slice(5));
								if(curNum >= 0) {
									var curStr = "0"+curNum.toString();
									while(curStr.length < 9) {
										curStr = "0"+curStr;
									}
								}
								else {
									var curStr = "9"+curNum.toString().slice(1);
									while(curStr.length < 9) {
										curStr = "90"+curStr.slice(1);
									}
								}
								
								console.log(curStr);
								if(i == 0) {
									if (commandStr.slice(5, 6) == "-") this.$[commandStr.slice(3, 5)+i].setSrc("images/dek9.png");
									else this.$[commandStr.slice(3, 5)+i].setSrc("images/dek0.png");
								} else {
									if(curStr.length < 9 && 9-i-1 > curStr.length) {
										this.$[commandStr.slice(3, 5)+i].setSrc("images/dek0.png");
									} else {
										this.$[commandStr.slice(3, 5)+i].setSrc("images/dek"+curStr[i]+".png");
									}
								}
							}
						}
					}
				
				break;
				
		
				case "2":
					if(commandStr.slice(0, 1) != "2" && commandStr.slice(3, 5) != "00") {
						var store1 = this.$[commandStr.slice(0, 3)];
						var store2 = this.$[commandStr.slice(3, 5)];
						
						if(store2 == null) {
							this.$[commandStr.slice(0, 3)+i].setSrc("images/dek0.png")
						} else {
							if(!isNaN(this.$[commandStr.slice(0, 3)].getSrc()) && !isNaN(store2.getContent().toString())) {
								store2.setContent(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) + parseInt(store2.getContent()));
								if(store2.getContent().toString().length < 8) {
									if(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) + store2.getContent() < 0) {
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
									if(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) + store2.getContent() > 0) {
										store2.setContent("+" + store2.getContent().toString());
									}
								}
								this.$[commandStr.slice(1, 3)+i].setSrc("images/dek0.png")
							} else {
								this.$.log.setValue(prevText + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
							}
						}
					} else if((parseInt(commandStr.slice(1, 3)) - 10)/9 < 0 && commandStr.slice(1, 3) != "09") {
						this.$.log.setValue(prevText + "\rError: The store " + commandStr.slice(3, 5) + " is invalid. Please send to another store. Substitute \"" + commandStr.slice(3, 5) + "\" with \"09-10-99\"");
					} else if(parseInt(commandStr.slice(1, 3)) == 9) {
						this.$.acc.setContent(commandStr.slice(5));
					} else {
						this.$[commandStr.slice(1, 3)+"0"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"1"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"2"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"3"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"4"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"5"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"6"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"7"].setSrc("images/dek0.png");
						this.$[commandStr.slice(1, 3)+"8"].setSrc("images/dek0.png");
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
						if(!isNaN(this.$[commandStr.slice(0, 3)].getSrc()) && !isNaN(store2.getContent().toString())) {
							
							store2.setContent(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) - parseInt(store2.getContent()));
							if(store2.getContent().toString().length < 8) {
								if(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) - store2.getContent() < 0) {
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
								if(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) + store2.getContent() > 0) {
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
							this.$[commandStr.slice(0, 3)+i].setSrc("images/dek0.png")
						} else {
							if(!isNaN(this.$[commandStr.slice(0, 3)].getSrc()) && !isNaN(store2.getContent().toString())) {
								
							store2.setContent(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) - parseInt(store2.getContent()));
								if(store2.getContent().toString().length < 8) {
									if(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) - store2.getContent() < 0) {
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
									if(parseInt(this.$[commandStr.slice(0, 3)].getSrc()) + store2.getContent() > 0) {
										store2.setContent("+" + store2.getContent().toString());
									}
								}
								this.$[commandStr.slice(0, 3)+i].setSrc("images/dek0.png")
							} else {
								this.$.log.setValue(this.$.log.getValue() + "\rError: you must pick a defined store, or the accumulator. Valid stores are 09-99.");
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