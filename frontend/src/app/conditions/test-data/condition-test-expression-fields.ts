import { ExpressionField } from '../../expression-fields/expressionField';

export const TEST_EXPRESSION_FIELDS: ExpressionField[] = [
    // Task container
    {
        uniqueId: 'task.id',
        options: [],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.title',
        options: [],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.status',
        options: [
            {
                value: 'Active',
                globalId: 'status-active-guid'
            },
            {
                value: 'Completed',
                globalId: 'status-completed-guid'
            },
            {
                value: 'Cancelled',
                globalId: 'status-cancelled-guid'
            }
        ],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.priority',
        options: [
            {
                value: 'High',
                globalId: 'priority-high-guid'
            },
            {
                value: 'Medium',
                globalId: 'priority-medium-guid'
            },
            {
                value: 'Low',
                globalId: 'priority-low-guid'
            }
        ],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.details.description',
        options: [],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.details.notes',
        options: [],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.details.details2.notes',
        options: [],
        properties: [],
        canHaveFiles: false
    },
    {
        uniqueId: 'task.subtasks',
        options: [],
        properties: [
            {
                name: 'id',
                options: []
            },
            {
                name: 'name',
                options: []
            },
            {
                name: 'status',
                options: [
                    {
                        value: 'Todo',
                        globalId: 'subtask-todo-guid'
                    },
                    {
                        value: 'InProgress',
                        globalId: 'subtask-inprogress-guid'
                    },
                    {
                        value: 'Done',
                        globalId: 'subtask-done-guid'
                    }
                ]
            },
            {
                name: 'assignee.name',
                options: []
            },
            {
                name: 'assignee.email',
                options: []
            },
            {
                name: 'items',
                options: []
            }
        ],
        canHaveFiles: false
    },

    // Project container
    {
        uniqueId: 'project.members',
        options: [],
        properties: [
            {
                name: 'userId',
                options: []
            },
            {
                name: 'role',
                options: [
                    {
                        value: 'Admin',
                        globalId: 'admin-guid'
                    },
                    {
                        value: 'User',
                        globalId: 'user-guid'
                    }
                ]
            },
            {
                name: 'profile',
                options: []
            }
        ],
        canHaveFiles: false
    }
];