import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GenericCrudService } from '../generic-crud/generic-crud.service';
import { Interests } from '../../../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService extends GenericCrudService<Interests> {
  constructor(db: AngularFirestore) {
    super(db, '/interests');
  }
}
