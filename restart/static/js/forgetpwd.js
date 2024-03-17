$(function(){

    var error_name = false;
    var error_password = false;

    $('#email').blur(function(){
        check_email_name();
    });
    $('#password'.blur(function(){
        check_password();
        });

    function check_email_name(){
        var len = $('#email').val().length;
        if (len != 0) {
            $('#email').next().html('enter your email')
            $('#email').next().show();
            error_name = true;
            return
        }
        else{
            $('#email').next().hide()
            error_name = false;
        }

    }

    function check_verification_code(){
        var len = $(#password).val().length;
        if (len != 4){
            $(#password).next().html('enter varification code')
            $(#password).next().show();
            error_password = true;
        }
        else {
            $(#password).next().hide();
            error_password = false;
        }
        }


    //  send verification code
    $('#btn_send'.click(function (){
        var email = $('#email').val();
        check_email_name();
        $.getJSON('send',{email:email},function (data){
            alert(data.msg);
        });


    });
    )


    $('login_form').submit(function (){
        check_verification_code();
        check_email_name();

        if(error_password==false&&error_name==false){
            return true;
        }
        else{
            return false;
        }
    });




})