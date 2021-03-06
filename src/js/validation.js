$(function() {
	$('#payment-form').validate({
		rules: {
			firstname: {
				required: true
			},
			lastname: {
				required: true
			},
			cardnumber: {
				required: true,
				number: true,
				minlength: 16
			},
			expmonth: {
				required: true
			},
			expyear: {
				required: true
			},

			cvv: {
				required: true,
				number: true,
				minlength: 4
			},

			zipcode: {
				required: true,
				number: true,
				minlength: 5
			}
		},
		messages: {
			firstname: {
				required: '<b>Required field.</b> Cant be empty'
			},
			lastname: {
				required: '<b>Required field.</b> Cant be empty'
			},
			cardnumber: {
				required: '<b>Required field.</b> Cant be empty',
				minlength: 'It must be 16 characters long!'
			},
			expmonth: {
				required: '<b>Required field.</b> Cant be empty'
			},
			expyear: {
				required: '<b>Required field.</b> Cant be empty'
			},
			cvv: {
				required: '<b>Required field.<b/> Cant be empty',
				minlength: 'It must be 4 characters long!'
			},
			zipcode: {
				required: '<b>Required field.</b> Cant be empty',
				minlength: 'It must be 5 characters long!'
			}
		}
	});
});
