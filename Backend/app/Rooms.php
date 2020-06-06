<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Eloquent;

class Rooms extends Eloquent
{
    protected $table = 'rooms';

    protected $fillable = ['name', 'description', 'createdDate', 'owner', 'roomCode'];

    public function room_participants()
    {
        return $this->hasMany('App\RoomParticipants');
    }

    public function room_channels()
    {
        return $this->hasMany('App\RoomChannels');
    }
}
