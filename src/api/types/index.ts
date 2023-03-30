export interface userDetailsType {
    success: boolean;
    result: Array<userDetailsResult>;
}

export interface userDetailsResult {
    _id: string;
    type: string;
    configuration: Array<userDetailsResultconfiguration>
}

export interface userDetailsResultconfiguration {
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