import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { CardsService } from '../services/cards.service';
import { MatchService } from '../services/match.service';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  userEmailSend: string;
  userEmailReceived: string;
  // users: UserI[];
  currentUserId: any;
  user: any;
  currentUser: UserI  = null;
  friendsRequestReceived: any;
  friendsRequestSend: any;
  requestReceive: any;
  requestSend: any;
  currentUserStatus: any;
  statusUpdated: any;
  currentUserEmail: string;
  public unsubscribeBackEvent: any;
  updateStatus: any;
  goalList2: any;
  playerToAddId: any;

  public goalList: any[] = [];
  public loadedGoalList: any[];
  pendingRequests: Array<string> = [];
  pendingInvitations: Array<string> = [];
  players: Array<string> = [];

  constructor(private firestore: AngularFirestore,
              private plt: Platform,
              private userService: UserService,
              private localNotifications: LocalNotifications,
              private navCtrl: NavController,
              private authService: AuthenticateService,
              public alertController: AlertController, 
              private cardService: CardsService,
              private matchService: MatchService,
              ) {


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

  ngOnInit() {

    this.currentUserEmail = this.authService.userDetails().email;
    this.initializeBackButtonCustomHandler();
    if(this.authService.userDetails()) {
      this.currentUserId = this.authService.userDetails().uid;
       
      this.updateDoc('Online');
      
      var asd = this.userService.getUser(this.currentUserId).subscribe(res =>{
          this.currentUser = res , 
          this.pendingRequests = this.currentUser.friendsRequestReceived,
          this.pendingInvitations = this.currentUser.pendingPlayInvitations; });

      } else {
          this.navCtrl.navigateBack('');
        }
    
   

    this.firestore.collection('userProfile').valueChanges()
    .subscribe(goalList => {
      this.loadedGoalList = goalList;
      this.goalList = this.goalList.filter(obj => obj.email !== this.authService.userDetails().email);

      if ( this.pendingRequests.length > 0) {
        this.scheduleNotificationFriend(this.pendingRequests.length);
     }
      if ( this.pendingInvitations.length > 0) {
       this.scheduleNotificationInvitation(this.pendingInvitations.length);
     }
    

  });


  }

  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.plt.backButton.subscribeWithPriority(999999,  () => {
       
    });
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }

  ngOnDestroy() {
    
  }

  ionvViewWillEnter() {
    this.initializeBackButtonCustomHandler();
    if ( this.pendingRequests.length > 0) {
      this.scheduleNotificationFriend(this.pendingRequests.length);
   }
    if ( this.pendingInvitations.length > 0) {
      this.scheduleNotificationInvitation(this.pendingInvitations.length);
   }
 
    
  }

  ionViewWillLeave(){
    this.unsubscribeBackEvent.unsubscribe();
  }

  ionViewDidEnter() {
    
    this.pendingRequests = this.currentUser.friendsRequestReceived;
   

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

    this.goalList2 = this.goalList.filter(currentGoal => {
      if (currentGoal.email !== this.authService.userDetails().email && searchTerm) {

        if (currentGoal.email === searchTerm) {
          return true;
        }
        return false;
      }
    });
  }

  logout() {
    this.updateDoc('Offline');
    
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }

  

  goDashboard() {
    this.navCtrl.navigateForward('/dashboard');

  }

  goMyFriends() {
    this.navCtrl.navigateForward('/friends');
  }

  goMatchList() {
    this.navCtrl.navigateForward('/match-list');
  }
  
  scheduleNotificationFriend(notificationsNumber: number) {
    this.localNotifications.schedule({
      id: 1,
      title: 'Solicitud de Amistad',
      text: 'Tienes ' + notificationsNumber + ' solicitudes pendientes',
      data: {mydata: 'My hidden messa this is'},
      trigger: {in: 1, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true,
      lockscreen: true,
      priority: 2,

    });
  }

  scheduleNotificationInvitation(notificationsNumber: number) {
    this.localNotifications.schedule({
      id: 1,
      title: 'Invitación a jugar',
      text: 'Tienes ' + notificationsNumber + ' invitaciones a jugar pendientes',
      data: {mydata: 'My hidden messa this is'},
      trigger: {in: 1, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true,
      lockscreen: true,
      priority: 2,

    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }


  async addFriend(userId: string, email: string) {

    const alert = await this.alertController.create({
      header: 'Agregar amigo',
      message: '¿Quieres agregar a este usuario como amigo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Agregar',
          handler: () => {

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
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
    this.requestReceive.unsubscribe();
    this.requestSend.unsubscribe();

  }
  
  updateDoc(value: string) {
    
    this.currentUserId = this.authService.userDetails().uid;
    this.updateStatus = this.userService.getUser(this.currentUserId).pipe(first()).subscribe(res => {this.user = res,
      this.currentUserStatus = res.status,
      this.currentUserStatus = value,
      this.userService.updateUser({
        status: this.currentUserStatus,
      } , this.currentUserId); });
    
    
}

addUserToMatch(email: string) {

  const searchEmail = this.userService.getUsers().pipe(first()).subscribe(res => {   
    res.forEach(element => {
      if (element.email === email) {
       this.playerToAddId = element.id;
      this.pendingInvitations = this.pendingInvitations.filter(obj => obj !== element.email);
      this.userService.updateUser({
      pendingPlayInvitations: this.pendingInvitations,
  }, this.currentUserId);
}
});  
});

 const updateMatch = this.matchService.getAllMatches().pipe(first()).subscribe(res => {  
   res.forEach(element => {
   
     this.players = element.players;
     this.players.push(this.currentUserEmail);

     if (element.playerMaster === this.playerToAddId) {
      console.log(element.id);
       this.matchService.updateMatch({
         players: this.players,
       } , element.id);
     }
   });
  });
}

}
