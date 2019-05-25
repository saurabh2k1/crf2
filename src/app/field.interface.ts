export interface Validator {
    name: string;
    validator: any;
    message: string;
    value?: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: any[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
    unit?: any;
    ngShow_field?: 'true';
    ngShow_value?: 'true';
}
