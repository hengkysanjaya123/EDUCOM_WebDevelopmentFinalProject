<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Eloquent;

class Members extends Eloquent
{
    protected $table = 'members';

    protected $fillable = [
        'fullname', 'email', 'password', 'gender', 'joinedDate'
    ];

    public function room_participants()
    {
        return $this->hasMany('App\RoomParticipants');
    }
}
