<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AuthController extends BaseController
{
    public function authorization(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $email = $request->email;
        $password = $request->password;

        $member = DB::table('members')->where('email', '=', $email)
            ->where('password', '=', $password)->select(['fullname', 'email', 'gender', 'joinedDate'])->first();
        if ($member == null) {
            return $this->sendResponse('', 'Username and Password incorrect', false);
        } else {
            return $this->sendResponse($member, 'Login success');
        }
    }
}
