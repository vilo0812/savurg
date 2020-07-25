<?php

namespace App\Http\Controllers;

use App\Password_recover;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Mail\RecoverPassword;
use Illuminate\Support\Facades\Mail;
class UserController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register','recoverPassword','verifyCode','newPassword']]);
    }

    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:3',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }


    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile() {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
    /*start funcion que me permite recuperar la contraseña enviando un codigo a mi correo que me para verificar*/
    public function recoverPassword(Request $request){
     $token = $this->token(6);
    $validator = Validator::make($request->all(), [
            'email' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        if(User::where('email',$request->email)->count())
        {
            if(Password_recover::where('email',$request->email)->count()){
            $id = Password_recover::where('email',$request->email)->get('id');
            $pas = Password_recover::find($id[0]->id);
            $pas->token = $token;
            $pas->email_verified = null;
            $pas->save();
            Mail::to($request->email)
            ->send(new RecoverPassword($token));
            return response()->json([
            'message' => 'Password Recover successfully registered',
            'password_recover' => $pas
            ], 201);
             }else{
            $pas = Password_recover::create(['email'=>$request->email,'token'=> $token]);
           Mail::to($request->email)
            ->send(new RecoverPassword($token));
            return response()->json([
            'message' => 'Password Recover successfully registered',
            'password_recover' => $pas
            ], 201);
                
            }
        }else{
            return response()->json(['mensaje'=>['emailWrong' => ['el correo ingresado es incorrecto']]], 422);
        }
    }
    /*end funcion que me permite recuperar la contraseña enviando un codigo a mi correo que me para verificar*/
    /*start funcion para generar un codigo aleatorio*/
    public function token($longitud) {
         $key = '';
         $pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
         $max = strlen($pattern)-1;
         for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
         return $key;
        }
        /*end funcion para generar un codigo aleatorio*/
    /*start revisamos si el codigo es correcto*/
    public function verifyCode(Request $request){
        if($token = Password_recover::where([["token","=",$request->token],["email","=",$request->email]])->get()){
        $token[0]->email_verified = true;
        $token[0]->token = null;
        $token[0]->save();
            return response()->json(['message'=>'verificado correctamente'], 200);
        }else{
        return response()->json(['mensaje'=>['token' => ['el token ingresado es incorrecto']]], 422);
        }
    }
    /*end revisamos si el codigo es correcto*/
    /*start api que cambia la contraseña del usuario*/
    public function newPassword(Request $request){
    $email_verified = Password_recover::where('email',$request->email)->get();
    if($email_verified[0]->email_verified){
        $user = User::whereEmail($request->email)->get();
        $user[0]->password = bcrypt($request->password);
        $user[0]->save();
        return response()->json(['message'=>'contraseña cambiada correctamente'], 201);
    }else{
    return response()->json(['message'=>['token' => ['sus datos son incorrectos']]], 422);  
    }
    }
    /*end api que cambia la contraseña del usuario*/

}
