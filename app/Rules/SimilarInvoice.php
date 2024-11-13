<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class SimilarInvoice implements Rule
{
    protected $purchaseDate;
    protected $table;
    protected $column;

    public function __construct($purchaseDate, $table = 'purchases', $column = 'purchase_invoice_no')
    {
        $this->purchaseDate = $purchaseDate;
        $this->table = $table;
        $this->column = $column;
    }
    public function passes($attribute, $value)
    {
        // Ensure that the value has at least 4 characters to get the last four digits
        if (strlen($value) < 4) {
            return false; // Automatically fail if invoice number is less than 4 characters
        }

        // Extract the last 4 digits from the provided invoice number
        $lastFourDigits = substr($value, -4);

        // Retrieve all records for the given date
        $similarInvoices = DB::table($this->table)
            ->where('purchase_date', $this->purchaseDate)
            ->get([$this->column]);

        // Check if any retrieved invoice has the same last 4 digits
        foreach ($similarInvoices as $invoice) {
            // Get the last 4 digits of the existing invoice number
            $existingLastFourDigits = substr($invoice->{$this->column}, -4);
            if ($existingLastFourDigits === $lastFourDigits) {
                return false; // Fail if a match is found
            }
        }
    }

    public function message()
    {
        return 'An invoice with a similar number exists on the same date.';
    }
}
