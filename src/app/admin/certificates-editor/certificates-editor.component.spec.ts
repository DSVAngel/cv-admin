import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesEditorComponent } from './certificates-editor.component';

describe('CertificatesEditorComponent', () => {
  let component: CertificatesEditorComponent;
  let fixture: ComponentFixture<CertificatesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificatesEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
