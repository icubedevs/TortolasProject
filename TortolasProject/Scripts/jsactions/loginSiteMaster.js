$(document).ready(function () {
    $("#registroButton").click(function () {
        var u = $("#nicknameRegister").val();
        var p = $("#PasswordRegister").val();
        var cp = $("#PasswordConfirmationRegister").val();
        var e = $("#emailRegister").val();

        var url = "/Home/Registro";

        datos = {
            UserName: u,
            Password: p,
            Email: e,
            ConfirmPassword: cp
        };
        $.post(url, datos, function (data) {
            if (data == "ok") {
                location.reload();
            } else {
                alert(data);
            }
        });
    });

    $("#LogInButton").click(function () {
        alert("iniciando sesión");
        var u = $("#userLogIn").val();
        var p = $("#pwdLogIn").val();

        var url = "/Home/LogOn";

        datos = {
            username: u,
            pass: p,
            returnUrl: "/Home"
        };

        $.post(url, datos, function (data) {
            if (data == "ok") {
                location.reload();
            } else {
                alert(data);
            }
        });
    });
});
