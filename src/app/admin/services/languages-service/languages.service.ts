import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GenericCrudService } from '../generic-crud/generic-crud.service';
import { Languages } from '../../../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends GenericCrudService<Languages> {
  constructor(db: AngularFirestore) {
    super(db, '/languages');
  }
}
