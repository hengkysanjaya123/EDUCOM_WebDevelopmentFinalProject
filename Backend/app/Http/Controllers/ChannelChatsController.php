<?php

namespace App\Http\Controllers;

use App\ChannelChats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChannelChatsController extends BaseController
{
    public function index()
    {
        $channelChats = DB::table('channel_chats')
            ->join('room_channels', 'channel_chats.room_channel_id', '=', 'room_channels.id')
//            ->join('rooms', 'room_channels.id', '=', 'rooms.id')
            ->get();

//        return $channelChats;
        return $this->sendResponse($channelChats, 'Data retrieved successfully');
    }

    public function show($id)
    {
//        $channelChat = ChannelChats::find($id)::with('room')->first();

        $channelChat = (array)DB::table('channel_chats')
            ->join('room_channels', 'channel_chats.room_channel_id', '=', 'room_channels.id')
            ->where('channel_chats.id', '=', $id)
//            ->join('rooms', 'room_channels.id', '=', 'rooms.id')
            ->first();

        return $channelChat;
//        return $this->sendResponse($channelChat, 'Data retrieved successfully');
    }

    public function getbyroomchannel($room_channel_id)
    {
//        $channelChat = ChannelChats::find($id)::with('room')->first();

        $channelChat = DB::table('channel_chats')
            ->join('room_channels', 'channel_chats.room_channel_id', '=', 'room_channels.id')
            ->where('channel_chats.room_channel_id', '=', $room_channel_id)
//            ->join('rooms', 'room_channels.id', '=', 'rooms.id')
            ->orderBy('datetime')
            ->get();

//        return $channelChat;
        return $this->sendResponse($channelChat, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $channelChat = ChannelChats::create(array_merge($request->all(), ['datetime' => date('Y-m-d H:i:s'), 'announced' => 0]));
        return $this->sendResponse($channelChat, 'Data added successfully');
    }

    public function update(Request $request, $id)
    {
        $channelChat = ChannelChats::findorFail($id);
        $channelChat->update($request->all());
        return $this->sendResponse($channelChat, 'Data updated successfully');
    }


    public function delete(Request $request, $id)
    {
        try {
            $channelChat = ChannelChats::findorFail($id);
            $channelChat->delete();

            return $this->sendResponse('', 'Data deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
