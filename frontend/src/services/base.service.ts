import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BaseModel } from 'src/models/base-model';
import { map, tap } from 'rxjs';

export class BaseService<T extends BaseModel<T>> {
    protected BASE_URL: string;

    constructor(
        protected http: HttpClient,
        private modelConstructor: {new (m: Partial<T>, ...args: unknown[]): T},
        protected endpoint: string,

    ) {
        this.BASE_URL = environment.apiUrl;
     }

    public get () {
        return this.http.get<T[]>(`${this.BASE_URL}/${this.endpoint}/`).pipe(
            map(results => results.map(response => new this.modelConstructor(response)))
        )
    }

    public getById (id: number) {
        return this.http.get<T>(`${this.BASE_URL}/${this.endpoint}/${id}`).pipe(
            map(response => new this.modelConstructor(response))
        )
    }

    public create (data: Partial<T>) {
        return this.http.post<T>(`${this.BASE_URL}/${this.endpoint}/`, data).pipe(
            map(response => new this.modelConstructor(response))
        );
    }

    public update (id: number, data: Partial<T>) {
        return this.http.put<T>(`${this.BASE_URL}/${this.endpoint}/${id}/`, data).pipe(
            map(response => new this.modelConstructor(response))
        )
    }

    public delete (id: number) {
        return this.http.delete(`${this.BASE_URL}/${this.endpoint}/${id}/`);
    }

}
