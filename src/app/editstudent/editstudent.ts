import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-editstudent',
  styleUrl: './editstudent.css',
  templateUrl: './editstudent.html',
})
export class Editstudent implements OnInit {
  studentId: number = 0;

  studentData = {
    full_name: '',
    email: '',
    department: '',
    date_of_birth: '',
    status: 'Active'
  };

  successMessage: string = '';
  selectedFile: File | null = null;
  currentPhoto: string = '';

  constructor(
    private apiService: Api,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getStudent();
  }

  // ទាញយកព័ត៌មានសិស្សមកបង្ហាញក្នុង Form ស្រាប់
  getStudent() {
    this.apiService.getStudentDetail(this.studentId).subscribe({
      next: (response: any) => {
        const data = response.data || response;
        this.studentData = {
          full_name: data.full_name,
          email: data.email,
          department: data.department,
          date_of_birth: data.date_of_birth,
          status: data.status || 'Active'
        };
        this.currentPhoto = data.photo;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching student detail:', err);
      }
    });
  }

  // មុខងារសម្រាប់ចាប់យករូបភាពថ្មី
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // មុខងារអាប់ដេតទិន្នន័យដោយប្រើ FormData
  updateNewStudentData() {
    const formData = new FormData();
    formData.append('full_name', this.studentData.full_name);
    formData.append('email', this.studentData.email);
    formData.append('department', this.studentData.department);
    formData.append('date_of_birth', this.studentData.date_of_birth);
    formData.append('status', this.studentData.status);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    // ប្រសិនបើ API Backend ជា Laravel និងត្រូវការ _method PUT ជាមួយ FormData
    // formData.append('_method', 'PUT');

    this.apiService.updateStudent(this.studentId, formData).subscribe({
      next: () => {
        this.successMessage = 'Student updated successfully!';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/student-list']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error updating student:', err);
        alert('Error: ' + JSON.stringify(err.error?.errors || err.error));
      }
    });
  }
}
