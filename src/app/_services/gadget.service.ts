import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Gadget, GadgetTable } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GadgetService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Gadget[]>(`${environment.apiUrl}/gadgets`);
    }

    getGadgets(
        pageNumber: Number,
        pageSize: Number
      ): Observable<GadgetTable> {    
      return this.http.get<GadgetTable>(`${environment.apiUrl}/gadgets?page=${pageNumber}&per_page=${pageSize}`);
    }

    saveNew(gadgetData: any) {
      return this.http.post<Gadget[]>(`${environment.apiUrl}/gadgets/saveNew`, gadgetData);
    }
}