import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Word } from '@app/common/models/Word';
import { WordSenderBase } from '@app/common/services/data/data.service';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {

  content: string;
  words: Word[];
  groupId: number;

  constructor(private acitvatedRoute: ActivatedRoute,
    private wordSender: WordSenderBase,
    private router: Router) { }

  ngOnInit() {
    this.words = [];
    this.content = '';
    this.acitvatedRoute.params.subscribe(params => {
      this.groupId = params['groupId'];
    });
  }

  clear(): void {
    this.content = '';
  }

  create(): void {
    console.log(this.content);
    this.words = [];
    const lines = this.content.split(/\r?\n/);
    if (lines.length < 1) {
      return;
    }
    for (let i = 0; i < lines.length; i++) {
      const elements = lines[i].split('/');
      const newWord = new Word();
      newWord.groupId += this.groupId;
      newWord.language1 = elements[0];
      newWord.language2 = elements[1];
      if (elements.length > 2) {
        newWord.language1Example = elements[2];
        newWord.language2Example = elements[3];
      }
      this.words.push(newWord);
    }
  }

  save(): void {
    if (this.words.length === 0) {
      return;
    }
    this.wordSender.addAll(this.words)
    .subscribe((groups: Word[]) => this.onAddAllSuccess(groups), (error: any) => this.onAddAllSuccess(error));
  }

  remove(item: Word): void {
    const index = this.words.indexOf(item, 0);
    if (index > -1) {
      this.words.splice(index, 1);
    }
  }

  private onAddAllSuccess(groups: Word[]): void {
    this.router.navigate(['/wordki/group/' + this.groupId]);
  }

  private onAddAllFailed(error: any): void {
    console.log(error);
  }
}
