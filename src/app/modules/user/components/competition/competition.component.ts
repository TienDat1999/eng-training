import {Component, OnInit, OnDestroy} from '@angular/core';
import {CompetitionService} from '@app/modules/user/services/competition/competition.service';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {SignalrService} from '@app/modules/user/services/signalr.service';
import {UserCompetition} from '@app/modules/user/models/competition.model';


@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, OnDestroy {
  words: CrawWordModel[] = [];
  word: CrawWordModel;
  indexWord: 0;
  numberQuestion: number;
  myInfo: UserCompetition = new UserCompetition({
    userName: this.userName,
  });
  competitor: UserCompetition = new UserCompetition();
  myId: string;
  constructor(private competitionS: CompetitionService,
              private signalS: SignalrService) {
  }

  ngOnInit(): void {
    this.onGetWordCompetition();
    this.signalS.connection.on('GetResultCompetition', result => {
      console.log(result);
    });
  }
  get roomName(): string {
    const value = localStorage.getItem('RoomName');
    return value;
  }
  get userName(): string {
    const value = JSON.parse(localStorage.getItem('userEnglishTraining')) ;
    return value?.userName;
  }
  ngOnDestroy(): void {
   // this.signalS.connection.invoke('RemoveFromGroup', 'name1').then();
  }

  onGetWordCompetition(): void {
    this.signalS.connection.on('SendWords', (value) => {
      if (!!value){
        this.numberQuestion = value.words.length;
        this.words = value.words;
        this.word = this.initWordItem(value.words[0]);
        this.competitor.userName = value.competitor;
      }
    });
  }
  // Chosen correct
  callBackNextWordHandel(userId): void {
    this.indexWord += 1;
    if (this.myId === userId){
      this.myInfo.resultCorrect += 1;
    }else{
      this.competitor.resultCorrect += 1;
    }
    const value = this.signalS.userOl.filter(user => user.key === userId);
    const idConnection = value[0].value[0];
    this.signalS.connection.invoke('SendResultCompetition', 'name1', idConnection).then();
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
