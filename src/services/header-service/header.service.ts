import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Header } from '../../models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/header';
  private headerRef: AngularFirestoreCollection<Header>;

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  getAll(): Observable<Header[]> {
    return this.headerRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    );
  }

  getOne(id: string): Observable<Header | undefined> {
    return this.headerRef.doc(id).valueChanges();
  }

  create(header: Header): Promise<any> {
    return this.headerRef.add({ ...header });
  }

  update(id: string, data: any): Promise<void> {
    return this.headerRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }
}
