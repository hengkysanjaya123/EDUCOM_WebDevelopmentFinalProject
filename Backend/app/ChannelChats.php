<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChannelChats extends Model
{
    protected $fillable = ['room_channel_id', 'name', 'datetime', 'message', 'announced'];
}
