<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // // Create the different roles without email
        // User::factory()->admin()->create();
        // User::factory()->manager()->create();
        // User::factory()->salesman()->create();
        // User::factory()->regularUser()->create();

        // // Optionally, you can create multiple users for a specific role
        // User::factory()->count(5)->regularUser()->create();
    }
}

