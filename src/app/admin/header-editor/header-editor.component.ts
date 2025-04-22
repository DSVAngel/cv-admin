import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../../../services/header-service/header.service';
import { Header } from '../../../models/header/header.model';

@Component({
  selector: 'app-header-editor',
  templateUrl: './header-editor.component.html',
  styleUrls: ['./header-editor.component.css']
})
export class HeaderEditorComponent implements OnInit {
  headers: Header[] = [];
  headerForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private headerService: HeaderService
  ) {
    this.headerForm = this.fb.group({
      name: ['', Validators.required],
      goalLife: ['', Validators.required],
      photoUrl: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      location: ['', Validators.required],
      socialNetwork: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadHeaders();
  }

  loadHeaders(): void {
    this.isLoading = true;
    this.headerService.getAll().subscribe({
      next: (data) => {
        this.headers = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.headerForm.valid) {
      this.isLoading = true;
      const formData = this.headerForm.value;

      if (this.editingId) {
        // Actualizar registro existente
        this.headerService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Registro actualizado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        // Crear nuevo registro
        this.headerService.create(formData).then(() => {
          this.showMessage('success', 'Registro creado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editHeader(header: Header): void {
    this.editingId = header.id || null;
    this.headerForm.patchValue({
      name: header.name,
      goalLife: header.goalLife,
      photoUrl: header.photoUrl,
      email: header.email,
      phoneNumber: header.phoneNumber,
      location: header.location,
      socialNetwork: header.socialNetwork
    });
  }

  deleteHeader(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar este registro?')) {
      this.isLoading = true;
      this.headerService.delete(id).then(() => {
        this.showMessage('success', 'Registro eliminado exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.headerForm.reset();
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
