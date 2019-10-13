import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.scss'],
})
export class MatchListPage implements OnInit {
  activeMatches: Array<string>;
  currentUserEmail: string;
  currentUserId: string;
  today: string;
  constructor(private matchService: MatchService, private authService: AuthenticateService, private navCtrl: NavController) { }

  ngOnInit() {
    this.currentUserId = this.authService.userDetails().uid;
    this.activeMatches = ['12312', '1232131', '12312313', '12312313'];
  }

  createNewGame() {
    const now = new Date();
    this.today = now.toLocaleString();
    this.matchService.addMatch({
      status: 'en creacion',
      players: [],
      maxScore: 20,
      boardId: '',
      duration: 0,
      playerMaster: this.currentUserId,
      deckId: '',
      date: this.today,
    });
    this.navCtrl.navigateForward('/game-creation');

  }
}
