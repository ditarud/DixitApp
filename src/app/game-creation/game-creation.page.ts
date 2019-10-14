import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { AuthenticateService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { NavController, ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.page.html',
  styleUrls: ['./game-creation.page.scss'],
})
export class GameCreationPage implements OnInit {
  currentUserId: any;
  currentUser: UserI;
  friendList: any;
  currentFriendList: any;
  user: any;
  urrentUser: any;
  friends: Array<string>;
  pendingRequests: Array<string>;
  sendingRequests: Array<string>;
  asd: Subscription;
  currentUserEmail: string;

  constructor(private firestore: AngularFirestore,
              private userService: UserService,
              private authService: AuthenticateService, 
              private plt: Platform,
              private navCtrl: NavController,
    ) { }

  ngOnInit() {
    this.currentUserEmail = this.authService.userDetails().email;

    if(this.authService.userDetails()) {
    this.currentUserId = this.authService.userDetails().uid;
    var asd = this.userService.getUser(this.currentUserId).subscribe(res =>{
       this.currentUser = res} );

    } else {
        this.navCtrl.navigateBack('');
        this.asd.unsubscribe();
      }
}

ionViewDidEnter() {
  this.friends = this.currentUser.friends;
}
}




