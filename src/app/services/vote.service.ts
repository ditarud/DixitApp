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

  public userVotes() {
    return this.votes;
  }

  getVote(id: string) {
    return this.voteCollection.doc<VoteI>(id).valueChanges();
  }

  updateVote(vote: VoteI, id: string) {
    return this.voteCollection.doc(id).update(vote);
  }

  addVote(vote: VoteI) {
    return this.voteCollection.add(vote);
  }

  removeVote(id: string) {
    return this.voteCollection.doc(id).delete;
  }


}
