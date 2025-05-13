var cpu_arr3 = new Array('2.2GHz','2.4GHz','2.6GHz','2.8GHz','3.0GHz','3.2GHz','3.4GHz','3.6GHz');
var cpu_price_arr3 = new Array('89.75','120.75','130.75','150.75','160.75','170.75','180.75','190.75');
var cpu_link_arr3 = new Array('10','25','50','75','80','90','100','110');

var ram_arr3 = new Array('512','1GB','2GB','4GB','6GB','1TB','2TB','3TB');
var ram_price_arr3 = new Array('89.75','120.75','30.75','150.75','160.75','170.75','180.75','190.75','200.75');
var ram_link_arr3 = new Array('10','25','50','75','80','90','100','110','120');

var diskspace_arr3 = new Array('60GB','80GB','100GB','120GB','140GB','160GB','512GB','1TB');
var disk_price_arr3 = new Array('89.75','120.75','130.75','150.75','160.75','170.75','180.75','190.75');
var disk_link_arr3 = new Array('10','25','50','75','80','100','120','140');

// This is what you want the default position to be



$(document).ready(function(){

	var calculate3 = function(){
		// Getting Sliders Current Location
		var CpuSlider_val=($('#sliderCpu3').slider('value')-1);
		var RamSlider_val=($('#sliderRam3').slider('value')-1);
		var DiskSlider_val=($('#sliderDisk3').slider('value')-1);
		
		// Getting Price According Sliders Current Location
		var cpu_price= cpu_price_arr3[CpuSlider_val];
		var ram_price= ram_price_arr3[RamSlider_val];
		var disk_price= disk_price_arr3[DiskSlider_val];
		
		// Calculate Total of all Sliders
		var total = parseFloat(cpu_price) + parseFloat(ram_price)+ parseFloat(disk_price);
		$('.slider-container #price_val3').html(total);
		
		var b_url = 'https://akdesigner.com/whmcs-templates/index.php?systpl=Natix-Host&cmd=cart&action=add&disk='+disk_link_arr3[DiskSlider_val]+'&ram='+ram_link_arr3[RamSlider_val]+'&cpu='+cpu_link_arr3[CpuSlider_val];
		$('.slider-container a#orderbtn_tab3').attr('href', b_url);
	}
	$( "#sliderCpu3" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		paddingMin: 75,
		paddingMax: 75,		
		change: function( event, ui ) {
			$('.slider-container #cpu_val3').html(cpu_arr3[ui.value-1]);		
			calculate3();
			
		}
	});
	
	$( "#sliderRam3" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		value:0,
		paddingMin: 75,
		paddingMax: 75,		
		change: function( event, ui ) {
			$('.slider-container #ram_val3').html(ram_arr3[ui.value-1]);		
			calculate3();
		}
		
	});
	
	$( "#sliderDisk3" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		paddingMin: 75,
		paddingMax: 75,		
		change: function( event, ui ) {
			$('.slider-container #storage_val3').html(diskspace_arr3[ui.value-1]);		
			calculate3();
		}
	});		
	
	$('#sliderCpu3').slider('value', 4);
	$('#sliderRam3').slider('value', 5);
	$('#sliderDisk3').slider('value', 6);
	$('.slider-container #cpu_val3').html(cpu_arr3[($('#sliderCpu3').slider('value')-1)]);
	$('.slider-container #ram_val3').html(ram_arr3[($('#sliderRam3').slider('value')-1)]);
	$('.slider-container #storage_val3').html(diskspace_arr3[($('#sliderDisk3').slider('value')-1)]);
	calculate3();
	
});// JavaScript Document