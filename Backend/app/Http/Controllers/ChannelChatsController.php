<?php

namespace App\Http\Controllers;

use App\ChannelChats;
use Illuminate\Http\Request;

class ChannelChatsController extends Controller
{
    public function index()
    {
        $channelChats = ChannelChats::with(['room'])->get();

        return $this->sendResponse($channelChats, 'Data retrieved successfully');
    }

    public function show($id)
    {
        $channelChat = ChannelChats::find($id)::with('room')->first();
        return $this->sendResponse($channelChat, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $channelChat = ChannelChats::create($request->all());
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
