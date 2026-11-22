import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-student-app',
  styleUrl: './student-app.css',
  templateUrl: './student-app.html',
})
export class StudentApp implements OnInit {

  studentData = {
    full_name: '',
    email: '',
    department: '',
    date_of_birth: '',
    status: 'Active'
  };

  selectedFile: File | null = null;
isEditMode: any;
currentPhoto: any;
successMessage: any;

  constructor(
    private router: Router,
    private studentService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('full_name', this.studentData.full_name);
    formData.append('email', this.studentData.email);
    formData.append('department', this.studentData.department);
    formData.append('date_of_birth', this.studentData.date_of_birth);
    formData.append('status', this.studentData.status);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.studentService.createStudent(formData).subscribe({
      next: (response: any) => {
        console.log('Student added successfully:', response);
        this.router.navigate(['/student-list']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error adding student:', err);
      }
    });
  }
}
