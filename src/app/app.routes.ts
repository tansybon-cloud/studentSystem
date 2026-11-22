import { Routes } from '@angular/router';
import { StudentApp } from './student-app/student-app';
import { StudentList } from './student-list/student-list';
import { StudentId } from './student-id/student-id';
import { Editstudent } from './editstudent/editstudent';
import { DeleteStudent } from './delete-student/delete-student';

export const routes: Routes = [
  { path: '', redirectTo: 'student-list', pathMatch: 'full' },
  { path: 'student-view', component: StudentApp },
  { path: 'student-list', component: StudentList },
  { path: 'student-detail/:id', component: StudentId},
  {path:'updatastudent/:id',component:Editstudent},
  { path: 'delete-student/:id',component:DeleteStudent},
  { path: '**', redirectTo: 'student-list' }
];
