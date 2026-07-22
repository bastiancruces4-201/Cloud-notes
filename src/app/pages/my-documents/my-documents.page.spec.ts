import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDocumentsPage } from './my-documents.page';

describe('MyDocumentsPage', () => {
  let component: MyDocumentsPage;
  let fixture: ComponentFixture<MyDocumentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
