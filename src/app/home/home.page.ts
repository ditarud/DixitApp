import { Component, OnInit } from '@angular/core';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { stringify } from 'querystring';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userEmail: string;
  users: UserI[];
  currentUserId: any;
  user: UserI;
  currentUser: UserI;

  public goalList: any[];
  public loadedGoalList: any[];

  constructor(private firestore: AngularFirestore, 
              private plt: Platform, 
              private userService: UserService,
              private localNotifications: LocalNotifications,
              private navCtrl: NavController, 
              private authService: AuthenticateService) {

    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('Click:', res);
        let msg = res.data ? res.data.mydata : '';
    });
      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger:', res);
        let msg = res.data ? res.data.mydata : '';
    });

    });

  }

  ngOnInit(){
    this.userService.getUsers().subscribe(res =>  this.users = res);
    this.firestore.collection('userProfile').valueChanges()
    .subscribe(goalList => {
      this.goalList = goalList;
      this.loadedGoalList = goalList;
      this.goalList = this.goalList.filter(obj => obj.email !== this.authService.userDetails().email);
  
      


  });
  }

  initializeItems(): void {
    this.goalList = this.loadedGoalList;    
    this.goalList = this.goalList.filter(obj => obj.email !== this.authService.userDetails().email);

    

  }

  filterList(evt) {
    this.initializeItems();
  
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.goalList = this.goalList.filter(currentGoal => {
      if (currentGoal.email != this.authService.userDetails().email && searchTerm) {
        
        if (currentGoal.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  goDashboard(){
    this.navCtrl.navigateForward('/dashboard');

  }

  goMyFriends(){
    this.navCtrl.navigateForward('/friends');

  }
  scheduleNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Tal Señor te quiere agregar como amigo',
      data: {mydata: 'My hidden messa this is'},
      trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true,
      lockscreen: true,
      priority: 2,

    });
  }

  addFriend(userId: string){
    this.currentUserId = this.authService.userDetails().uid;
    var userToAdd = this.userService.getUser(userId).subscribe(res =>  this.user = res);
    var currentUser = this.userService.getUser(this.currentUserId).subscribe(res => this.currentUser = res);
    console.log(this.user);
    const name = this.user.name;
    const email = this.user.email;
    const friendsRequestReceived = this.user.friendsRequestReceived;
    const friends = this.user.friends;
    const friendsRequestSend = this.currentUser.friendsRequestSend;

    
    friendsRequestReceived.push(this.currentUserId);
    friendsRequestSend.push(userId);
    
    // Actualiza la lista de solicitud de amigos enviados del usuario logueado
    this.userService.updateUser({
    
      friendsRequestSend: friendsRequestSend,
      
  
  } , this.currentUserId);
  
    // Actualiza la lista de solicitud de amigos recibidos del usuario a agregar
    this.userService.updateUser({
      friendsRequestReceived: friendsRequestReceived,
   
  } , userId);
  }
  

}
