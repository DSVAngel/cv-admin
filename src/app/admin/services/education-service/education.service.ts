import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GenericCrudService } from '../generic-crud/generic-crud.service';
import { Education } from '../../../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends GenericCrudService<Education> {
  constructor(db: AngularFirestore) {
    super(db, '/education');
  }
}
