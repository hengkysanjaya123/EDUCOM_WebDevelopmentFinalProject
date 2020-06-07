<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Eloquent;

class RoomChannels extends Eloquent
{
    protected $fillable = ['room_id', 'channel_name', 'visibility'];

    public function room()
    {
        $this->belongsTo('App\Rooms');
    }

    public function channel_chats()
    {
        return $this->hasMany('App\ChannelChats');
    }
}
