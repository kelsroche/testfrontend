import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Comments } from '../../../shared/model/comments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private beUrl = environment.backendUrl;
  private comPath = this.beUrl + '/comments';

  getComList(): Observable<Comments[]> {
    return this.http.get<Comments[]> (this.comPath)
  };

  getComId(id: number): Observable<Comments> {
    const url = `${this.comPath}/${id}`;
    return this.http.get<Comments>(url);
  }

  addComSrvc(comments: Comments): Observable<Comments> {
    return this.http.post<Comments>(this.comPath, comments, httpOptions);
  }

  updateComSrvc(comments: Comments): Observable<any> {
    const url = `${this.comPath}/${comments.comId}`;
    return this.http.put(url, comments, httpOptions);
  }

  deleteComSrvc(id: number): Observable<any> {
    const url = `${this.comPath}/${id}/delete`;
    return this.http.delete(url);
  }

  constructor(private http: HttpClient) { }
}
