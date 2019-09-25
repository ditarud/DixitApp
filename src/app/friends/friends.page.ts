import { Component, OnInit } from '@angular/core';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  currentUser: any;
  currentUserId: string;
  friends: Array<string>;
  pendingRequests: Array<string>;
  sendingRequests: Array<string>;


  constructor(private firestore: AngularFirestore, 
    private plt: Platform, 
    private userService: UserService,
    private navCtrl: NavController, 
    private authService: AuthenticateService) { }

  ngOnInit(){
    this.currentUserId = this.authService.userDetails().uid;
    var asd = this.userService.getUser(this.currentUserId).subscribe(res =>{
       this.currentUser = res} );
    }

  ionViewDidEnter() {
    

      this.pendingRequests = this.currentUser.friendsRequestReceived;
      this.sendingRequests = this.currentUser.friendsRequestSend;
      this.friends = this.currentUser.friends;
      console.log(this.friends);
  }

  addFriend(requestId: string){
    
  
   
    const friends = this.currentUser.friends
    var pendingFriends = this.currentUser.friendsRequestReceived;
    friends.push(requestId);
    pendingFriends = pendingFriends.filter(obj => obj !== requestId);
    
    this.userService.updateUser({
    
      friends: friends,
      friendsRequestReceived: pendingFriends,
      
  
  } , this.currentUserId);
    this.pendingRequests = this.pendingRequests.filter(obj => obj !== requestId);
  }

  rejectFriend(requestId: string){
    
    var pendingFriends = this.currentUser.friendsRequestReceived;
   
    pendingFriends = pendingFriends.filter(obj => obj !== requestId);
    
    this.userService.updateUser({
    
     
      friendsRequestReceived: pendingFriends,
      
  
  } , this.currentUserId);
    this.pendingRequests = this.pendingRequests.filter(obj => obj !== requestId);

  }

  setCurrentUser(){

  }

}
