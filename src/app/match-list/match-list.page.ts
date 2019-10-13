import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';


import { CardsService } from '../services/cards.service';


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
  matchDeck: Array<string>;
  imagesFromDb: Array<string>;

  constructor(private matchService: MatchService, 
    private authService: AuthenticateService, 
    private navCtrl: NavController , 
    private cardService: CardsService) { }


  ngOnInit() {
    this.currentUserId = this.authService.userDetails().uid;
    this.activeMatches = ['12312', '1232131', '12312313', '12312313'];
    this.imagesFromDb = this.cardService.getAllIomage();
    

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
    this.CreateDeck();
   }

  CreateDeck() {
     //this.imagesFromDb = this.cardService.getAllIomage(); 


    let record = {};
    record['cards_on_deck'] = this.imagesFromDb;
    record['discarded_cards'] = [];
    record['match_id'] = 'esta si que si';
    record['playing_cards'] = [];

    this.cardService.createDeckForGame(record).then(resp => {
      // console.log(this.cardService.getAllIomage());
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}
