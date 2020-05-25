<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChannelChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channel_chats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('room_channel_id');
            $table->string('name');
            $table->dateTime('datetime');
            $table->text('message');
            $table->boolean('announced');
            $table->foreign('room_channel_id')->references('id')->on('room_channels');
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
        Schema::dropIfExists('channel_chats');
    }
}
