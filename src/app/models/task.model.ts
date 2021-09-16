export class Task {
    id: number = -1;
    label: string| undefined;
    status: string | undefined;

    public constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
};