import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menuItems = [
    { path: 'header', title: 'Header', icon: '📋' },
    { path: 'work-experience', title: 'Experiencia Laboral', icon: '💼' },
    { path: 'education', title: 'Educación', icon: '🎓' },
    { path: 'skills', title: 'Habilidades', icon: '🔧' },
    { path: 'certificates', title: 'Certificaciones', icon: '🏆' },
    { path: 'languages', title: 'Idiomas', icon: '🌍' },
    { path: 'interests', title: 'Intereses', icon: '⭐' }
  ];

  constructor() { }
}
