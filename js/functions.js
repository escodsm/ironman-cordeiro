//escodsm.com javascript

//content accordion: section


$(document).ready(function(){

var sectionArray = new Array();
	sectionArray = ["#section_one", "#section_two", "#section_three", "#section_four"];

		for (var i=0; i <=sectionArray.length; i++){
			$(sectionArray[i]).hide();
		};
	

//button 1:
			$("#button1").click(function(){
				
				$("#section_one").slideToggle("slow");
				
				$(this).text(function(i, v){
					return v === 'Expand' ? 'Collapse' : 'Expand'
				});				

			});//button1
			
//button2:
				$("#button2").click(function(){
					
					$("#section_two").slideToggle("slow");
					
						$(this).text(function(i, v){
							return v === 'Expand' ? 'Collapse' : 'Expand'
						});					
					
				});//button2
				
//button3:
					$("#button3").click(function(){
						
						$("#section_three").slideToggle("slow");
					
							$(this).text(function(i, v){
								return v === 'Expand' ? 'Collapse' : 'Expand'
							});					
					
					});//button3
					
//button4:
						$("#button4").click(function(){
							
							$("#section_four").slideToggle("slow");
					
								$(this).text(function(i, v){
									return v === 'Expand' ? 'Collapse' : 'Expand'
								});					
					
						});//button4			
				
				
				
				

  
  
});//main jquery document ready
