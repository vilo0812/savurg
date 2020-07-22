<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "name" => "gabriel",
            "last_name" => "viloria",
            "nick_name" => "vilonk",
            "email" => "gabriel.viloria0812@gmail.com",
            "password" => bcrypt("1234")
            // "password" => Hash::make('1234')
        ]);
        factory(User::class)->create();
    }
}
