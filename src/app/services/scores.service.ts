import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ScoreI } from '../models/scores.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  private scoreCollection: AngularFirestoreCollection<ScoreI>;
  private scores: Observable<ScoreI[]>;

  constructor(db: AngularFirestore) { 
    this.scoreCollection = db.collection<ScoreI>('scores');
    this.scores = this.scoreCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  allScores() {
    return this.scores;
  }

  getScore(id: string) {
    return this.scoreCollection.doc<ScoreI>(id).valueChanges();
  }

  updateScore(score: ScoreI, id: string) {
    return this.scoreCollection.doc(id).update(score);
  }

  addScore(score: ScoreI) {
    return this.scoreCollection.add(score);
  }

  removeScore(id: string) {
    return this.scoreCollection.doc(id).delete;
  }

}
