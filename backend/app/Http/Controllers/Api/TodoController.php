<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Exports\TodosExport; 
use Maatwebsite\Excel\Facades\Excel; 

class TodoController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'        => 'required|string|max:255',
            'assignee'     => 'nullable|string|max:255',
            'due_date'     => 'required|date|after_or_equal:today',
            'time_tracked' => 'nullable|numeric|min:0',
            'status'       => 'nullable|in:pending,open,in_progress,completed',
            'priority'     => 'required|in:low,medium,high',
        ]);

        $validatedData['time_tracked'] = $validatedData['time_tracked'] ?? 0;
        $validatedData['status'] = $validatedData['status'] ?? 'pending';

        $todo = Todo::create($validatedData);

        return response()->json([
            'message' => 'Todo created successfully',
            'data'    => $todo
        ], 201);
    }

    public function export(Request $request) 
    {
        return Excel::download(new TodosExport($request->all()), 'todos.xlsx');
    }

}