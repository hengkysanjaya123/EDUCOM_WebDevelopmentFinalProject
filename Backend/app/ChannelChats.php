<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Eloquent;

class ChannelChats extends Eloquent
{
    protected $fillable = ['room_channel_id', 'name', 'datetime', 'message', 'announced'];

    public function RoomChannel()
    {
        return $this->belongsTo('App\RoomChannels');
    }
}
