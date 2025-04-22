import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Interests } from "../../models/interests/interests.model";

@Injectable({
  providedIn: "root",
})
export class InterestsService {
  accesInterests = "Interest service running... ";
  private dbPath = "/interests";
  interestsRef: AngularFirestoreCollection<Interests>;
  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }
  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }
}
