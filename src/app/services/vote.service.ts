import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VoteI } from '../models/vote.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private voteCollection: AngularFirestoreCollection<VoteI>;
  private votes: Observable<VoteI[]>;

  constructor(db: AngularFirestore) {
    this.voteCollection = db.collection<VoteI>('votes');
    this.votes = this.voteCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  public userVoteAccuracy() {
    let sum = 0;
    var n = 0;
    console.log(this.votes);
    this.votes.forEach(function(value) {
      console.log("########userVoteAccuracy#########");
      n += value.length;
      value.forEach(function(i) {
        if(i.correct){
          sum += 1;
        }
      });
      sum = sum / n;
    });
    console.log("sum: " + sum);
    console.log("n: " + n);
    return sum;
  }


}
