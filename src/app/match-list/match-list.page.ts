import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchService } from '../services/match.service';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';



import { CardsService } from '../services/cards.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.scss'],
})
export class MatchListPage implements OnInit, OnDestroy {
  activeMatches: Array<string>;
  temporalactiveMatches: Array<string>;
  currentUserEmail: string;
  currentUserId: string;
  currentUser: any;
  today: string;
  matchDeck: Array<string>;
  imagesFromDb: Array<string>;
  asd: Subscription;
  matchStatus: string;

  constructor(private matchService: MatchService, 
    private authService: AuthenticateService, 
    private navCtrl: NavController , 
    private cardService: CardsService) { 
      
    }


  ngOnInit() {
    this.temporalactiveMatches = []
    

  }

  ngOnDestroy() {

  }

  ionViewWillEnter() {
    
  }

  ionViewDidEnter() {   
    this.currentUserId = this.authService.userDetails().uid;
    var asd = this.matchService.getAllMatches().pipe(first()).subscribe(res => { 
      res.forEach(element => {
        if (element.playerMaster === this.currentUserId) {
          this.temporalactiveMatches.push(element.id);
           this.matchService.getMatch(element.id).pipe(first()).subscribe(res => {
              this.matchStatus = res.status;
           });
          
        }
        this.activeMatches = this.temporalactiveMatches;
        console.log(this.activeMatches);
        
      });
      });

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

   loadRunningGame() {
    
   }

  CreateDeck() {
     //this.imagesFromDb = this.cardService.getAllIomage(); 


    let record = {};
    record['cards_on_deck'] = this.imagesFromDb;
    record['discarded_cards'] = [];
    record['match_id'] = 'aer';
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
