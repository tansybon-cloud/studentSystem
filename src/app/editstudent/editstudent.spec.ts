import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editstudent } from './editstudent';

describe('Editstudent', () => {
  let component: Editstudent;
  let fixture: ComponentFixture<Editstudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editstudent],
    }).compileComponents();

    fixture = TestBed.createComponent(Editstudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
