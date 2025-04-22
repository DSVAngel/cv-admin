import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { certificates } from "../../models/certificates/certificates.model";

@Injectable({
  providedIn: "root",
})
export class CertificatesService {
  private dbPath = "/certificates";

  certificatesRef: AngularFirestoreCollection<certificates>;
  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }
  getCertificates(): AngularFirestoreCollection<certificates> {
    return this.certificatesRef;
  }

  accesCertificates = "Certificates service running... ";
}
