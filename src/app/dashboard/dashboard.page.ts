import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { VoteService } from '../services/vote.service';
import { MatchService } from '../services/match.service'
import { VoteI } from '../models/vote.interface';
import { first } from 'rxjs/operators';
import { MatchI } from '../models/match.interface';
import { match } from 'minimatch';




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
  lastMatch: MatchI; //ignore me
  wins: number
  playedMatches: number;
  winRatio: number;


  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private voteService: VoteService,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.userEmail = this.authService.userDetails().uid;
      this.getAvg();
      this.getLastMatch();
      this.getWins();
      console.log(this.lastMatch);
    }else{
      this.navCtrl.navigateBack('');
    }

  }
  // calculates de agv acuracy that the player has on voting for cards
  getAvg(){
    this.voteService.userVotes().pipe(first()).subscribe(res => {
      var sum = 0;
      var n = res.length;
      res.forEach(value => {
        if(value.correct && value.user == this.userEmail){
          sum += 1;
        }
      })
      this.avg = sum / n;
    })
  }

  // gets the results of the last match played by de logged player
  // doesn`t matter if the player wins or not
  getLastMatch(){
    var matches = [];
    this.matchService.getAllMatches().pipe(first()).subscribe(res =>{
      res.forEach(value => {
        if(value.players.includes(this.userEmail)){
          matches.push(value);
        }
      })
      this.lastMatch = matches.pop();
    })
  }

  getWins() {
    var wins = 0;
    var total = 0;
    this.matchService.getAllMatches().pipe(first()).subscribe(res =>{
      res.forEach(value => {
        if(value.winner == this.userEmail){
          wins += 1;
        }
        total += 1;
      })
      this.wins = wins;
      this.playedMatches = total;
      this.winRatio = wins / total;
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
