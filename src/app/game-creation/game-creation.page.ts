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
  
  
  pendingPlayInvitations: Array<string> = [];
  sendInvitation: any;
  players: Array<string> = [];
  


  constructor(private firestore: AngularFirestore,
              private userService: UserService,
              private authService: AuthenticateService, 
              private plt: Platform,
              private navCtrl: NavController,
              private route: ActivatedRoute, 
              private router: Router,
              private matchService: MatchService
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
    const asd2 = this.matchService.getMatch(this.matchId).subscribe(res => {
      this.players = res.players;
    })

    } else {
        this.navCtrl.navigateBack('');
        this.asd.unsubscribe();
      }
}

ionViewDidEnter() {
  this.friends = this.currentUser.friends;
}

inviteFriendToMatch(email: string){
  this.currentUserId = this.authService.userDetails().uid;


  this.asd = this.userService.getUsers().pipe(first()).subscribe(res => {
    res.forEach(element => { 
      if (element.email === email) {
      this.pendingPlayInvitations = element.pendingPlayInvitations;
      this.pendingPlayInvitations.push(this.currentUserEmail);
      this.userService.updateUser({
      pendingPlayInvitations: this.pendingPlayInvitations, 
     }, element.id);

    }});
  });
}

createNewMatch() 
{
  this.navCtrl.navigateForward('/game');
}

refreshView() {

}

}




