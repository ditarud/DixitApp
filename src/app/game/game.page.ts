import { Component, OnInit } from '@angular/core';
import { NavController , ModalController} from '@ionic/angular';
import { BoardPage } from '../board/board.page';
import { MatchService } from '../services/match.service';
import { CardsService } from '../services/cards.service';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  deckFromDb: Array<string>;
  hand: Array<string>;
  card: string;
  matchId: string;

  constructor(private navCtrl: NavController, private modalController: ModalController, private cardService: CardsService) { 

  }


  ngOnInit() {
    //console.log(this.cardService.getAllIomage());
  }

  //DEad
  goBoard() {
      this.navCtrl.navigateForward('/board');
  }

  ngOnDestroy() {

  }

  ionViewWillEnter() {
    
  }

  dealCards(matchId: string){


  }

  drawCardFromDeck(matchId: string){

  }

  async openMyModal() {
    const myModal = await this.modalController.create({
      component: BoardPage,
      cssClass: 'modalCss'
    });
    return await myModal.present();
  }

}
