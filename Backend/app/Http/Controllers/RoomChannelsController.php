<?php

namespace App\Http\Controllers;

use App\RoomChannels;
use Illuminate\Http\Request;

class RoomChannelsController extends BaseController
{
    public function index()
    {
        $roomChannels = RoomChannels::with(['room'])->get();

        return $roomChannels;
//        return $this->sendResponse($roomChannels, 'Data retrieved successfully');
    }

    public function show($id)
    {
        $roomChannel = RoomChannels::find($id)::with('room')->first();
        return $roomChannel;
        
//        return $this->sendResponse($roomChannel, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $roomChannel = RoomChannels::create($request->all());
        return $this->sendResponse($roomChannel, 'Data added successfully');
    }

    public function update(Request $request, $id)
    {
        $roomChannel = RoomChannels::findorFail($id);
        $roomChannel->update($request->all());
        return $this->sendResponse($roomChannel, 'Data updated successfully');
    }


    public function delete(Request $request, $id)
    {
        try {
            $roomChannel = RoomChannels::findorFail($id);
            $roomChannel->delete();

            return $this->sendResponse('', 'Data deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
