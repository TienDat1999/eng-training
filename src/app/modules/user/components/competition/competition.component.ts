import {Component, OnInit, OnDestroy} from '@angular/core';
import {CompetitionService} from '@app/modules/user/services/competition/competition.service';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {SignalrService} from '@app/modules/user/services/signalr.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, OnDestroy {
  words: CrawWordModel[] = [];
  word: CrawWordModel;
  indexWord: 0;
  constructor(private competitionS: CompetitionService,
              private signalS: SignalrService) {}

  ngOnInit(): void {
    this.onGetWordCompetition();
    this.signalS.connection.on('SendChatMessage', result => {
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.signalS.connection.invoke('RemoveFromGroup', 'name1').then();
  }

  onGetWordCompetition(): void {
    this.signalS.connection.on('SendWords', (value) => {
      if (!!value){
        this.words = value;
        this.word = this.initWordItem(value[0]);
      }
    });
  }
  // Chosen correct
  callBackNextWordHandel(userId): void {
    this.indexWord += 1;
    const value = this.signalS.userOl.filter(user => user.key === userId);
    const idConnection = value[0].value[0];
    this.signalS.connection.invoke('SendChatMessage', 'name1', idConnection).then(result => {
      console.log('sended');
    });
    this.word = this.initWordItem(value[this.indexWord]);
  }
  initWordItem(word: CrawWordModel): CrawWordModel{
    return new CrawWordModel({
      wordEng: word.wordEng,
      audioUrl: word.audioUrl,
      wordType: word.wordType,
      example: word.example,
      ipa: word.ipa,
      define: word.define,
    });
  }
}
