export class BaseModel<T> {
    public id!: number;

    constructor (data: Partial<T>) {
        Object.assign(this, data);
    }
}
