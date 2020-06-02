<?php

namespace App\Http\Controllers;

use App\RoomParticipants;
use Illuminate\Http\Request;

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
        $roomParticipants = RoomParticipants::create($request->all());
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
