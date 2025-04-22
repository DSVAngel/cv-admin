import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../../../models/languages/languages.model';

@Component({
  selector: 'app-languages-editor',
  templateUrl: './languages-editor.component.html',
  styleUrls: ['./languages-editor.component.css']
})
export class LanguagesEditorComponent implements OnInit {
  languages: Languages[] = [];
  languageForm: FormGroup;
  editingId: string | null = null;
  isLoading = false;
  message: { type: 'success' | 'error', text: string } | null = null;

  proficiencyLevels = ['Basic', 'Intermediate', 'Advanced', 'Native'];

  constructor(
    private fb: FormBuilder,
    private languagesService: LanguagesService
  ) {
    this.languageForm = this.fb.group({
      name: ['', Validators.required],
      proficiency: ['', Validators.required],
      certified: [false]
    });
  }

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.isLoading = true;
    this.languagesService.getAll().subscribe({
      next: (data) => {
        this.languages = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', 'Error al cargar los datos: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.languageForm.valid) {
      this.isLoading = true;
      const formData = this.languageForm.value;

      if (this.editingId) {
        this.languagesService.update(this.editingId, formData).then(() => {
          this.showMessage('success', 'Idioma actualizado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al actualizar: ' + error.message);
          this.isLoading = false;
        });
      } else {
        this.languagesService.create(formData).then(() => {
          this.showMessage('success', 'Idioma creado exitosamente');
          this.resetForm();
          this.isLoading = false;
        }).catch((error) => {
          this.showMessage('error', 'Error al crear: ' + error.message);
          this.isLoading = false;
        });
      }
    }
  }

  editLanguage(language: Languages): void {
    this.editingId = language.id || null;
    this.languageForm.patchValue({
      name: language.name,
      proficiency: language.proficiency,
      certified: language.certified
    });
  }

  deleteLanguage(id: string | undefined): void {
    if (id && confirm('¿Está seguro de que desea eliminar este idioma?')) {
      this.isLoading = true;
      this.languagesService.delete(id).then(() => {
        this.showMessage('success', 'Idioma eliminado exitosamente');
        this.isLoading = false;
      }).catch((error) => {
        this.showMessage('error', 'Error al eliminar: ' + error.message);
        this.isLoading = false;
      });
    }
  }

  resetForm(): void {
    this.languageForm.reset({ certified: false });
    this.editingId = null;
  }

  private showMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
