import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
import { CardsService } from '../services/cards.service';
import * as firebase from 'firebase';


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
  currentUser: UserI;
  friendsRequestReceived: any;
  friendsRequestSend: any;
  requestReceive: any;
  requestSend: any;
  currentUserStatus: any;
  statusUpdated: any;
  currentUserEmail: string;
  public unsubscribeBackEvent: any;


  public goalList: any[];
  public loadedGoalList: any[];
  pendingRequests: Array<string>;

  constructor(private firestore: AngularFirestore,
              private plt: Platform,
              private userService: UserService,
              private localNotifications: LocalNotifications,
              private navCtrl: NavController,
              private authService: AuthenticateService,
              public alertController: AlertController, 
              private cardService: CardsService
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

  ngOnInit(){
    //console.log(this.cardService.getAllIomage());    

    //this.userService.getUsers().subscribe(res =>  this.users = res);
    this.currentUserEmail = this.authService.userDetails().email;
    this.initializeBackButtonCustomHandler();
    if(this.authService.userDetails()) {
      this.currentUserId = this.authService.userDetails().uid;
      var asd = this.userService.getUser(this.currentUserId).subscribe(res =>{
          this.currentUser = res , this.pendingRequests = this.currentUser.friendsRequestReceived; });

      } else {
          this.navCtrl.navigateBack('');
        }
    
    this.updateDoc('Online');

    this.firestore.collection('userProfile').valueChanges()
    
    .subscribe(goalList => {
      //this.goalList = goalList;
      this.loadedGoalList = goalList;
      this.goalList = this.goalList.filter(obj => obj.email !== this.authService.userDetails().email);

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

    this.goalList = this.goalList.filter(currentGoal => {
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
  scheduleNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'X te quiere agregar como amigo',
      data: {mydata: 'My hidden messa this is'},
      trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
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
    this.requestReceive = this.userService.getUser(this.currentUserId).pipe(first()).subscribe(res => {this.user = res,
      this.currentUserStatus = res.status,
      this.currentUserStatus = value,
      this.userService.updateUser({
        status: this.currentUserStatus,
      } , this.currentUserId); });
    
    //this.requestReceive.unsubscribe();
}

}
