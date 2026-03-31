<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\Event;
use App\Models\EventSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $role = $user->role ?? 'student';

        if ($role === 'professor') {
            $events = Event::query()
                ->where('user_id', $user->id)
                ->withCount('submissions')
                ->latest()
                ->get(['id', 'title', 'deadline', 'code']);

            $stats = [
                'activeEvents' => Event::query()
                    ->where('user_id', $user->id)
                    ->where('deadline', '>', now())
                    ->count(),
                'totalSubmissions' => EventSubmission::query()
                    ->whereHas('event', fn ($q) => $q->where('user_id', $user->id))
                    ->count(),
            ];

            return Inertia::render('Dashboard', [
                'events' => $events,
                'stats' => $stats,
            ]);
        }

        $challenges = Challenge::query()
            ->where('user_id', $user->id)
            ->latest()
            ->get(['id', 'title', 'status', 'duration', 'validated_days']);

        $total = $challenges->count();
        $completed = $challenges->where('status', 'completed')->count();

        $stats = [
            'activeChallenges' => $challenges->where('status', 'active')->count(),
            'validatedDays' => (int) $challenges->sum('validated_days'),
            'successRate' => $total > 0 ? (int) round(($completed / $total) * 100) : 0,
        ];

        return Inertia::render('Dashboard', [
            'challenges' => $challenges,
            'stats' => $stats,
        ]);
    }
}

