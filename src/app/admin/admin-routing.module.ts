import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderEditorComponent } from './header-editor/header-editor.component';
import { WorkExperienceEditorComponent } from './work-experience-editor/work-experience-editor.component';
import { EducationEditorComponent } from './education-editor/education-editor.component';
import { SkillsEditorComponent } from './skills-editor/skills-editor.component';
import { CertificatesEditorComponent } from './certificates-editor/certificates-editor.component';
import { LanguagesEditorComponent } from './languages-editor/languages-editor.component';
import { InterestsEditorComponent } from './interests-editor/interests-editor.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'header', pathMatch: 'full' },
      { path: 'header', component: HeaderEditorComponent },
      { path: 'work-experience', component: WorkExperienceEditorComponent },
      { path: 'education', component: EducationEditorComponent },
      { path: 'skills', component: SkillsEditorComponent },
      { path: 'certificates', component: CertificatesEditorComponent },
      { path: 'languages', component: LanguagesEditorComponent },
      { path: 'interests', component: InterestsEditorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
