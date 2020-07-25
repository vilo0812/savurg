<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Password_recover extends Model
{
   public $timestamps = false;
   protected $fillable = [
        'token', 
        'email', 
        'email_verified'
    ];
}
