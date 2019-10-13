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
    //console.log(this.imagesFromDb);

    this.imagesFromDb = [
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/1.jpg?alt=media&token=deff7b8e-380f-460d-88a3-9b998d5a9b34',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/11.jpg?alt=media&token=ddce48d2-f951-4744-b253-c6a0097b53c5',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/6.jpg?alt=media&token=11b88b3f-2e2c-4540-95b9-d579d2eed0e2',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/8.jpg?alt=media&token=73e5ecfe-57a9-493f-afcf-8718a83df6c4',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/2.jpg?alt=media&token=6845dd73-6c02-4c68-8d3b-7e3bc6c21eea',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/7.jpg?alt=media&token=4b592df1-2f5c-441f-b086-bc1c37dfec03',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/5.jpg?alt=media&token=096538d3-f104-40e1-94d6-84bcd2c4f301',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/9.jpg?alt=media&token=5238e18c-1f36-4ee9-bf43-1e4396aeedc9',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/10.jpg?alt=media&token=f8afb265-8b5c-4a1d-a3dd-6986dd83541d',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/12.jpg?alt=media&token=3d6c33e9-db39-44a5-a6a9-1ff15edaed87',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/4.jpg?alt=media&token=f9654e38-8915-4cd2-b04a-e1a9ed30b9a5',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/13.jpg?alt=media&token=184083bd-e96b-4e57-8c9b-2c5efcd4d1d9',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/15.jpg?alt=media&token=75e6cefc-965b-4fae-bd1d-f5696dbaec43',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/28.jpg?alt=media&token=4544d52a-4601-4355-aca8-e68cb331a7e0',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/23.jpg?alt=media&token=7591153a-bf1b-4434-9cf0-092380d7a021',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/36.jpg?alt=media&token=a87cc815-a3de-4a75-9e69-8510df39e6b7',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/14.jpg?alt=media&token=65972a69-7932-4a12-8161-96884fac0ea6',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/48.jpg?alt=media&token=1ab6dc96-6c46-4a4e-91b2-f19c15557cb0',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/41.jpg?alt=media&token=11dfdbeb-d713-46af-8aff-d0c3b99bb645',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/40.jpg?alt=media&token=0fdb5839-a0f3-465f-bc86-5fd0681ad1fb',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/34.jpg?alt=media&token=be75f9ff-4755-472d-9103-fa42d9a0fe78',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/35.jpg?alt=media&token=388a2e8e-25a1-40a3-9701-40079dc12a79',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/24.jpg?alt=media&token=d7e6af99-437a-498f-a30d-24ada28fe688',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/18.jpg?alt=media&token=21b4be2e-c70e-4658-bb59-799de64c2aa9',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/32.jpg?alt=media&token=cce8f269-184d-4447-a23f-a6d42ad78042',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/46.jpg?alt=media&token=e6e6fe43-319a-43ee-8d93-1f0ead600839',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/44.jpg?alt=media&token=734a3472-c81a-499d-9f3f-129379422d67',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/27.jpg?alt=media&token=25839ebd-4f33-4ed6-b5db-5533ec5ae294',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/29.jpg?alt=media&token=af28ac40-3bd9-4d74-b7d7-d57a908d4d7b',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/25.jpg?alt=media&token=ee319f50-a0bf-49e4-924b-fe45a2a9f8df',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/38.jpg?alt=media&token=da568816-d6f6-4dd2-a2ad-d260efa287de',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/22.jpg?alt=media&token=a1cfb884-6aed-4ea0-963b-187b43418016',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/43.jpg?alt=media&token=0db164d6-6cb8-4239-af69-2fef7838e722',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/37.jpg?alt=media&token=2aece190-30d0-4e17-9b6e-a1f8de67d5bc',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/19.jpg?alt=media&token=61fd9eeb-71b1-4c16-932d-79473c9a2baf',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/45.jpg?alt=media&token=b04115a1-e453-4b25-81ea-86acbf5eb780',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/16.jpg?alt=media&token=3b7c5240-4338-4388-a94a-285672ace321',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/47.jpg?alt=media&token=902684c3-5107-447c-87de-a487a21188e3',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/26.jpg?alt=media&token=0e4d2b5e-0ac1-4dba-8b61-6de975c2c2df',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/33.jpg?alt=media&token=b2659332-4020-4862-b497-9c101106b4f2',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/17.jpg?alt=media&token=885f92f9-fc5f-4f54-b0e5-32737625b53e',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/39.jpg?alt=media&token=099ecc11-99cc-462f-81ed-9855faaa71c1',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/20.jpg?alt=media&token=ffe64772-b5d4-4b0b-ab38-a90681b61692',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/21.jpg?alt=media&token=7261b546-45e8-4b33-be2c-1a8d957938e5',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/42.jpg?alt=media&token=b9848f71-930b-4a39-bbe7-f8ee49160245',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/59.jpg?alt=media&token=30dab932-afdb-4df6-969e-4c1bc12ab57a',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/70.jpg?alt=media&token=ecea07f2-b483-4f5c-990e-47fc908b5fba',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/50.jpg?alt=media&token=8d252c22-8797-407b-9088-cc36eb69bc81',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/52.jpg?alt=media&token=2b01fb43-3b1e-44d7-b97d-9e035227e8bd',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/67.jpg?alt=media&token=8b913955-52b8-4fb5-9efc-e86e8f8d9423',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/53.jpg?alt=media&token=d9680a38-88b5-484b-a3f9-1bbc8fb97267',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/72.jpg?alt=media&token=8de74b2b-bd29-47d5-8bf9-978786f052bf',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/51.jpg?alt=media&token=e9caeba7-dd0f-42f7-b0df-bf80a38b1d06',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/31.jpg?alt=media&token=702e73ca-e660-404a-9a42-f0b24b23e19f',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/57.jpg?alt=media&token=f7e59720-96e2-4fc6-844f-6234857c9d84',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/49.jpg?alt=media&token=c0fd4078-aea3-4497-865a-543c7bbd524b',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/71.jpg?alt=media&token=f61b86f8-8b0d-4a11-8b65-06d8221f06c8',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/62.jpg?alt=media&token=0ef1125a-4fd0-48ca-80af-bc7377c3a0c1',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/63.jpg?alt=media&token=84591c16-3b86-48b7-a904-500f256df41c',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/61.jpg?alt=media&token=b04c411e-de7a-44e1-80e6-285206373bf5',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/66.jpg?alt=media&token=fcfbd0ab-5f67-4a10-a756-60f42608aa57',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/65.jpg?alt=media&token=5fbc73b6-613e-45b4-8b03-11a15097b190',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/54.jpg?alt=media&token=984fb05e-0bb7-433a-93a8-ae67c8626eb4',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/64.jpg?alt=media&token=8d7206ae-23cf-4f09-b62f-571212b95549',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/69.jpg?alt=media&token=89a26bb4-dcf8-42b1-9b77-2c897ef78f2f',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/56.jpg?alt=media&token=c6e84aa4-9f4e-4420-885c-f449c2f53de1',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/55.jpg?alt=media&token=8bf6a02d-6ebc-4fe7-be4c-e9985be43d1d',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/60.jpg?alt=media&token=20148de5-2452-44d5-a802-13a1f95e7614',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/58.jpg?alt=media&token=525a30fc-2ec9-459a-a687-480f105912a4',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/68.jpg?alt=media&token=37f1a658-d21e-461a-b7e3-7f0a4da3a8f8',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/30.jpg?alt=media&token=8eda97bb-f630-4957-b98e-467ed633bcf3',
      'https://firebasestorage.googleapis.com/v0/b/dixit-3ccf3.appspot.com/o/3.jpg?alt=media&token=5d8595ae-b558-4ee0-bd8c-bb39bf075886"',
    ]

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
