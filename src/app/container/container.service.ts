import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Box } from './box';

@Injectable()
export class ContainerService {

  readonly BOX_API = `${environment.backend}/boxes`;

  constructor(private http: HttpClient) {}

  getBoxes(): Observable<Box[]> {
    return this.http
      .get<Box[]>(this.BOX_API);
  }

  addBox(box: Box): Observable<Box> {
    return this.http
      .post<Box>(this.BOX_API, box);
  }

  removeBox(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.BOX_API}/${id}`);
  }
}
