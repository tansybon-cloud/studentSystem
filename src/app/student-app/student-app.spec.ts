import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentApp } from './student-app';

describe('StudentApp', () => {
  let component: StudentApp;
  let fixture: ComponentFixture<StudentApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentApp],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
