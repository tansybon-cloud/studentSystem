import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentId } from './student-id';

describe('StudentId', () => {
  let component: StudentId;
  let fixture: ComponentFixture<StudentId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentId],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
