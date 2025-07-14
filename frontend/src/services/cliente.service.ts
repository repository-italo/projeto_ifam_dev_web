import { Injectable } from "@angular/core";
import { Cliente, ClienteDTO } from "src/models/cliente-model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService {

    constructor(private http: HttpClient) {
        super();
     }

    getClientes() {
        return this.http.get<Cliente[]>(`${this.BASE_URL}/clientes/`).pipe(
            map((clients) => clients.map(client => new Cliente(client.id, client.nome, client.sobrenome, client.cpf)))
        )
    }

    getClienteById(id: number) {
        return this.http.get<Cliente>(`${this.BASE_URL}/clientes/${id}/`).pipe(
            map(client => new Cliente(client.id, client.nome, client.sobrenome, client.cpf))
        );
    }

    create(cliente: ClienteDTO) {
        return this.http.post<Cliente>(`${this.BASE_URL}/clientes/`, cliente).pipe(
            map(client => new Cliente(client.id, client.nome, client.sobrenome, client.cpf))
        );
    }

    update(id: number, updatedCliente: ClienteDTO) {
        return this.http.put<Cliente>(`${this.BASE_URL}/clientes/${id}/`, updatedCliente).pipe(
            map(client => new Cliente(client.id, client.nome, client.sobrenome, client.cpf))
        );
    }

    delete(id: number) {
        return this.http.delete(`${this.BASE_URL}/clientes/${id}/`);
    }
}
