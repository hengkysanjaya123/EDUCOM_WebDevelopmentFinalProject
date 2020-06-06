<?php

namespace App;

use Eloquent;

class RoomParticipants extends Eloquent
{
    protected $table = 'room_participants';
    protected $fillable = ['roomCode', 'member_id', 'status'];

    public function room()
    {
        return $this->belongsTo('App\Rooms');
    }

    public function member()
    {
        return $this->belongsTo('App\Members');
    }
}
