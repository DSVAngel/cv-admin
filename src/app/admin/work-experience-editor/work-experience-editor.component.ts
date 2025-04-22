import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../../../models/work-experience/work-experience.model';

@Component({
  selector: 'app-work-experience-editor',
  templateUrl: './work-experience-editor.component.html',
  styleUrls: ['./work-experience-editor.component.css']
})
export class WorkExperienceEditorComponent implements OnInit {
  experiences: WorkExperience[] = [];
  experienceForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private workExperienceService: WorkExperienceService
  ) {
    this.experienceForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      position: ['', Validators.required],
      company: ['', Validators.required],
      accomplishments: ['']
    });
  }

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.isLoading = true;
    this.workExperienceService.getAll().subscribe({
      next: (data) => {
        this.experiences = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      this.isLoading = true;
      const formData = this.experienceForm.value;

      if (this.editingId) {
        this.workExperienceService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Experiencia actualizada exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        this.workExperienceService.create(formData).then(() => {
          this.showMessage('success', 'Experiencia creada exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editExperience(experience: WorkExperience): void {
    this.editingId = experience.id || null;
    this.experienceForm.patchValue({
      startDate: experience.startDate,
      endDate: experience.endDate,
      location: experience.location,
      position: experience.position,
      company: experience.company,
      accomplishments: experience.accomplishments
    });
  }

  deleteExperience(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar esta experiencia laboral?')) {
      this.isLoading = true;
      this.workExperienceService.delete(id).then(() => {
        this.showMessage('success', 'Experiencia eliminada exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.experienceForm.reset();
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
