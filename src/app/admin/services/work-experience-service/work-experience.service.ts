import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GenericCrudService } from '../generic-crud/generic-crud.service';
import { WorkExperience } from '../../../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService extends GenericCrudService<WorkExperience> {
  constructor(db: AngularFirestore) {
    super(db, '/work-experience');
  }
}
