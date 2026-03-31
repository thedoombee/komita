<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\ChallengeReport;
use App\Models\Event;
use App\Models\EventSubmission;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __invoke(): Response
    {
        $stats = [
            'totalUsers' => User::count(),
            'activeChallenges' => Challenge::query()->where('status', 'active')->count(),
            'activeEvents' => Event::query()->where('deadline', '>', now())->count(),
        ];

        $users = User::query()
            ->latest()
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        $activity = [
            'challengeReports' => ChallengeReport::count(),
            'eventSubmissions' => EventSubmission::count(),
        ];

        return Inertia::render('Admin/Panel', [
            'stats' => $stats,
            'users' => $users,
            'activity' => $activity,
        ]);
    }
}

