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
import { MatchService } from '../services/match.service'
import { ActivatedRoute, Router } from '@angular/router';

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
  friends: Array<string>;
  pendingRequests: Array<string>;
  sendingRequests: Array<string>;
  asd: Subscription;
  currentUserEmail: string;
  matchId: any;

  userEmailSend: string;
  userEmailReceived: string;
  
  
  friendsRequestReceived: any;
  friendsRequestSend: any;
  requestReceive: any;
  requestSend: any;


  constructor(private firestore: AngularFirestore,
              private userService: UserService,
              private authService: AuthenticateService, 
              private plt: Platform,
              private navCtrl: NavController,
              private route: ActivatedRoute, 
              private router: Router,
    ) { 
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.matchId = this.router.getCurrentNavigation().extras.state.matchId;
           console.log(this.matchId);
        }
      });

    }

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

inviteFriendToMatch(userId: string, email: string){
  this.userEmailReceived = this.authService.userDetails().email;
  this.currentUserId = this.authService.userDetails().uid;

  this.requestReceive = this.userService.getUser(userId).pipe(first()).subscribe(res => {  this.user = res , 
    this.friendsRequestReceived = res.friendsRequestReceived,
    this.friendsRequestReceived.push(this.userEmailReceived),
    this.userService.updateUser({
      friendsRequestReceived: this.friendsRequestReceived,
    } , userId); });


  this.requestSend = this.userService.getUser(this.currentUserId).pipe(first()).subscribe(res => { this.currentUser = res ,
    this.friendsRequestSend = res.friendsRequestSend,
    this.friendsRequestSend.push(email),
    this.userService.updateUser({
      friendsRequestSend: this.friendsRequestSend,
    } , this.currentUserId);
  });

}

createNewMatch() 
{
  this.navCtrl.navigateForward('/game');
}

refreshView() {

}

}




