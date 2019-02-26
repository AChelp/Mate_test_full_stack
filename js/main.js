//datepicker

$(function() {
	$('input[name="Birthday"]').daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		autoUpdateInput: false,
		minYear: 1910,
		maxYear: 2001,
		startDate: "12/03/1989",
	}, );
	$('input[name="Birthday"]').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('DD.MM.YYYY'));
	});
	$('input[name="Birthday"]').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});
});


//validation block

var form = document.getElementById('form'); //form 
var inputs = document.querySelectorAll('.inputs'); //all inputs
var radio = document.getElementsByName('gender'); //radiobuttons
var sex = document.getElementById('sex'); //radiobuttons container
var emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g; //email
var textRegExp = /\'|\"/g; //text
var pattern = {
	text: textRegExp,
	email: emailRegExp,
};
var mistakes = 0;

//empty fields finder
var findEmptyFields = function(event) {
	for (var i = 0; i < inputs.length - 1; i++) {
		if (!inputs[i].value) {
			event.preventDefault();
			var error = errorGenerator('Please, input your ' + inputs[i].name);
			inputs[i].parentElement.appendChild(error, inputs[i]);
			inputs[i].classList.add('inputs-invalid');
		}
	}
}

//generate errors
var errorGenerator = function(text) {
	var error = document.createElement('div');
	error.className = 'error';
	error.style.color = '#ff0000';
	error.innerHTML = text;
	mistakes++;
	return error
}

//remove errors
var errorRemover = function(event) {
	var errors = form.querySelectorAll('.error')
	for (var i = 0; i < errors.length; i++) {
		errors[i].remove();
		mistakes--;
	}
	var errorFields = form.querySelectorAll('.inputs-invalid')
	for (var j = 0; j < errorFields.length; j++) {
		errorFields[j].classList.remove('inputs-invalid');
	}
}

//radiobutton checker
var genderCheck = function(event) {
	var result = false;
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].type == "radio" && radio[i].checked) {
			result = true;
			break;
		}
	}
	if (!result) {
		event.preventDefault();
		sex.classList.add('inputs-invalid');
		var error = errorGenerator('Please, input your ' + radio[0].name);
		sex.appendChild(error, radio[0]);
	}
}

//yeah
var yeah = function(event) {
	var newErrors = form.querySelectorAll('.error')
	if (!newErrors == 0) {
		alert('Congratulation! You did it! Validation passed!');
	}
}

//cheking mail
var mailChecker = function(event) {
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].dataset.validation == 'email') {
			if (inputs[i].value) {
				if (!inputs[i].value.match(pattern[inputs[i].dataset.validation])) {
					event.preventDefault();
					var error = errorGenerator('Please, input correct ' + inputs[i].name);
					inputs[i].parentElement.appendChild(error, inputs[i]);
					inputs[i].classList.add('inputs-invalid');
				}
			}
		}
	}
}

//checking text
var textChecker = function(event) {
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].dataset.validation == 'text') {
			if (inputs[i].value) {
				if (inputs[i].value.match(pattern[inputs[i].dataset.validation])) {
					event.preventDefault();
					var error = errorGenerator('Please, input correct ' + inputs[i].name + ': do not use \' or \" symbols');
					inputs[i].parentElement.appendChild(error, inputs[i]);
					inputs[i].classList.add('inputs-invalid');
				}
			}
		}
	}
}

//validation
var checkValidation = function(event) {
	errorRemover(event);
	findEmptyFields(event);
	genderCheck(event);
	mailChecker(event);
	textChecker(event);
	if (mistakes === 0) {
		yeah();
	}
}