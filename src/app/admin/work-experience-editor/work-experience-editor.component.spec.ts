import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceEditorComponent } from './work-experience-editor.component';

describe('WorkExperienceEditorComponent', () => {
  let component: WorkExperienceEditorComponent;
  let fixture: ComponentFixture<WorkExperienceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkExperienceEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkExperienceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
