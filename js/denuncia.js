$(document).ready(function() { 

    var boton01 = $(".siguiente");
    var boton02 = $(".enviar");
    var botonVolver = $('#btnVolverPaso1');

    $("input#rut").rut({
        formatOn: 'keyup',
        minimumLength: 8, // validar largo mínimo; default: 2
        validateOn: 'change' // si no se quiere validar, pasar null
    });

    $('#formDenuncia input').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    botonVolver.on('click', function(e){
        e.preventDefault();        
        $(".pasos-contacto-2").css("display", "none");
        $(".pasos-contacto-1").css("display", "block");
    })
    
    boton02.on("click", function(e) {
        e.preventDefault();
        var l = $(".denuncia").val().length;
        if (l < 100){
           alert("Su mensaje debe contener al menos 100 caracteres");
        } else if(l > 2000){
            alert("Su mensaje debe contener no más de 2000 caracteres");
        } else {
            $("input[name=nombre1]").val($("input[name=nombre1]").val().toUpperCase());
            $("input[name=nombre2]").val($("input[name=nombre2]").val().toUpperCase());
            $("input[name=apellido1]").val($("input[name=apellido1]").val().toUpperCase());
            $("input[name=apellido2]").val($("input[name=apellido2]").val().toUpperCase());

            $('#formDenuncia').submit();
        }

    });
       
    boton01.on("click", function(e) {
        e.preventDefault();

        var ln1 = $("input[name=nombre1]").val().length;
        var ln2 = $("input[name=nombre2]").val().length;
        var la1 = $("input[name=apellido1]").val().length;
        var la2 = $("input[name=apellido2]").val().length;
        var lt  = $("input[name=telefono]").val().length;
        var le  = $("input[name=email]").val().length;
        var le2 = $("input[name=email2]").val().length;
        var lr  = $("input[name=rut]").val().length;

        if(ln1 <= 2 || ln2 <= 2){
            alert("Sus nombres deben contener al menos 3 caracteres");
        } else if(la1 <= 2 || la2 <= 2){
            alert("Sus apellidos deben contener al menos 3 caracteres");
        } else if(!$.validateRut($("input[name=rut]").val())){
            alert("Verifique su rut");
        } else if(le < 5){
            alert("Su email debe contener al menos 5 caracteres");
        } else if(!validate($("input[name=email]").val())){
            alert("Su email debe ser válido");
        } else if($("input[name=email]").val() != $("input[name=email2]").val()){
            alert("Los emails no coinciden");
        } else if(lt < 9){
            alert("Su número telefónico debe contener al menos 9 caracteres");
        } else {
            $(".pasos-contacto-2").css("display", "block");
            $(".pasos-contacto-1").css("display", "none");
            
        }
    });

    $("#file").on("change", validateFile);
});

function checkLengh() {
    var txtfield = $("#denuncia");
    var x = txtfield.val().length;
    var barra = $(".denuncia-progress");
    var pctn = ((x / 2000 * 100) - 2) + "%";
    var pcts = (x / 2000 * 100) + "%";
    $('.bar .length').text(x);
    if (x >= 1850 || (x > 10 && x <= 250)) {
        barra.addClass('tenue');
    } else {
        barra.removeClass('tenue');
    }
    if (x >= 100 && x <= 2000) {
        $(".bar").css({
            "background-color": "#27AE61",
            "width": pcts,
        });
    } else if(x > 2000){
        $(".bar").css({
            "background-color": "#FF4A51",
            "width": "100%",
        });
    } else {
        $(".bar").css({
            "background-color": "#FF4A51",
            "width": pcts,
        });
    }
}

function validateFile(){
    const   allowedExtensions =  ['jpg','jpeg','png','pdf','doc','docx','bmp'],
            sizeLimit = 2048000; // 2 megabyte

    const { name:fileName, size:fileSize } = this.files[0];
    const fileExtension = fileName.split(".").pop();

    if(!allowedExtensions.includes(fileExtension)){
        alert("Tipo de archivo no es válido");
        this.value = null;
    } else if(fileSize > sizeLimit){
        alert("El archivo debe pesar menos de 2MB");
        this.value = null;
    } else {
        $('span.filename').html("Nombre de archivo: <b>" + fileName + "</b>");
        $('input[name=path]').val(fileName);
    }
}

function validate(email) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;        
    return expression.test(String(email).toLowerCase())
}