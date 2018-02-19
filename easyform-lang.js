var form_validations = {
    "es":{
        "success" : {
            "d000":"Se ha procesado el formulario con éxito.",
            "s000":"Sus datos se han actualizado correctamente.",
            "s001":"Su formulario ha sido enviado con éxito.",
            "c000":"Se ha creado el nuevo registro."
        },
        "error" : {
            "x000":"Hay errores en el formulario. Por favor, reviselo.",
            "x001":"Fallo al intentar procesar el formulario. No se ha podido enviar.",
            "u000":"Imposible actualizar datos. No hay registro en nuestra base de datos que coincidan con sus datos de referencia.",
            "e000":"Campo vacío",
            "e001":"Campo incorrecto. Debe ser texto.",
            "e002": function(n){return "Campo incorrecto. Máximo "+n+" caracteres."},
            "e003":"Campo incorrecto. Debe tener formato 'mail@mail.mail'.",
            "e004":"Campo incorrecto. Debe contener una fecha.",
            "e005":"Campo incorrecto. Debe contener un número de teléfono.",
            "e006":"Campo incorrecto. Debe ser número."
        }
    },
    "en":{
        "success" : {
            "d000":"The form has been processed successfully.",
            "s000":"Your data has been updated correctly.",
            "s001":"Your form has been sent successfully.",
            "c000":"The new record has been created."
        },
        "error" : {
            "x000":"There are errors in the form. Please, check it.",
            "x001":"Failed to process the form. Could not send.",
            "u000":"Unable to update data. There is no record in our database that matches your reference data.",
            "e000":"Empty field.",
            "e001":"Incorrect field It must be text.",
            "e002": function(n){return "Incorrect field. Maximum "+n+" characters."},
            "e003":"Incorrect field It must have a format like 'mail@mail.mail'.",
            "e004":"Incorrect field It must contain a date.",
            "e005":"Incorrect field It must contain a phone number.",
            "e006":"Incorrect field It must be number."
        }
    }
};