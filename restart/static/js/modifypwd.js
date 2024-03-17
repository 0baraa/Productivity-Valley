$(function(){

    var error_name = false;
    var error_password = false;

    $('#password1 '.blur(function(){
        check_password();
    });
    $('#password2 '.blur(function(){
        check_password();
    });


    function check_password(){
        var password1  = $('#password1').val();
        var password2 = $('#password2').val();
        if (password1 != password2){
            $(#password2).next().html('The reentered password is inconsistent')
            $(#password2).next().show();
            error_password = true;
        }
        else {
            $(#password2).next().hide();
            error_password = false;
        }
        }



    $('modify_form').submit(function (){
        check_password();
        check_email_name();

        if(error_password==false&&error_name==false){
            return true;
        }
        else{
            return false;
        }
    });




})