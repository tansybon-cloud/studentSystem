import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../service/api';

// ១. បង្កើត Interface ដើម្បីកំណត់ប្រភេទទិន្នន័យ (ជំនួសឱ្យការប្រើ any)
export interface Student {
  id?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  status?: string;
  department?: string;
  photo?: string;
}

@Component({
  standalone: true, // បន្ថែមបើអ្នកប្រើ Angular 17+ Standalone Component
  imports: [CommonModule,RouterLink],
  selector: 'app-student-id',
  templateUrl: './student-id.html',
  styleUrl: './student-id.css',
})
export class StudentId implements OnInit {

  studentId: number = 0;

  // ២. ប្រើ Interface ជំនួស any, និងកំណត់តម្លៃដើមជា null
  studentDetailData: Student | null = null;

  // ៣. បន្ថែមអថេរសម្រាប់គ្រប់គ្រង Loading និង Error
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private studentApi: Api,
    private route: ActivatedRoute,
    private router: Router // បន្ថែម Router ដើម្បី Redirect បើមាន Error ធ្ងន់ធ្ងរ
  ) {}

  ngOnInit() {
    // ទាញយក ID ពី URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.studentId = Number(idParam);
      this.showDetail();
    } else {
      this.errorMessage = 'មិនមានលេខសម្គាល់ (ID) របស់សិស្សនៅក្នុង URL ទេ។';
      this.isLoading = false;
    }
  }

  showDetail() {
    this.isLoading = true;
    this.errorMessage = '';

    this.studentApi.getStudentDetail(this.studentId).subscribe({
      next: (response: any) => {
        // ផ្ទៀងផ្ទាត់ថាទិន្នន័យពិតជាមាន
        if (response) {
          this.studentDetailData = response;
        } else {
          this.errorMessage = 'មិនបានរកឃើញទិន្នន័យសិស្សនេះទេ។';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching student detail:', err);
        this.errorMessage = 'មានបញ្ហាក្នុងការទាញយកទិន្នន័យ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។';
        this.isLoading = false;
      }
    });
  }
}
