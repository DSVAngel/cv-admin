import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationEditorComponent } from './education-editor.component';

describe('EducationEditorComponent', () => {
  let component: EducationEditorComponent;
  let fixture: ComponentFixture<EducationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
