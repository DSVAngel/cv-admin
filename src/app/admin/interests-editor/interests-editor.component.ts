import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../../../models/interests/interests.model';

@Component({
  selector: 'app-interests-editor',
  templateUrl: './interests-editor.component.html',
  styleUrls: ['./interests-editor.component.css']
})
export class InterestsEditorComponent implements OnInit {
  interests: Interests[] = [];
  interestForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  levels = ['basic', 'intermediate', 'advanced', 'expert'];

  constructor(
    private fb: FormBuilder,
    private interestsService: InterestsService
  ) {
    this.interestForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      startYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadInterests();
  }

  loadInterests(): void {
    this.isLoading = true;
    this.interestsService.getAll().subscribe({
      next: (data) => {
        this.interests = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.interestForm.valid) {
      this.isLoading = true;
      const formData = this.interestForm.value;

      if (this.editingId) {
        this.interestsService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Interés actualizado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        this.interestsService.create(formData).then(() => {
          this.showMessage('success', 'Interés creado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editInterest(interest: Interests): void {
    this.editingId = interest.id || null;
    this.interestForm.patchValue({
      name: interest.name,
      level: interest.level,
      startYear: interest.startYear
    });
  }

  deleteInterest(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar este interés?')) {
      this.isLoading = true;
      this.interestsService.delete(id).then(() => {
        this.showMessage('success', 'Interés eliminado exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.interestForm.reset();
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
