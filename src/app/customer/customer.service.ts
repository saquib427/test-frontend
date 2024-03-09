import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class CustomerService {
    private readonly baseURL: string = environment.apiURL;

    constructor(private http: HttpClient) { }

    getCustomerList() {
        return this.http.get(this.baseURL.concat(`/Customer`));
    }

    getCustomerById(id: number) {
        return this.http.get(this.baseURL.concat(`/Customer/${id}`));
    }

    postCustomerForm(data: any) {
        return this.http.post(this.baseURL.concat(`/Customer`), data);
    }

    updateCustomerForm(data: any) {
        return this.http.put(this.baseURL.concat(`/Customer`), data);
    }
}