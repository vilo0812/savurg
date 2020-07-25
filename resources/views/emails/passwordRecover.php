<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <link rel="icon" type="image/png" href="images/icons/zeg.png" sizes="32x32">
    <title>Zona Educativa</title>
    <style>
        html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
        .items{
            width: 50%;
            margin:auto;
            }
        .logo-img {
        width: 200px;
        margin:0px 10px;
        }
        .header-title{
            text-align: center;
            color: black;
            margin:0 5px;
        }
        .message{
            height: 30px;
            width: 60px;
            border:1px solid black;
            padding: 30px;  
            background: #b9c7f3;
            color:black;
        }
        .title {
        font-size: 24px;
        }
        .bold{
            font-weight: bold;
        }
    </style>
</head>
<body>
<div class="content">
    <div>
    <p class="title bold">Este es una notificación automática para su cambio de clave</p>
    <p class="">Su codigo para cambiar la contraseña:</p><br/>

    <p class="bold message">
        <?php echo $code?>
    </p><br/>    
    <small>Si no has solicitado un cambio de clave, puedes ignorar este correo electrónico.<br/>
    Que tengas un buen día,</small>
</div>
</body>
</html>