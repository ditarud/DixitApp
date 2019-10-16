import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { ScoresService } from '../services/scores.service';
import { ScoreI } from '../models/scores.interface';


@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  userEmail: string;
  userId: string;
  matchId: string;
  scores: Array<ScoreI>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private authService: AuthenticateService,
    private scoreService: ScoresService
    ) {
      this.matchId = navParams.get('matchId');
     }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.userId = this.authService.userDetails().uid;
      this.getScores();
      console.log(this.scores);
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  getScores() {
    var matchScores = [];
    this.scoreService.allScores().pipe(first()).subscribe(res =>{
      res.forEach(value => {
        if (value.match == this.matchId){
          matchScores.push(value);
        }
      })
      this.scores = matchScores;
      console.log(this.scores);
    })
  }

}
