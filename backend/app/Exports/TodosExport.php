<?php

namespace App\Exports;

use App\Models\Todo;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class TodosExport implements FromCollection, WithHeadings, WithMapping, WithStrictNullComparison, WithEvents
{
    protected $filters;
    protected $todos; 

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = Todo::query();

        if (!empty($this->filters['title'])) {
            $query->where('title', 'like', '%' . $this->filters['title'] . '%');
        }
        if (!empty($this->filters['assignee'])) {
            $assignees = array_map('trim', explode(',', $this->filters['assignee']));
            $query->whereIn('assignee', $assignees);
        }
        if (!empty($this->filters['status'])) {
            $statuses = array_map('trim', explode(',', $this->filters['status']));
            $query->whereIn('status', $statuses);
        }
        if (!empty($this->filters['priority'])) {
            $priorities = array_map('trim', explode(',', $this->filters['priority']));
            $query->whereIn('priority', $priorities);
        }
        if (!empty($this->filters['start'])) {
            $query->whereDate('due_date', '>=', $this->filters['start']);
        }
        if (!empty($this->filters['end'])) {
            $query->whereDate('due_date', '<=', $this->filters['end']);
        }
        if (isset($this->filters['min']) && $this->filters['min'] !== '') {
            $query->where('time_tracked', '>=', $this->filters['min']);
        }
        if (isset($this->filters['max']) && $this->filters['max'] !== '') {
            $query->where('time_tracked', '<=', $this->filters['max']);
        }

        $this->todos = $query->get(); 
        
        return $this->todos;
    }

    public function headings(): array
    {
        return [
            'title',
            'assignee',
            'due_date',
            'time_tracked',
            'status',
            'priority',
        ];
    }

    public function map($todo): array
    {
        return [
            $todo->title,
            $todo->assignee,
            $todo->due_date->format('Y-m-d'),
            $todo->time_tracked,
            $todo->status,
            $todo->priority,
        ];
    }

    // 1. Daftarkan Event
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                $lastRow = $sheet->getHighestRow();

                $summaryRow = $lastRow + 2;

                $totalTodos = $this->todos->count();
                $totalTime  = $this->todos->sum('time_tracked');

                $sheet->setCellValue('A' . $summaryRow, 'Total Todos:');
                $sheet->setCellValue('B' . $summaryRow, $totalTodos);

                $sheet->setCellValue('A' . ($summaryRow + 1), 'Total Time Tracked:');
                $sheet->setCellValue('B' . ($summaryRow + 1), $totalTime);
            },
        ];
    }
}