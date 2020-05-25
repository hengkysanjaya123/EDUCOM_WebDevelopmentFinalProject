<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomChannels extends Model
{
    protected $fillable = ['room_id', 'channel_name', 'visibility'];
}
