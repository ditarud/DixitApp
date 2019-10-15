import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit, OnDestroy {
  currentUser: any;
  currentUserId: string;
  friends: Array<string>;
  pendingRequests: Array<string>;
  sendingRequests: Array<string>;
  asd: Subscription;
  currentUserEmail: string;


  constructor(private firestore: AngularFirestore, 
    private plt: Platform, 
    private userService: UserService,
    private navCtrl: NavController, 
    private authService: AuthenticateService) { }

  ngOnInit(){
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

  ngOnDestroy() {
   
  }

  ionViewDidEnter() {

    this.pendingRequests = this.currentUser.friendsRequestReceived;
    this.sendingRequests = this.currentUser.friendsRequestSend;
    this.friends = this.currentUser.friends;

  }
  
  

  addFriend(requestId: string) {


    const email = requestId;
    const friends = this.currentUser.friends;
    var pendingFriends = this.currentUser.friendsRequestReceived;
    friends.push(requestId);


    pendingFriends = pendingFriends.filter(obj => obj !== requestId);
    
    
    this.userService.updateUser({
      friends: friends,
      friendsRequestReceived: pendingFriends,
  }, this.currentUserId);

    this.pendingRequests = this.pendingRequests.filter(obj => obj !== requestId);

   
    this.asd = this.userService.getUsers().pipe(first()).subscribe(res => {   
      res.forEach(element => {
        if (element.email === email) {
        const friendsS = element.friends;
        var sendingFriends = element.friendsRequestSend;
        console.log(sendingFriends);
        friendsS.push(this.currentUser.email);
        sendingFriends = sendingFriends.filter(obj => obj !== this.currentUser.email);
        this.userService.updateUser({
        friends: friendsS,
        friendsRequestSend: sendingFriends,
    }, element.id);
  }
  });  
  });
 
    this.sendingRequests = this.sendingRequests.filter(obj => obj !== this.currentUser.email);

  }

  rejectFriend(requestId: string) {

    var pendingFriends = this.currentUser.friendsRequestReceived;
    pendingFriends = pendingFriends.filter(obj => obj !== requestId);

    this.userService.updateUser({
      friendsRequestReceived: pendingFriends,
    } , this.currentUserId);

    this.pendingRequests = this.pendingRequests.filter(obj => obj !== requestId);

  }


}
