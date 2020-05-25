<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Eloquent;

class Rooms extends Eloquent
{
    protected $table = 'rooms';

    protected $fillable = ['name', 'description', 'createdDate', 'owner'];

    public function room_participants()
    {
        return $this->hasMany('App\RoomParticipants');
    }
}
