import { Component, OnInit } from '@angular/core';
import { NavController , ModalController} from '@ionic/angular';
import { BoardPage } from '../board/board.page';
import { MatchService } from '../services/match.service';
import { CardsService } from '../services/cards.service';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { first, min, max } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  deckFromDb: Array<string>;
  hand: Array<string>;
  card: string;
  matchId: any;
  test: any;
  matchCollection: any;
  item: any;
  cardPositions: Array<number>;
  randoms: any;
  allCards: Array<string>;
  images: Array<string>;

  constructor(private navCtrl: NavController, 
              private modalController: ModalController, 
              private cardService: CardsService,
              private firestore: AngularFirestore,
              private route: ActivatedRoute,
              private matchService: MatchService,
              private router: Router,
              ) { 
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.matchId = this.router.getCurrentNavigation().extras.state.matchId;
                     
                  }
                });
  }


  ngOnInit() {
    //console.log(this.cardService.getAllIomage());
    //console.log(this.matchId);
    this.dealCards(this.matchId);
  }

  //DEad
  goBoard() {
      this.navCtrl.navigateForward('/board');
  }

  ngOnDestroy() {

  }

  ionViewWillEnter() {

  }

  dealCards(matchId: string) {
    var randoms = [...Array(6)].map(虚 => Math.floor(Math.random() * 72));    
    this.matchCollection = this.matchService.getMatch(matchId).subscribe(res =>{
      this.deckFromDb = res.deck;
      for (let card of this.deckFromDb){
        this.allCards.push(card);
      }
    } );
    console.log(this.allCards);
    
  }

  showCardOnHtml(){
    this.images = ['https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/15.jpg?alt=media&token=75e6cefc-965b-4fae-bd1d-f5696dbaec43',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/5.jpg?alt=media&token=096538d3-f104-40e1-94d6-84bcd2c4f301',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/1.jpg?alt=media&token=deff7b8e-380f-460d-88a3-9b998d5a9b34']

    return this.images;
  }

  showHand() {
    return ['https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/20.jpg?alt=media&token=ffe64772-b5d4-4b0b-ab38-a90681b61692',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/10.jpg?alt=media&token=f8afb265-8b5c-4a1d-a3dd-6986dd83541d',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/13.jpg?alt=media&token=184083bd-e96b-4e57-8c9b-2c5efcd4d1d9',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/19.jpg?alt=media&token=61fd9eeb-71b1-4c16-932d-79473c9a2baf',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/24.jpg?alt=media&token=d7e6af99-437a-498f-a30d-24ada28fe688',
    'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/23.jpg?alt=media&token=7591153a-bf1b-4434-9cf0-092380d7a021']
  }

  drawCardFromDeck(matchId: string) {

  }

  async openMyModal() {
    const myModal = await this.modalController.create({
      component: BoardPage,
      cssClass: 'modalCss'
    });
    return await myModal.present();
  }

}
