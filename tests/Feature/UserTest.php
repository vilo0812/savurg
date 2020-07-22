<?php

namespace Tests\Feature;

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
}
