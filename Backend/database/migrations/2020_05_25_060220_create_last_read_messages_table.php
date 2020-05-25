<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLastReadMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('last_read_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('room_channel_id');
            $table->unsignedBigInteger('last_channel_chat_id');
            $table->dateTime('last_updated_date_time');

            $table->foreign('member_id')->references('id')->on('members');
            $table->foreign('room_channel_id')->references('id')->on('room_channels');
            $table->foreign('last_channel_chat_id')->references('id')->on('channel_chats');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('last_read_messages');
    }
}
