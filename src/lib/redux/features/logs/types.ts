export interface Log {
    id: number;
    message: string;
    timestamp: string;
}

export interface Logs {
    id: string;
    message: string;
    context: string;
    createdAt: string;
    source: string;
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