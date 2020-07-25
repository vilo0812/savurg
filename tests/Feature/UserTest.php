<?php

namespace Tests\Feature;

use App\Password_recover;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
class UserTest extends TestCase
{
   use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogin()
    {
        $user = factory(User::class)->create();
        $response = $this->json('POST','/api/auth/login',[
            'email' => $user->email,
            'password' => "1234",
        ]);
        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
            'user'
        ])->assertStatus(200);

        
    }
    public function testPasswordRecover()
    {
        $user = factory(User::class)->create();
        $response = $this->json('POST','/api/auth/recoverPassword',[
            'email' => $user->email,
        ]);
        $response->assertJsonStructure([
            'message',
            'password_recover',
        ])->assertStatus(201);
    }
    public function testVerifyCode()
    {
                $user = factory(User::class)->create();
                $token = Password_recover::create(['email'=>$user->email,'token'=> "123tfe"]);
                $response = $this->json('POST','/api/auth/verifyCode',[
                    'email' => $token->email,
                    'token' => $token->token
                ]);
                $response->assertJsonStructure([
                    'message',
                ])->assertStatus(200);
    }
    public function testRegister()
    {
        $response = $this->json('POST','/api/auth/register',[
            'email' => 'pedrito1234@gmail.com',
            'password' => "1234",
            'name' => "pedro",
        ]);
        $response->assertJsonStructure([
            'message',
            'user',
        ])->assertStatus(201);

        
    }
    public function testNewPassword()
    {
        $user = factory(User::class)->create();
        $token = Password_recover::create([
            'email'=>$user->email,
            'email_verified'=> true]);
        $response = $this->json('PUT','/api/auth/newPassword',[
            "email"=>$token->email,
            "password"=>"1234"
        ]);
        $response->assertJsonStructure([
            'message',
        ])->assertStatus(201);
        
    }
}
