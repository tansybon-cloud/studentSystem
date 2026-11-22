import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../service/api';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList implements OnInit {

  students: any[] = [];
  searchText: string = '';          // កំណត់ប្រភេទជា string
  selectedDepartment: string = '';  // កំណត់ប្រភេទជា string

  constructor(
    private router: Router,
    private studentService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getStudentsData();
  }

  getStudentsData() {
    this.studentService.getStudents().subscribe({
      next: (response: any) => {
        console.log("Students API Response:", response);
        this.students = Array.isArray(response)
          ? response
          : (response.data || response.value || []);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error fetching students:', err);
      }
    });
  }


  get filteredStudents() {
    if (!this.students || !Array.isArray(this.students)) {
      return [];
    }

    return this.students.filter(student => {
      const fullName = student.full_name ? student.full_name.toLowerCase() : '';
      const email = student.email ? student.email.toLowerCase() : '';
      const search = this.searchText ? this.searchText.toLowerCase().trim() : '';


      const matchesSearch = fullName.includes(search) || email.includes(search);

      // ពិនិត្យមើល Department
      const matchesDepartment =
        !this.selectedDepartment || student.department === this.selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }

  // កែប្រែ path ឱ្យត្រូវគ្នាទៅនឹង Routing ដែលអ្នកបានបង្កើត (/updatestudent/:id)
  editStudent(id: number) {
    this.router.navigate(['/updatestudent', id]);
  }


  deleteStudentData(id: number) {
    if (confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.getStudentsData();
        },
        error: (err) => {
          console.error('Error deleting student:', err);
        }
      });
    }
  }

}
