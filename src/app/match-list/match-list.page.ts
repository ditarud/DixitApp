import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.scss'],
})
export class MatchListPage implements OnInit {
  activeMatches: Array<string>;

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.activeMatches = ['12312', '1232131', '12312313', '12312313'];
  }

  createNewGame() {
    // Incompleto
    this.matchService.addMatch({status: 'bla', maxScore: 20, });

  }
}
