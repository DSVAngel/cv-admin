import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderEditorComponent } from './header-editor/header-editor.component';
import { WorkExperienceEditorComponent } from './work-experience-editor/work-experience-editor.component';
import { EducationEditorComponent } from './education-editor/education-editor.component';
import { SkillsEditorComponent } from './skills-editor/skills-editor.component';
import { CertificatesEditorComponent } from './certificates-editor/certificates-editor.component';
import { LanguagesEditorComponent } from './languages-editor/languages-editor.component';
import { InterestsEditorComponent } from './interests-editor/interests-editor.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderEditorComponent,
    WorkExperienceEditorComponent,
    EducationEditorComponent,
    SkillsEditorComponent,
    CertificatesEditorComponent,
    LanguagesEditorComponent,
    InterestsEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
