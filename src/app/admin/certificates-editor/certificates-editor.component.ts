import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { certificates } from '../../../models/certificates/certificates.model';

@Component({
  selector: 'app-certificates-editor',
  templateUrl: './certificates-editor.component.html',
  styleUrls: ['./certificates-editor.component.css']
})
export class CertificatesEditorComponent implements OnInit {
  certificates: certificates[] = [];
  certificateForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private certificatesService: CertificatesService
  ) {
    this.certificateForm = this.fb.group({
      name: ['', Validators.required],
      organization: ['', Validators.required],
      issueDate: ['', Validators.required],
      expirationDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.isLoading = true;
    this.certificatesService.getAll().subscribe({
      next: (data) => {
        this.certificates = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.certificateForm.valid) {
      this.isLoading = true;
      const formData = this.certificateForm.value;

      if (this.editingId) {
        this.certificatesService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Certificado actualizado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        this.certificatesService.create(formData).then(() => {
          this.showMessage('success', 'Certificado creado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editCertificate(certificate: certificates): void {
    this.editingId = certificate.id || null;
    this.certificateForm.patchValue({
      name: certificate.name,
      organization: certificate.organization,
      issueDate: certificate.issueDate,
      expirationDate: certificate.expirationDate
    });
  }

  deleteCertificate(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar este certificado?')) {
      this.isLoading = true;
      this.certificatesService.delete(id).then(() => {
        this.showMessage('success', 'Certificado eliminado exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.certificateForm.reset();
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
