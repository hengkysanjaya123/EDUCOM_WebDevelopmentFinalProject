<?php

namespace App\Http\Controllers;

use App\TranslationLog;
use Illuminate\Http\Request;
use Stichoza\GoogleTranslate\GoogleTranslate;

class TranslationController extends Controller
{

    function store(Request $request)
    {
        $validatedData = $request->validate([
            'message' => 'required',
            'user' => 'required',
            'target_language' => 'required',
        ]);

        $tr = new GoogleTranslate();
        $tr->setSource();
        $tr->setTarget($request->target_language);

        $result = $tr->translate($request->message);
        $translation = TranslationLog::create(array_merge($validatedData, ['datetime' => date('Y-m-d H:i:s'), 'result' => $result]));


        return $result;
    }
}
