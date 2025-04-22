import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsEditorComponent } from './interests-editor.component';

describe('InterestsEditorComponent', () => {
  let component: InterestsEditorComponent;
  let fixture: ComponentFixture<InterestsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
