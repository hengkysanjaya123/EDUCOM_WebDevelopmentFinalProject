<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LastReadMessages extends Model
{
    protected $fillable = ['member_id', 'room_channel_id', 'last_channel_chat_id', 'last_updated_date_time'];
}
