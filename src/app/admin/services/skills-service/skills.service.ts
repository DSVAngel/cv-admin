import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GenericCrudService } from '../generic-crud/generic-crud.service';
import { skills } from '../../../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends GenericCrudService<skills> {
  constructor(db: AngularFirestore) {
    super(db, '/skills');
  }
}
