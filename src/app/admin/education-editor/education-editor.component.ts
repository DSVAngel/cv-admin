import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../../../models/education/education.model';

@Component({
  selector: 'app-education-editor',
  templateUrl: './education-editor.component.html',
  styleUrls: ['./education-editor.component.css']
})
export class EducationEditorComponent implements OnInit {
  educations: Education[] = [];
  educationForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService
  ) {
    this.educationForm = this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadEducations();
  }

  loadEducations(): void {
    this.isLoading = true;
    this.educationService.getAll().subscribe({
      next: (data) => {
        this.educations = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      this.isLoading = true;
      const formData = this.educationForm.value;

      if (this.editingId) {
        this.educationService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Registro de educación actualizado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        this.educationService.create(formData).then(() => {
          this.showMessage('success', 'Registro de educación creado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editEducation(education: Education): void {
    this.editingId = education.id || null;
    this.educationForm.patchValue({
      degree: education.degree,
      institution: education.institution,
      startYear: education.startYear,
      endYear: education.endYear,
      description: education.description
    });
  }

  deleteEducation(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar este registro de educación?')) {
      this.isLoading = true;
      this.educationService.delete(id).then(() => {
        this.showMessage('success', 'Registro de educación eliminado exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.educationForm.reset();
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
