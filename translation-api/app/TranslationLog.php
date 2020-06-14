<?php

namespace App;

use Eloquent;

class TranslationLog extends Eloquent
{

    protected $table = 'translation_log';


    protected $fillable = [
        'message', 'user', 'target_language', 'result', 'datetime'
    ];

}
