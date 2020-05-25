<?php

namespace App\Http\Controllers;

use App\Rooms;
use Illuminate\Http\Request;


class RoomsController extends BaseController
{
    public function index()
    {
        $rooms = Rooms::all();
        return $this->sendResponse($rooms, 'Data retrieved successfully');
    }

    public function show($id)
    {
        $room = Rooms::find($id);
        return $this->sendResponse($room, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $room = Rooms::create($request->all());
        return $this->sendResponse($room, 'Data added sucessfully');
    }

    public function update(Request $request, $id)
    {
        $room = Rooms::findorFail($id);
        $room->update($request->all());
        return $this->sendResponse($room, 'Data updated successfully');
    }


    public function delete(Request $request, $id)
    {
        try {
            $room = Rooms::findorFail($id);
            $room->delete();

            return $this->sendResponse('', 'Data deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

}
