import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchDocumentsPage } from './search-documents.page';

describe('SearchDocumentsPage', () => {
  let component: SearchDocumentsPage;
  let fixture: ComponentFixture<SearchDocumentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
