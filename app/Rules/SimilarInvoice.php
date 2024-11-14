<?php

namespace App\Rules;

use App\Models\Purchase;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;

class SimilarInvoice implements Rule
{
    protected $purchaseDate;
    protected $column; // Add column name for comparison (default is 'purchase_invoice_no')
    protected $id; // Add ID for exclusion

    public function __construct($purchaseDate, $id = null)
    {
        $this->purchaseDate = $purchaseDate;
        $this->column = 'purchase_invoice_no';
        $this->id = $id; // Set ID for exclusion
    }

    public function passes($attribute, $value)
    {

        // Extract the last 4 digits from the provided invoice number
        $lastFourDigits = substr($value, -4);

        // Retrieve all records for the given date, excluding the specified ID if provided
        $similarInvoices = Purchase::where('purchase_date', $this->purchaseDate)
            ->when($this->id, function ($query) {
                return $query->where('id', '!=', $this->id);
            })
            ->get([$this->column]);

        // Check if any retrieved invoice has the same last 4 digits
        foreach ($similarInvoices as $invoice) {
            // Get the last 4 digits of the existing invoice number
            $existingLastFourDigits = substr($invoice->{$this->column}, -4);
            if ($existingLastFourDigits === $lastFourDigits) {
                return false; // Fail if a match is found
            }
        }

        return true; // Pass if no similar invoice is found
    }

    public function message()
    {
        return 'An invoice with a similar number exists on the same date.';
    }
}
