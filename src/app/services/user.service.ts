import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<UserI>;
  private users: Observable<UserI[]>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<UserI>('userProfile');
    this.users = this.userCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
   }
 ;

   getUsers(){
     return this.users;
   }


   getUser(id: string){
     return this.userCollection.doc<UserI>(id).valueChanges();
   }  

   updateUser(user: UserI, id: string){
     return this.userCollection.doc(id).update(user);
   }

   addUser(user: UserI){
     return this.userCollection.add(user);
   }

   removeUser(id: string){
     return this.userCollection.doc(id).delete;
   }
}
