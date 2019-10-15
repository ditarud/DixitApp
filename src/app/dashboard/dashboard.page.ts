import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { VoteService } from '../services/vote.service';
import { VoteI } from '../models/vote.interface';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
  userEmail: string;
  userId: string;
  userVotes: Array<VoteI>;
  avg: any;


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
    console.log("#####getAvg#####");
    console.log(this.voteService.userVoteAccuracy());
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
