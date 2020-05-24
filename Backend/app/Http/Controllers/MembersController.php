<?php

namespace App\Http\Controllers;

use App\Members;
use Illuminate\Http\Request;


class MembersController extends BaseController
{
    public function index()
    {
//        $members = DB::table('members')->get();
        return $this->sendResponse(Members::all(), 'Members retrieved successfully');
    }

    public function show($id)
    {
        $member = Members::find($id);
        return $this->sendResponse($member, 'Data retrieved successfully');
    }

    public function store(Request $request)
    {
        $member = Members::create(array_merge($request->all(), ['joinedDate' => date('Y-m-d')]));

        return $this->sendResponse($member, 'Data added successfully');
    }

    public function update(Request $request, $id)
    {
        $member = Members::findorFail($id);
        $member->update($request->all());
        return $this->sendResponse($member, 'Data updated successfully');
    }

    public function delete(Request $request, $id)
    {
        $member = Members::findorFail($id);
        $member->delete();

        return 204;
    }
}
