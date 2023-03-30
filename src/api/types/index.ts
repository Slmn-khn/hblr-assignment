export interface userTableDetailsType {
    success: boolean;
    result: Array<userTableDetailsResult>;
}

export interface userTableDetailsResult {
    _id: string;
    type: string;
    configuration: Array<userTableDetailsResultconfiguration>
}

export interface userTableDetailsResultconfiguration {
    _id: string;
    label: string;
    required: boolean;
    type: string;
    minLength?: number;
    maxLength?: number;
    ["multi-select"]?: boolean;
    options?: [],
    repeating?: boolean;
    unique?: boolean;

}
export interface ResultconfigurationOptions {
    _id: string;
    label: string;
}


export interface UserDetailsTableRow {
    key: React.Key;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: string;
}

export interface userDetails {
    success: boolean;
    result: Array<userDetailsResult>;
}

export interface userDetailsResult {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: string;
}