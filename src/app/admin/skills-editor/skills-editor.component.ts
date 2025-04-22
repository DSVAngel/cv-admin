import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from '../services/skills-service/skills.service';
import { skills } from '../../../models/skills/skills.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsServices {
}

@Component({
  selector: 'app-skills-editor',
  templateUrl: './skills-editor.component.html',
  styleUrls: ['./skills-editor.component.css']
})
export class SkillsEditorComponent implements OnInit {
  skillsList: skills[] = [];
  skillForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'];
  levels = ['basic', 'intermediate', 'advanced', 'expert'];

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],
      yearsofExperience: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.isLoading = true;
    this.skillsService.getAll().subscribe({
      next: (data) => {
        this.skillsList = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      this.isLoading = true;
      const formData = this.skillForm.value;

      if (this.editingId) {
        this.skillsService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Habilidad actualizada exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        this.skillsService.create(formData).then(() => {
          this.showMessage('success', 'Habilidad creada exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editSkill(skill: skills): void {
    this.editingId = skill.id || null;
    this.skillForm.patchValue({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      yearsofExperience: skill.yearsofExperience
    });
  }

  deleteSkill(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar esta habilidad?')) {
      this.isLoading = true;
      this.skillsService.delete(id).then(() => {
        this.showMessage('success', 'Habilidad eliminada exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.skillForm.reset();
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
