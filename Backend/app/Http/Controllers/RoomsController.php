<?php

namespace App\Http\Controllers;

use App\Rooms;
use Illuminate\Http\Request;


class RoomsController extends BaseController
{
    public function index()
    {
        $rooms = Rooms::all();
        return $rooms;
//        return $this->sendResponse($rooms, 'Data retrieved successfully');
    }

    public function show($id)
    {
        $room = Rooms::find($id);
        return $room;
//        return $this->sendResponse($room, 'Data retrieved successfully');
    }

    private function createRandomPassword()
    {

        $chars = "abcdefghijkmnopqrstuvwxyz023456789";
        srand((double)microtime() * 1000000);
        $i = 0;
        $pass = '';

        while ($i <= 7) {
            $num = rand() % 33;
            $tmp = substr($chars, $num, 1);
            $pass = $pass . $tmp;
            $i++;
        }

        return $pass;

    }

    public function store(Request $request)
    {
        $roomCode = $this->createRandomPassword();
        $room = Rooms::create(array_merge($request->all(), ['roomCode' => $roomCode]));

        return $this->sendResponse($room, 'Data added successfully');
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
