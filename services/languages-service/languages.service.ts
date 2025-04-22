import { Injectable } from '@angular/core';
import { Languages } from '../../models/languages/languages.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  accesLanguages = "Languages service running... ";
  private dbPath = "/languages";
  languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath)
  }

  getLanguages(): AngularFirestoreCollection<Languages>{
    return this.languagesRef;
  }
}
