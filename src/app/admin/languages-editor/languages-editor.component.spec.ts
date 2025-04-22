import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesEditorComponent } from './languages-editor.component';

describe('LanguagesEditorComponent', () => {
  let component: LanguagesEditorComponent;
  let fixture: ComponentFixture<LanguagesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguagesEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
