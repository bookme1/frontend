export interface Log {
    id: number;
    message: string;
    timestamp: string;
}

export interface addLog {
    source: string,
    message: string,
    context: string,
    code: number
}

export interface idLog {
    id: number
}