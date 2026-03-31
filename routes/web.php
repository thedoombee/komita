<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/challenges/create', [ChallengeController::class, 'create'])->name('challenges.create');
    Route::post('/challenges', [ChallengeController::class, 'store'])->name('challenges.store');
    Route::get('/challenges/{challenge}/report', [ChallengeController::class, 'report'])->name('challenges.report');
    Route::post('/challenges/{challenge}/report', [ChallengeController::class, 'submitReport'])->name('challenges.report.submit');

    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::post('/events/{event:code}/submit', [EventController::class, 'submit'])->name('events.submit');

    Route::middleware('admin')->group(function () {
        Route::get('/admin', AdminController::class)->name('admin.panel');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/events/{event:code}', [EventController::class, 'show'])
    ->where('event', '[A-Za-z0-9]{8}')
    ->name('events.show');

require __DIR__.'/auth.php';
