$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/* Fire Valaidate */
$(document).ready(function(){
	// Setup form validation on the #register-form element
    $("#email-form").validate({
    
        // Specify the validation rules
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        
        // Specify the validation error messages
        messages: {
            name: "Please enter your name",
            message: "Please enter your message",
            email: "Please enter a valid email address",
        },
        
        submitHandler: function(form) {
            var form = $("#email-form").serializeObject();
            
            $.ajax({
              url: "//formspree.io/admin@symphonia.io", 
              method: "POST",
              data: form,
              dataType: "json",
              success: function () {
				  $("#email-form")[0].reset()
				  setTimeout(function(){
                    $("#email-message").text("Thank you for your message!")
                  }, 2500);
			  },
			  error: function () {
				  setTimeout(function(){
                    $("#email-message").text("Something went wrong! Sorry for the inconvenience.")
                  }, 2500);
			  }
            });
        }
    });
});
