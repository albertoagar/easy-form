# easyform v1.1 stable

IMPORTANT:
This script needs jquery to run and the jquery-ui to show datepickers.
Attribute "html" must be present on document with a short language definition value. (Ex.: html="en" / html="es")

Two easy steps to run your form:
1. To use this plug-in, you only have to add the class "easyform" to the form you want to work with.
2. Then, you only need to add the "data" attributes as mentioned below to make your form validations.

VALIDATIONS:
Kind of data-ef-valid-type:
- by default: User can write everything he wants. No required and no limits.
- "onlytext": The field only can be filled with letters.
- "onlynumber": The field only can be filled with numbers.
- "date": The field must be a date formate. By default, this kind of field will be readonly.
- "email": The format of the field content must be an e-mail.
- "tel": The format of the field content must be a telephone.
- "maxLetter_XXXX": The max size of the field only XXXX letters.
- "required" (optional): Field will be required to send the form.

DATEPICKERS:
Kind of data-ef-dp-type: (this attribute auto-creates a jquery datepicker)
- by default: User is abled to select a day between today and a day in the future.
- "untiltoday": User is abled to select a day between 100 years ago and today.
- "sincetoday": User is abled to select a day between today and 100 years from today.

WAYS TO USE THE FORM
Kind of data-ef-form-type:
- by default: When validation is completed, the "efOwnFunction" function is called. You can define it where you want and make it do whatever you want. IMPORTANT: Read "TOOLS > efOwnFunction" section.
- "ajaxcall": The scripts will call the url in the "action"'s form attribute.

TOOLS:
"efOwnFunction":
Definition: Is the function you can call when the form is validated.
Usage: This function needs to have a parameter returned with an object with 'type' and 'code' properties ex.: 
	response_type_code = {'type':'success','code':'d000'} or response_type_code = {'type':'error','code':'d000'}
	return response_type_code;
	
"form_validations":
Definition: Is an object with all the messages you could need to feedback the user.
Usage:  There are some necessary errors with code relation, but you can create all you need more. You only need to assign a code to the message and you can use it wherever you want.
