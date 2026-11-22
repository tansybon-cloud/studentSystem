import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private apiUrl = 'https://assignment2api.sorngsiyou.com/api/students';

  constructor(private http: HttpClient) {}


  getStudents() {
    return this.http.get(this.apiUrl);
  }
    getStudentDetail(id:number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createStudent(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateStudent(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
