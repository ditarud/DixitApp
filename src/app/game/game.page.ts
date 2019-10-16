import { Component, OnInit } from '@angular/core';
import { NavController , ModalController} from '@ionic/angular';
import { BoardPage } from '../board/board.page';
import { MatchService } from '../services/match.service';
import { CardsService } from '../services/cards.service';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
    this.matchCollection = this.matchService.getMatch(matchId).subscribe(res =>{
      console.log(res.deck)} );
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
