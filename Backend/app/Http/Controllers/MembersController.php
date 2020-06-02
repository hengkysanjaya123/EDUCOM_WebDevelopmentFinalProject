<?php

namespace App\Http\Controllers;

use App\Members;
use Illuminate\Http\Request;


class MembersController extends BaseController
{
    public function index()
    {
//        $members = DB::table('members')->get();
        return Members::all();
//        return $this->sendResponse(Members::all(), 'Members retrieved successfully');
    }

    public function show($id)
    {
        $member = Members::find($id);
        return $member;
//        return $this->sendResponse($member, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'fullname' => 'required',
                'email' => 'required',
                'password' => 'required',
                'gender' => 'required'
            ]);

            $member = Members::create(array_merge($validatedData, ['joinedDate' => date('Y-m-d')]));

            return $this->sendResponse($member, 'Data added successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $member = Members::findorFail($id);
            $member->update($request->all());
            return $this->sendResponse($member, 'Data updated successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $member = Members::findorFail($id);
            $member->delete();

            return $this->sendResponse('', 'Data deleted successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
