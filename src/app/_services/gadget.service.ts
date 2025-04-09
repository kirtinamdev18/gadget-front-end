import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Gadget } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class GadgetService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Gadget[]>(`${environment.apiUrl}/gadgets`);
    }
}