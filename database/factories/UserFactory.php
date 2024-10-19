<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'phone' => $this->faker->unique()->phoneNumber(), // Generate unique phone numbers
            'wpnumber' => $this->faker->optional()->phoneNumber(), // Optional WhatsApp number
            'password' => Hash::make('password'), // Default password
            'role' => $this->faker->randomElement(['admin', 'manager', 'salesman', 'user']), // Random role assignment
            'remember_token' => Str::random(10),
        ];
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Admin User',
            'phone' => '9876543210', // Specific phone number for admin
            'wpnumber' => '9876543210', // Specific WhatsApp number for admin
            'role' => 'admin',
            'password' => Hash::make('123456'), // Admin password
        ]);
    }

    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Manager User',
            'phone' => '234-567-8901', // Specific phone number for manager
            'wpnumber' => '+1 (345) 678-9012', // Specific WhatsApp number for manager
            'role' => 'manager',
            'password' => Hash::make('123456'), // Manager password
        ]);
    }

    public function salesman(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Salesman User',
            'phone' => '345-678-9012', // Specific phone number for salesman
            'wpnumber' => '+1 (456) 789-0123', // Specific WhatsApp number for salesman
            'role' => 'salesman',
            'password' => Hash::make('123456'), // Salesman password
        ]);
    }

    public function regularUser(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Regular User',
            'phone' => '456-789-0123', // Specific phone number for regular user
            'wpnumber' => '+1 (567) 890-1234', // Specific WhatsApp number for regular user
            'role' => 'user',
            'password' => Hash::make('123456'), // Regular user password
        ]);
    }
}
