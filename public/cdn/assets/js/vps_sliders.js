var cpu_arr = new Array('12Ghz','16Ghz','18Ghz','20Ghz','22Ghz','24Ghz','26Ghz','28Ghz');
var cpu_price_arr = new Array('89.75','120.75','130.75','150.75','160.75','170.75','180.75','190.75');
var cpu_link_arr = new Array('10','25','50','75','80','90','100','110');

var ram_arr = new Array('512','1GB','2GB','4GB','6GB','1TB','2TB','3TB');
var ram_price_arr = new Array('89.75','120.75','30.75','150.75','160.75','170.75','180.75','190.75','200.75');
var ram_link_arr = new Array('10','25','50','75','80','90','100','110','120');

var diskspace_arr = new Array('20GB','40GB','80GB','100GB','120 GB','140GB','512GB','1TB');
var disk_price_arr = new Array('89.75','120.75','130.75','150.75','160.75','170.75','180.75','190.75');
var disk_link_arr = new Array('10','25','50','75','80','100','120','140');

// This is what you want the default position to be






$(document).ready(function(){

	var calculate = function(){
		// Getting Sliders Current Location
		var CpuSlider_val=($('#sliderCpu').slider('value')-1);
		var RamSlider_val=($('#sliderRam').slider('value')-1);
		var DiskSlider_val=($('#sliderDisk').slider('value')-1);
		
		// Getting Price According Sliders Current Location
		var cpu_price= cpu_price_arr[CpuSlider_val];
		var ram_price= ram_price_arr[RamSlider_val];
		var disk_price= disk_price_arr[DiskSlider_val];
		
		// Calculate Total of all Sliders
		var total = parseFloat(cpu_price) + parseFloat(ram_price)+ parseFloat(disk_price);
		$('.slider-container #price_val').html(total);
		
		var b_url = 'https://www.your-domain.com/?cmd=cart&action=add&disk='+disk_link_arr[DiskSlider_val]+'&ram='+ram_link_arr[RamSlider_val]+'&cpu='+cpu_link_arr[CpuSlider_val];
		$('.slider-container a#orderbtn_tab').attr('href', b_url);
	}
	$( "#sliderCpu" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		paddingMin: 75,
		paddingMax: 75,		
		slide: function( event, ui ) {
			$('.slider-container #cpu_val').html(cpu_arr[ui.value-1]);		
			calculate();
			
		}
	});
	
	$( "#sliderRam" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		value:0,
		paddingMin: 75,
		paddingMax: 75,		
		slide: function( event, ui ) {
			$('.slider-container #ram_val').html(ram_arr[ui.value-1]);		
			calculate();
		}
		
	});
	
	$( "#sliderDisk" ).slider({
		range: 'min',
		animate: true,
		min: 1,
		max: 8,
		paddingMin: 75,
		paddingMax: 75,		
		slide: function( event, ui ) {
			$('.slider-container #storage_val').html(diskspace_arr[ui.value-1]);		
			calculate();
		}
	});		
	
	$('#sliderCpu').slider('value', 3);
	$('#sliderRam').slider('value', 2);
	$('#sliderDisk').slider('value', 4);
	$('.slider-container #cpu_val').html(cpu_arr[($('#sliderCpu').slider('value')-1)]);
	$('.slider-container #ram_val').html(ram_arr[($('#sliderRam').slider('value')-1)]);
	$('.slider-container #storage_val').html(diskspace_arr[($('#sliderDisk').slider('value')-1)]);
	calculate();
	
});