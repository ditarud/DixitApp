import { Injectable, Component } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class CardsService { 
  someTextUrl;
  firestore = firebase.storage();
  images_from_firebase: Array<string> = [];
  images_names: Array<string> = [];

  constructor(private fs: AngularFirestore
    ) {
   }

   getAllIomage() {
      for (let i = 1; i <= 72; i++) {
        this.images_names.push(String(i) + '.jpg');
      }
      for (let entry of this.images_names) {
        this.firestore.refFromURL('gs://dixit-3ccf3.appspot.com/').child(entry).getDownloadURL().then((url) => {
        this.images_from_firebase.push(url);
      })}
      return this.images_from_firebase;
    } 
  
  createDeckForGame(deck) {
    return this.fs.collection('deck').add(deck);
  }

  addFriendsToMatch(friend) {
    return this.fs.collection('match').valueChanges();
  }
}

