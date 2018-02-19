/*
easyform v1.0
by Alberto Aragonés
*/

$(document).ready(function(){

	(function(easyform){
		
		(function(cal){
			cal.attr('readonly',true);
			dp_type=cal.data('ef-dp-type');
			if(dp_type!=''){
				switch(dp_type){
					case 'untiltoday':
						datepicker_prop = {
							'minDate':'-100y',
							'maxDate':'0',
							'dateFormat':'dd/mm/yy'
						};
						break;
					case 'sincetoday':
						datepicker_prop = {
							'minDate':'0',
							'maxDate':'+100y',
							'dateFormat':'dd/mm/yy'
						};
						break;
					default:
						datepicker_prop = {
							'minDate':'0',
							'maxDate':'',
							'dateFormat':'dd/mm/yy'
						};
						break;
				}
			}
			cal.datepicker({
				minDate: datepicker_prop.minDate,
				maxDate: datepicker_prop.maxDate,
				dateFormat: datepicker_prop.dateFormat}
			);
		}($("[data-ef-dp-type]",easyform)));
		
		form_validations=form_validations[$('html').attr('lang')];

		easyform.on('submit',function(e) {
			e.preventDefault();
			var o = $(this),
			fields = $(['input',o],['textarea',o]);
			o_response = $('.ef-response',o),
			o_response.html('');
			response_type='';
			response_code='';
			
			jsonForm = [o.serializeObject()];		
			
			$.each(jsonForm[0],function(fieldName,value){
				var u = $('*[name='+fieldName+']', o),
					errors='';
				
				$('+ef-error',u).remove();
				
				has_valids = String(u.data('ef-valid-type'));
				if(has_valids){
					if(has_valids.search('required')>0){
						if(!valid_empty(value)){valid_error(u,true);errors=form_validations.error.e000;}else{valid_error(u,false);}
					}
				}
				
				if(valid_empty(value)){

					switch(u.data('ef-valid-type').split('_')[0]){
						case 'onlytext':
							if(!valid_onlyText(value)){valid_error(u,true);errors=form_validations.error.e001;}else{valid_error(u,false);}
						break;
						case 'onlynumber':
							if(!valid_maxLetter(value)){valid_error(u,true);errors=form_validations.error.e006;}else{valid_error(u,false);}
						break;
						case 'date':
							if(!valid_date(value)){valid_error(u,true);errors=form_validations.error.e004;}else{valid_error(u,false);}
						break;
						case 'email':
							if(!valid_email(value)){valid_error(u,true);errors=form_validations.error.e003;}else{valid_error(u,false);}
						break;
						case 'tel':
							if(!valid_tel(value)){valid_error(u,true);errors=form_validations.error.e005;}else{valid_error(u,false);}
						break;
						case 'maxletter':
							if(parseInt(u.data('ef-valid-type').split('_')[1])>0){
								limit=parseInt(u.data('ef-valid-type').split('_')[1]);
							}
							if(!valid_maxLetter(value,limit)){valid_error(u,true);errors=form_validations.error.e002(limit);}else{valid_error(u,false);}
						break;
					}
				}

				if(errors!=''){
					u.after('<ef-error>'+errors+'</ef-error>');
				}
				
			})

			if($('.ef-formError',o).length){
				response_type = 'error';
				response_code ='x000';
			}else{
				response_type = 'success';
				switch(easyform.data('ef-form-type')){
					case 'ajaxcall':
						action=easyform.attr('action');
						if(action){
							$.ajax({
								type: 'POST', 
								cache: false,
								url: action,
								data: '',
								success: function(response){
									response_code=response;
									o[0].reset();
								}, 
								error: function(error){
									response_type = 'error';
									response_code='x001';
									console.log(error);
								},
							});
						}
						break;
							response = efOwnFunction();
							response_type = response.type;
							response_code = response.code;
							if(response_type!='success'){
								o[0].reset();
							}
						break;
				}
			}
			if(response_type=='success'){o_response.addClass('ef-success').css('color','green')}else{o_response.css('color','red').addClass('ef-error')}
			o_response.html(form_validations[response_type][response_code]);
		});

		function valid_empty(param){var b = true;if(param == '' || param === 'undefined')b = false;return b;};
		function valid_onlyText(param){var regex = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/;if((regex.test(param))){return true;}else{return false;}}
		//function valid_onlyNum(param){var regex = /^[0-9s]+$/;if((regex.test(param))){return true;}else{return false;}}
		function valid_date(param){var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g ;if((regex.test(param))){return true;}else{return false;}}
		function valid_email(param){var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;if((regex.test(param))){return true;}else{return false;}}
		function valid_tel(param){var regex = /^[0-9-()+ ]{3,20}$/;if((regex.test(param))){return true;}else{return false;}}
		function valid_maxLetter(e,param){var b = true;if(e.length > param)b = false;return b;};
		function valid_error(e,param){param==true?e.addClass('ef-formError'):e.removeClass('ef-formError');};
		$.fn.serializeObject = function(){var o = {},a = this.serializeArray();$.each(a, function(i,field){if(o[this.name] !== undefined){if(!o[this.name].push) {o[this.name] = [o[this.name]];}o[this.name].push(this.value || '');}else{o[this.name] = this.value || '';}});return o;};

	}($('form.easyform')));

});