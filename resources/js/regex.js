$(document).ready(function() {
    // all custom jQuery will go here
	var lowercaseletters = /[a-z]/g;
	var uppercaseletters = /[A-Z]/g;
	var numbers = /[0-9]/g;
	var minLength = 8; 

	$("#psw").keyup(function(){
		var password = document.getElementById("psw");
		if(password.value.match(lowercaseletters)) {
			letter.classList.remove("invalid");
			letter.classList.add("valid");
		}
		else{
			letter.classList.remove("valid");
			letter.classList.add("invalid");
		}
		if(password.value.match(uppercaseletters)) {
			capital.classList.remove("invalid");
			capital.classList.add("valid");
		}
		else{
			capital.classList.remove("valid");
			capital.classList.add("invalid");
		}
		if(password.value.match(numbers)) {
			number.classList.remove("invalid");
			number.classList.add("valid");
		}
		else{
			number.classList.remove("valid");
			number.classList.add("invalid");
		}
		if(password.value.length >= minLength) {
			plength.classList.remove("invalid");
			plength.classList.add("valid");
		}
		else{
			plength.classList.remove("valid");
			plength.classList.add("invalid");
		}
	});
	$("#cpsw").keyup(function(){
		var cpass = document.getElementById("cpsw")
		if(psw.value == cpsw.value){
			var passEqualconf = true;
		}
		else{
			passEqualconf = false;
		}
		if(passEqualconf){
			match.classList.remove("invalid"); 
			match.classList.add("valid"); 
		}
		else{
	        match.classList.remove("valid"); 
            match.classList.add("invalid"); 
		}

		enableButton(letter, capital, number, length, match);
	})

	function enableButton(letter, capital, number, length, match) {
    // TODO: Clear this function for students to implement    
    var button = document.getElementById('my_submit_button');
    if((match.classList.value == "valid")&&(letter.classList.value == "valid")&&(capital.classList.value == "valid")&&(number.classList.value == "valid")&&(plength.classList.value == "valid")){
        condition = true;
    }
    else{false;} // TODO: Replace false with the correct condition
    if(condition) {       
            button.disabled = false;
        }        
    else{
        button.disabled = true;
    }
    }    
});



