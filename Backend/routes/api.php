<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// members
Route::get('members', 'MembersController@index');
Route::get('members/{id}', 'MembersController@show');
Route::post('members', 'MembersController@store');
Route::put('members/{id}', 'MembersController@update');
Route::delete('members/{id}', 'MembersController@delete');

// rooms
Route::get('rooms', 'RoomsController@index');
Route::get('rooms/{id}', 'RoomsController@show');
Route::post('rooms', 'RoomsController@store');
Route::put('rooms/{id}', 'RoomsController@update');
Route::delete('rooms/{id}', 'RoomsController@delete');

// room participants
Route::get('room_participants', 'RoomParticipantsController@index');
Route::get('room_participants/{id}', 'RoomParticipantsController@show');
Route::post('room_participants', 'RoomParticipantsController@store');
Route::put('room_participants/{id}', 'RoomParticipantsController@update');
Route::delete('room_participants/{id}', 'RoomParticipantsController@delete');

// room channels
Route::get('room_channels', 'RoomChannelsController@index');
Route::get('room_channels/{id}', 'RoomChannelsController@show');
Route::post('room_channels', 'RoomChannelsController@store');
Route::put('room_channels/{id}', 'RoomChannelsController@update');
Route::delete('room_channels/{id}', 'RoomChannelsController@delete');
