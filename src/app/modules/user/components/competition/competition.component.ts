import {Component, OnInit, OnDestroy} from '@angular/core';
import {CompetitionService} from '@app/modules/user/services/competition/competition.service';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {SignalrService} from '@app/modules/user/services/signalr.service';
import {RoomData, RoomUpdated, UserCompetition} from '@app/modules/user/models/competition.model';
import {RoomService} from '@app/modules/user/services/room/room.service';
import {Router} from "@angular/router";
import Swal from "sweetalert2";


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
  roomData: RoomData;
  competitor: UserCompetition = new UserCompetition();
  myId: string;
  A: UserCompetition;
  B: UserCompetition;

  constructor(private competitionS: CompetitionService,
              private signalS: SignalrService,
              private roomS: RoomService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    // this.onGetWordCompetition();
   // this.handleReloadGroup();
    this.onRoomData();
    // this.signalS.connection.on('GetResultCompetition', result => {
    //   console.log(result);
    this.onGetWordCompetition();
  }

  handleReloadGroup(): void {
    debugger
    const roomData = JSON.parse(localStorage.getItem('RoomData'));
    if (!!roomData) {
     this.signalS.connection.invoke('AddToGroup', this.roomName, null, null).then();
    }
  }

  get roomName(): string {
  //  debugger
    const value = localStorage.getItem('RoomName');
    return value;
  }

  get getMyId(): string {
    const value = JSON.parse(localStorage.getItem('userEnglishTraining'));
    return value?.userId;
  }

  ngOnDestroy(): void {
    // this.signalS.connection.invoke('RemoveFromGroup', 'name1').then();
    console.log('destroy');
    this.roomS.removeRoomData(this.roomName).subscribe();
    localStorage.removeItem('RoomData');
    localStorage.removeItem('RoomName');
  }

  onGetWordCompetition(): void {
    setTimeout(() => {
      this.signalS.connection.on('GetResultCompetition', (value) => {
        if (!!value) {
          console.log(value);
          this.roomData.userA =  this.roomData.userA.userId === value.userA.userId ? value.userA : value.userB ;
          this.roomData.userB =  this.roomData.userB.userId === value.userB.userId ? value.userB : value.userA ;
          this.roomData.indexWord = value.indexWord;
          this.roomData.words = value.words;
          if (value.indexWord === value.words.length){
            if (this.roomData.userA.resultCorrect > this.roomData.userB.resultCorrect){
              Swal.fire(
                'Competition!',
                'You win!',
                'success'
              );
              const roomUpdated = new RoomUpdated({
                roomName: this.roomName,
                userId: this.getMyId,
              });
              this.roomS.updateRoomData(roomUpdated).subscribe();
            }else {
              Swal.fire(
                'Competition!',
                'You lose!',
                'warning'
              );
            }
            setTimeout(() => {
              this.router.navigate(['/course']);
            }, 3000);
          }else {
            setTimeout(() => {
              this.word = this.initWordItem(this.roomData.words[this.roomData.indexWord]);
              localStorage.setItem('RoomData', JSON.stringify(this.roomData));
            }, 100);
          }
        }
      });
    }, 100);
  }

  // Chosen correct
  callBackNextWordHandel(userId): void {
    console.log(userId);
    this.roomData.userA.resultCorrect += 1;
    this.roomData.indexWord += 1;
    // // send result
    this.signalS.connection.invoke('SendResultCompetition', this.roomName,  this.roomData).then();
    // // store
    localStorage.setItem('RoomData', JSON.stringify(this.roomData));
  }

  onRoomData(): void {
    const roomData = JSON.parse(localStorage.getItem('RoomData'));
    if (!!roomData) {
      this.roomData = roomData;
      this.word = this.initWordItem(roomData.words[roomData.indexWord]);
    } else {
      setTimeout(() => {
        if (!!this.roomName){
          this.roomS.getRoomData(this.roomName).subscribe(value => {
            console.log(value);
            value.users[0].forEach(user => {
              if (user.userId === this.getMyId) {
                this.A = new UserCompetition({
                  userName: user.userName,
                  userId: user.userId,
                  connectionId: user.connectionId,
                });
              } else {
                this.B = new UserCompetition({
                  userName: user.userName,
                  userId: user.userId,
                  connectionId: user.connectionId,
                });
              }
            });
            this.roomData = new RoomData({
              words: value.words[0],
              totalWords: value.words[0].length,
              userA: this.A,
              userB: this.B,
            });
            console.log(this.roomData);
            this.word = this.initWordItem(this.roomData.words[0]);
            localStorage.setItem('RoomData', JSON.stringify(this.roomData));
          });
        }
      }, 500);
    }
  }

  initWordItem(word: CrawWordModel): CrawWordModel {
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
