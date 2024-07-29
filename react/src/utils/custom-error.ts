export class CustomError {
    message: string;
    status: number;
    ok: boolean;
    type: string;
    statusText: string;
    constructor(data: { statusText: string, ok: boolean, type: string, status: number }) {
        this.message = data.statusText;
        this.ok = data.ok;
        this.status = data.status;
        this.type = data.type;
        this.statusText = data.statusText;
    }
}