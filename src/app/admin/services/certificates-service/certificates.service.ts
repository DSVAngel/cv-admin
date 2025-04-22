import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GenericCrudService } from '../generic-crud/generic-crud.service';
import { certificates } from '../../../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService extends GenericCrudService<certificates> {
  constructor(db: AngularFirestore) {
    super(db, '/certificates');
  }
}
