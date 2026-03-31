<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\ChallengeReport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ChallengeController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Challenges/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration' => ['required', 'integer', 'min:1', 'max:365'],
            'start_date' => ['required', 'date'],
        ]);

        Challenge::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'status' => 'active',
            'validated_days' => 0,
        ]);

        return redirect()->route('dashboard');
    }

    public function report(Challenge $challenge, Request $request): Response
    {
        abort_unless(
            $challenge->user_id === $request->user()->id || ($request->user()->role === 'admin'),
            403
        );

        return Inertia::render('Challenges/Report', [
            'challenge' => [
                'id' => $challenge->id,
                'title' => $challenge->title,
                'duration' => $challenge->duration,
                'current_day' => min($challenge->validated_days + 1, $challenge->duration),
                'deadline' => now()->endOfDay()->toIso8601String(),
            ],
        ]);
    }

    public function submitReport(Challenge $challenge, Request $request): RedirectResponse
    {
        abort_unless(
            $challenge->user_id === $request->user()->id || ($request->user()->role === 'admin'),
            403
        );

        $validated = $request->validate([
            'content' => ['required', 'string'],
            'file' => ['nullable', 'file', 'max:10240', Rule::file()->types(['pdf', 'jpg', 'jpeg', 'png', 'txt'])],
        ]);

        $filePath = isset($validated['file'])
            ? $validated['file']->store('challenge-reports', 'public')
            : null;

        ChallengeReport::create([
            'challenge_id' => $challenge->id,
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
            'file_path' => $filePath,
            'submitted_at' => now(),
        ]);

        $alreadySubmittedToday = ChallengeReport::query()
            ->where('challenge_id', $challenge->id)
            ->where('user_id', $request->user()->id)
            ->whereDate('submitted_at', now()->toDateString())
            ->count() > 1;

        if (! $alreadySubmittedToday) {
            $challenge->increment('validated_days');

            if ($challenge->validated_days >= $challenge->duration) {
                $challenge->update(['status' => 'completed']);
            }
        }

        return redirect()->route('dashboard');
    }
}

