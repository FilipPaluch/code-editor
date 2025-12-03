
export interface ExpressionField {
    uniqueId: string;
    options: DropdownOption[];
    properties: Property[];
    canHaveFiles: boolean;
    isWritable?: boolean;
}

export interface DropdownOption {
    value: string;
    globalId: string;
}

export interface Property {
    name: string;
    options: DropdownOption[];
}