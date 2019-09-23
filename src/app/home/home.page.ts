import { Component, OnInit } from '@angular/core';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: UserI[];
  constructor(private plt: Platform, private userService:UserService,private localNotifications: LocalNotifications) {
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
  

}
