import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { VoteService } from '../services/vote.service';
import { VoteI } from '../models/vote.interface';
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
  userEmail: string;
  userId: string;
  userVotes: Array<VoteI>;
  avg: number;


  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private voteService: VoteService
  ) { }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.userEmail = this.authService.userDetails().uid;
      this.getAvg();
    }else{
      this.navCtrl.navigateBack('');
    }

  }

  getAvg(){
    this.voteService.userVotes().pipe(first()).subscribe(res => {
      var sum = 0;
      var n = res.length;
      res.forEach(value => {
        if(value.correct){
          sum += 1;
        }
      })
      this.avg = sum / n;
      console.log(this.avg);
    })
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

}
