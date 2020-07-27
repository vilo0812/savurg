<h1 style="text-align: center;">Sistema de Aula Virtual para la Universidad Romulo Gallegos</h1>
<img src="public/images/backgrounds/sistema.png" alt="">
<p>sistema que ayudara a la realización de las tareas a distancia de la Universidad Romulo Gallegos</p>
<h2>Instalación</h2>
<ul>
	<li>https://github.com/vilo0812/savurg.git</li>
	<li> chmod -R 777 savurg
	</li>
	<li>cd savurg/</li>
	<li>composer install</li>
	<li>cp .env.example .env</li>
	<li>php artisan key:generate</li>
	<li>composer update</li>
	<li>php artisan cache:clear && php artisan config:cache && php artisan config:clear</li>
	<li>composer require tymon/jwt-auth</li>
	<li>php artisan jwt:secret</li>
	<li>Desde la consola (usando MySql) podrías hacer algo similar a esto<br/>
	mysql -uroot -psecret</li>
	<li>CREATE DATABASE tu_base_de_datos;</li>
	<li>Posteriormente debes agregar las credenciales al archivo .env<br/>
	DB_HOST=localhost<br/>
	DB_DATABASE=tu_base_de_datos<br/>
	DB_USERNAME=root<br/>
	DB_PASSWORD=tu-contraseña</li>
	<li>php artisan migrate --seed</li>
	<li>npm install</li>
	<li>npm run dev</li>
</ul>
<span>
	<p>
		puedes ingresar al sistema con el siguiente usuario:
	</p>
	<ul>
		<li>
			correo: gabriel.viloria0812@gmail.com
		</li>
		<li>
			clave: 1234
		</li>
	</ul>
</span>
<small style="text-align: center;">
	savurg gabriel viloria 2018
</small>