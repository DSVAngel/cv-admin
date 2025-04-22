import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CrudDocument {
  id?: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class GenericCrudService<T extends CrudDocument> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(
    protected db: AngularFirestore,
    @Inject(String) protected collectionPath: string
  ) {
    this.collection = db.collection<T>(collectionPath);
  }

  getAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        } as T))
      )
    );
  }

  getOne(id: string): Observable<T | undefined> {
    return this.collection.doc<T>(id).valueChanges();
  }

  create(data: T): Promise<any> {
    const { id, ...dataWithoutId } = data;
    return this.collection.add(dataWithoutId as T);
  }

  update(id: string, data: Partial<T>): Promise<void> {
    const { id: dataId, ...dataWithoutId } = data;
    return this.collection.doc(id).update(dataWithoutId as Partial<T>);
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}
