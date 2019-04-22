function openModal() {
    /* Note that you do NOT have to do a document.getElementById anywhere in this exercise. Use the elements below */
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");
    var match = document.getElementById("match");

  var firstName = document.getElementById("first_name");
  var lastName = document.getElementById("last_name");
  var email = document.getElementsById("email_address");
  var username = document.getElementById("username");
  var dob = document.getElementsById("date_of_birth");
  var password1 = document.getElementsById("password_first");
  var password2 = document.getElementsById("password_confirm");

	// When the user starts to type something inside the password field
	myInput.onkeyup = function() {
       console.log('helllooo')

        /* TODO: Question 1.1: Starts here */
        var lowerCaseLetters = /dummy_regex/g; // : Fill in the regular experssion for lowerCaseLetters
        var upperCaseLetters = /dummy_regex/g; // : Fill in the regular experssion for upperCaseLetters
        var numbers = /dummy_regex/g; // : Fill in the regular experssion for digits
        var minLength = 1000; // : Change the minimum length to what what it needs to be in the question
        /* TODO: Question 1.1: Ends here */


        /* TODO: Question 1.2:  Starts here */
         /*
         - So first read up on classList.
         - Perform a console.log(letter.classList) and check the array that you see. By default the first time, there should be just 1 element and it should be
         "invalid". "invalid" is a class that is present in login.css.
         - Below, there are a bunch of if blocks and else blocks.
         - Each if block means that some successful condition is satisfied for our password conditon. So the red cross need to be converted to a check mark.
         - Each else block stands for a failed condition, so the green check mark needs to be a red cross again.
         - All that you need to do is, in each of the blocks, fill in the correct classNames for the remove and the add methods.
         */

        // Validate lowercase letters
        if(myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("");
            letter.classList.add("");
        } else {
            letter.classList.remove("");
            letter.classList.add("");
        }

        // Validate capital letters
        if(myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("");
            capital.classList.add("");
        } else {
            capital.classList.remove("");
            capital.classList.add("");
        }

        // Validate numbers
        if(myInput.value.match(numbers)) {
            number.classList.remove("");
            number.classList.add("");
        } else {
            number.classList.remove("");
            number.classList.add("");
        }

        // Validate length
        if(myInput.value.length >= minLength) {
            length.classList.remove("");
            length.classList.add("");
        } else {
            length.classList.remove("");
            length.classList.add("");
        }
        /* TODO: Question 1.2:  Ends here */
    }
    /* TODO Question 1.3: Starts here */
    confirmMyInput.onkeyup = function() {
                // Validate password and confirmPassword
                var passEqualsConfPass = (false); // TODO: Change this to the condition that needs to be checked so that the text entered in password equals the text in confirm password
                if(passEqualsConfPass) {
                    match.classList.remove("");
                    match.classList.add("");
                } else {
                    match.classList.remove("");
                    match.classList.add("");
                }
    /* TODO Question 1.3: Starts here */

                // Disable or Enable the button based on the elements in classList
                enableButton(letter, capital, number, length, match);
    }
}


function enableButton(letter, capital, number, length, match) {
    // TODO: Clear this function for students to implement
    var button = document.getElementById('my_submit_button');
    var condition = (false); // TODO: Replace false with the correct condition
    if(condition) {
            button.disabled = false;
        }
    }


function onClickFunction() {
    alert("Hey! I'm all green! Well done.")
}
