<?php

namespace App\Http\Responses;

class ApiError extends \Exception
{
    protected $statusCode;
    protected $errors;
    protected $data;

    public function __construct($statusCode, $message = 'Something went wrong', $errors = [], $data = null)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->errors = $errors;
        $this->data = $data;
    }

    public function toArray()
    {
        return [
            'statusCode' => $this->statusCode,
            'message' => $this->getMessage(),
            'errors' => $this->errors,
            'data' => $this->data,
        ];
    }

    public function render()
    {
        return response()->json($this->toArray(), $this->statusCode);
    }
}
