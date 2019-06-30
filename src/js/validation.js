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
				maxlength: 16
			},
			expmonth: {
				required: true,
				maxlength: 2
			},
			expyear: {
				required: true,
				maxlength: 2
			},

			cvv: {
				required: true,
				number: true,
				maxlength: 4
			},

			zipcode: {
				required: true,
				number: true,
				maxlength: 5
			}
		},
		messages: {
			firstname: {
				required: 'Required field. Cant be empty'
			},
			lastname: {
				required: 'Required field. Cant be empty'
			}
		}
	});
});
