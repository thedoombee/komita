<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function create(Request $request): Response
    {
        abort_unless(in_array($request->user()->role, ['professor', 'admin'], true), 403);

        return Inertia::render('Events/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless(in_array($request->user()->role, ['professor', 'admin'], true), 403);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'instructions' => ['required', 'string'],
            'deadline' => ['required', 'date', 'after:now'],
        ]);

        Event::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'code' => $this->generateUniqueCode(),
        ]);

        return redirect()->route('dashboard');
    }

    public function show(Event $event): Response
    {
        return Inertia::render('Events/Show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'instructions' => $event->instructions,
                'deadline' => $event->deadline?->toIso8601String(),
                'code' => $event->code,
            ],
        ]);
    }

    public function submit(Event $event, Request $request): RedirectResponse
    {
        if (! $request->user()) {
            return redirect()->route('login');
        }

        if ($event->deadline && now()->greaterThan($event->deadline)) {
            return back()->withErrors([
                'content' => __('event.closed'),
            ]);
        }

        $validated = $request->validate([
            'content' => ['required', 'string'],
            'file' => ['nullable', 'file', 'max:10240', Rule::file()->types(['pdf', 'jpg', 'jpeg', 'png', 'txt'])],
        ]);

        $filePath = isset($validated['file'])
            ? $validated['file']->store('event-submissions', 'public')
            : null;

        EventSubmission::create([
            'event_id' => $event->id,
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
            'file_path' => $filePath,
            'submitted_at' => now(),
        ]);

        return back();
    }

    protected function generateUniqueCode(): string
    {
        do {
            $code = Str::upper(Str::random(8));
        } while (Event::query()->where('code', $code)->exists());

        return $code;
    }
}

