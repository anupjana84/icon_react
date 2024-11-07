<?php

namespace App\Http\Responses;

class ApiResponse
{
    public $statusCode;
    public $data;
    public $message;
    public $success;

    public function __construct($statusCode, $data = 'Success', $message = null)
    {
        $this->statusCode = $statusCode;
        $this->data = $data;
        $this->message = $message ?? ($statusCode < 400 ? 'Request was successful.' : 'An error occurred.');
        $this->success = $statusCode < 400;
    }

    public function toArray()
    {
        return [
            'statusCode' => $this->statusCode,
            'data' => $this->data,
            'message' => $this->message,
            'success' => $this->success,
        ];
    }
}
