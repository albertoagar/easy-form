$(document).ready(function(){
	$('form').on('submit', function(e) {
		e.preventDefault();
		var o = $(this),
		fields = $('input',o);
		o_response = $('.js-response',o),
		jsonForm = [o.serializeObject()];
		o_response.html('');
		
		$.each(jsonForm[0],function(fieldName,value){
			var u = $('*[name='+fieldName+']', o),
				errors='';
			
			//reset form
			u.siblings('mark').remove();
			
			if(!valid_empty(value)){valid_error(u,true);errors=form_validations.error.e000;}else{valid_error(u,false);}
			if(valid_empty(value)){
				switch(u.attr('data-validtype')){
					case '1': //Solo texto
						if(!valid_onlyText(value)){valid_error(u,true);errors=form_validations.error.e001;}else{valid_error(u,false);}
					break;
					case '2': //Textarea
						if(!valid_maxLetter(value,500)){valid_error(u,true);errors=form_validations.error.e002;}else{valid_error(u,false);}
					break;
					case '3': //email
						if(!valid_email(value)){valid_error(u,true);errors=form_validations.error.e003;}else{valid_error(u,false);}
					break;
					case '4': //fecha
						if(!valid_date(value)){valid_error(u,true);errors=form_validations.error.e004;}else{valid_error(u,false);}
					break;
				}
			}
			if(errors!=''){
				u.after('<mark>'+errors+'</mark>');
				o_response.html(form_validations.error.x000);
			}
			
		})
		
		if(!$('.js-formError',o).length){
		
			fields.each(function(){
				var u = $(this);
				switch (u.attr('name')){
					case 'email':
						email = u.val();
					break;
					case 'firstname':
						firstname = u.val();
					break;
					case 'lastname':
						lastname = u.val();
					break;
					case 'born':
						born = u.val();
					break;
				}
			});
			
			$.ajax({
				type: 'POST', 
				cache: false,
				url: "https://www.eurostarshotels.com/CLIENTES/www.eurostarshotels.com/inscripciones/formSplio/updateUserSplio.php",
				data: {
					email: email,
					firstname: firstname,
					lastname: lastname,
					born: born,
					form_validations:JSON.stringify(form_validations)
				},
				
				success: function(response){
					o[0].reset();
					$('.js-response',o).html(response);
				}, 
				error: function(error){console.log(error)},
			});
		}
	});
});



/* validador_fecha */
function valid_date(param){var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g ;if((regex.test(param))){return true;}else{return false;}}
/* validador_email */
function valid_email(param){var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;if((regex.test(param))){return true;}else{return false;}}
/* validador_telefono */
function valid_tel(param){var regex = /^[0-9-()+ ]{3,20}$/;if((regex.test(param))){return true;}else{return false;}}
/* validador_soloTexto */
function valid_onlyText(param){var regex = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/;if((regex.test(param))){return true;}else{return false;}}
//function valid_onlyNum(param){var regex = /^[0-9s]+$/;if((regex.test(param))){return true;}else{return false;}}
/* validador_vacio */
function valid_empty(param){var b = true;if(param == '' || param === 'undefined')b = false;return b;};
/* class_error */
function valid_error(e,param){param==true?e.parent('.label-field').addClass('js-formError'):e.parent('.label-field').removeClass('js-formError');};
/* máximo de caracteres */
function valid_maxLetter(e,param){var b = true;if(e.length > param)b = false;return b;};
// Form to JSON
$.fn.serializeObject = function(){var o = {},a = this.serializeArray();$.each(a, function(i,field){if(o[this.name] !== undefined){if(!o[this.name].push) {o[this.name] = [o[this.name]];}o[this.name].push(this.value || '');}else{o[this.name] = this.value || '';}});return o;};