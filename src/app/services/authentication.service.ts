import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserI } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable()
export class AuthenticateService {
  private users: UserI;

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth
    ) {
      db.firestore.settings({ timestampsInSnapshots: true });      
      
    }

  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/userProfile/${newUserCredential.user.uid}`)
        .set({ email: value.email, status: '', friends: [] , name: '' , userId: newUserCredential.user.uid , friendsRequestReceived: [], 
        friendsRequestSend: [], });
    }).then ( res => resolve(res), err => reject(err))
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  });
}
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err));
   });
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }
}
