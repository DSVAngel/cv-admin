import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { skills } from "../../models/skills/skills.model";

@Injectable({
  providedIn: "root",
})
export class SkillsService {
  accesSkills = "Skills service running... ";
  private dbPath = "/skills";
  skillsRef: AngularFirestoreCollection<skills>;
  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }
  getSkills(): AngularFirestoreCollection<skills> {
    return this.skillsRef;
  }
}
