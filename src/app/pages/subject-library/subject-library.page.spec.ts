import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectLibraryPage } from './subject-library.page';

describe('SubjectLibraryPage', () => {
  let component: SubjectLibraryPage;
  let fixture: ComponentFixture<SubjectLibraryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
