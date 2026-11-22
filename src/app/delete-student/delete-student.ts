import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-delete-student',
  styleUrl: './delete-student.css',
  templateUrl: './delete-student.html',
})
export class DeleteStudent implements OnInit {
  studentId: number = 0;
  studentData: any = null;
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // យក ID ពី URL (ឧទាហរណ៍៖ /delete-student/10)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.studentId = Number(idParam);
      this.loadStudentDetail();
    }
  }

  // ទាញយកព័ត៌មានសិស្សម្នាក់មកបង្ហាញផ្ទៀងផ្ទាត់មុនពេលលុប
  loadStudentDetail() {
    this.apiService.getStudentDetail(this.studentId).subscribe({
      next: (response: any) => {
        this.studentData = response.data || response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
      }
    });
  }

  // មុខងារបញ្ជាក់ការលុបតាម API DELETE /api/students/{id}
  confirmDelete() {
    this.apiService.deleteStudent(this.studentId).subscribe({
      next: () => {
        this.successMessage = 'Student deleted successfully!';
        this.cdr.detectChanges();

        // ត្រឡប់ទៅទំព័របញ្ជីឈ្មោះវិញក្រោយ ១.៥វិនាទី
        setTimeout(() => {
          this.router.navigate(['/student-list']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error deleting student:', err);
        alert('Could not delete student. Please try again.');
      }
    });
  }
}
