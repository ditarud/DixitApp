import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchService } from '../services/match.service';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';


import { CardsService } from '../services/cards.service';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.scss'],
})
export class MatchListPage implements OnInit, OnDestroy {
  activeMatches: Array<string> = [];
  temporalactiveMatches: Array<string> = [];
  currentUserEmail: string;
  currentUserId: string;
  currentUser: any;
  today: string;
  matchDeck: Array<string>;
  imagesFromDb: Array<string>;
  asd: Subscription;
  asd2: Subscription;
  matchStatus: string;
  matchId: string;
  check: boolean;
  check2: boolean;

  

  constructor(private matchService: MatchService, 
    private authService: AuthenticateService, 
    private navCtrl: NavController , 
    private cardService: CardsService,
    private router: Router) { 
      this.temporalactiveMatches = [];
      this.check2 = true;
    }


  ngOnInit() {
    this.matchDeck = [];
    this.temporalactiveMatches = [];
    this.currentUserId = this.authService.userDetails().uid;
    this.currentUserEmail = this.authService.userDetails().email;
    
      
     if (this.matchDeck.length < 73 && this.check2 === true) {
      this.matchDeck = this.cardService.getAllIomage();
      this.check2 = false;

     } 
  }
    
    
  

  ngOnDestroy() {
    //this.check = false;

  }

  ionViewWillEnter() {
    this.check = true;
    
  }

  ionViewDidEnter() {   
    console.log("Did Enter");
    this.temporalactiveMatches = [];
    
    this.asd = this.matchService.getAllMatches().pipe(first()).subscribe(res => { 
      res.forEach(element => {
        if ((element.playerMaster === this.currentUserId && this.check === true) || (element.showToAll === true && element.players.includes(this.currentUserEmail) && this.check===true)) {
          console.log(element.id);
         
            if (this.temporalactiveMatches.indexOf(element.id) === -1) {
              this.temporalactiveMatches.push(element.id);
              this.matchId = element.id;
              
           this.asd2 = this.matchService.getMatch(element.id).pipe(first()).subscribe(res => { 
              this.matchStatus = res.status;
           });

            }
           
        
          
         
        };
        this.activeMatches = this.temporalactiveMatches;


        
      });
   
      });
     
      
  }

  createNewGame() {    

    this.check = true;
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
      deck: this.matchDeck,
      cardsInGame: [],
      discardedCards: [],
      winner: '',
      showToAll: false,
    });
    
    this.navCtrl.navigateForward('/game-creation');
    //this.imagesFromDb = this.cardService.getAllIomage();

    //this.CreateDeck();
   }

   

   loadRunningGame(matchId: string) {
    this.check = false;
    let navigationExtras: NavigationExtras = {
      state: {
        matchId: matchId,
      }
    };
 
    this.asd.unsubscribe();
    this.asd2.unsubscribe();
    this.router.navigate(['game-creation'], navigationExtras);
   }

  CreateDeck() { 
    let record = {};
    record['cards_on_deck'] = this.imagesFromDb;
    record['discarded_cards'] = [];
    record['match_id'] = this.matchId;
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
