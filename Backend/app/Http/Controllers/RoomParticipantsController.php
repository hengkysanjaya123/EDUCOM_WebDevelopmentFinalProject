<?php

namespace App\Http\Controllers;

use App\RoomParticipants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomParticipantsController extends BaseController
{
    public function index()
    {
        $roomParticipants = RoomParticipants::with(['room', 'member'])->get();

        return $roomParticipants;
//        return $this->sendResponse($roomParticipants, 'Data retrieved successfully');
    }

    public function show($id)
    {
        $roomParticipant = RoomParticipants::find($id)::with(['room', 'member'])->first();

        return $roomParticipant;
//        return $this->sendResponse($roomParticipants, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'roomCode' => 'required',
            'member_id' => 'required',
        ]);

        $room = DB::table('rooms')->where('roomCode', '=', $request->roomCode)->count();
        if ($room == 0) {
            return $this->sendResponse('', 'Room Code not found', false);
        }

        $isMemberInRoom = DB::table('room_participants')->where('member_id', '=', $request->member_id)->count();
        if ($isMemberInRoom > 0) {
            return $this->sendResponse('', 'You are already in this room', false);
        }

        $roomParticipants = RoomParticipants::create(array_merge($request->all(), ['status' => 'member']));
        return $this->sendResponse($roomParticipants, 'Data added successfully');
    }

    public function update(Request $request, $id)
    {
        $roomParticipant = RoomParticipants::findorFail($id);
        $roomParticipant->update($request->all());
        return $this->sendResponse($roomParticipant, 'Data updated successfully');
    }


    public function delete(Request $request, $id)
    {
        try {
            $roomParticipant = RoomParticipants::findorFail($id);
            $roomParticipant->delete();

            return $this->sendResponse('', 'Data deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

}
