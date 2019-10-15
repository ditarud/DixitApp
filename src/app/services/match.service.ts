import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchI } from '../models/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private matchCollection: AngularFirestoreCollection<MatchI>;
  private matches: Observable<MatchI[]>;

  constructor(db: AngularFirestore) {
    this.matchCollection = db.collection<MatchI>('match');
    this.matches = this.matchCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
   }
 ;

   getAllMatches() {
     return this.matches;
   }

   getMatch(id: string) {
     return this.matchCollection.doc<MatchI>(id).valueChanges();
   }

   updateMatch(match: MatchI, id: string) {
     return this.matchCollection.doc(id).update(match);
   }

   addMatch(match: MatchI) {
     return this.matchCollection.add(match);
   }

   removeMatch(id: string) {
     return this.matchCollection.doc(id).delete;
   }
  }
