import { ExpressionField } from '../../../expression-fields/expressionField';

export const TEST_MAPPING_EXPRESSION_FIELDS: ExpressionField[] = [
    // Task container
    {
        uniqueId: 'task.id',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: false
    },
    {
        uniqueId: 'task.title',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
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
        canHaveFiles: false,
        isWritable: true
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
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'task.details.description',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'task.details.notes',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'task.details.details2.notes',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
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
        canHaveFiles: false,
        isWritable: false
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
        canHaveFiles: false,
        isWritable: false
    },

    // Process container
    {
        uniqueId: 'process.form.field1',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.field2',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.status',
        options: [
            {
                value: 'Draft',
                globalId: 'process-draft-guid'
            },
            {
                value: 'Submitted',
                globalId: 'process-submitted-guid'
            },
            {
                value: 'Approved',
                globalId: 'process-approved-guid'
            }
        ],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.checkboxlist',
        options: [
            {
                value: 'Option 1',
                globalId: 'checkbox-option1-guid'
            },
            {
                value: 'Option 2',
                globalId: 'checkbox-option2-guid'
            },
            {
                value: 'Option 3',
                globalId: 'checkbox-option3-guid'
            }
        ],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.subform.field1',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.subform.field2',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.attachments',
        options: [],
        properties: [],
        canHaveFiles: true,
        isWritable: true
    },
    {
        uniqueId: 'process.documents.invoice',
        options: [],
        properties: [],
        canHaveFiles: true,
        isWritable: true
    }
];