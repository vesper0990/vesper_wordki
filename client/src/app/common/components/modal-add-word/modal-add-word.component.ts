import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WordSenderBase, WordProviderBase } from '../../services/data/data.service';
import { Word } from '../../models/Word';
import { AddWordContract, UpdateWordContract } from '../../services/data/word/sender-base.service';

@Component({
  selector: 'modal-add-word',
  templateUrl: './modal-add-word.component.html',
  styleUrls: ['./modal-add-word.component.scss']
})
export class ModalAddWordComponent {
  private _visible: boolean;
  private _action: any;

  @Input() word: Word;
  @Input() groupId: string;
  @Input() mode: 'add' | 'edit';

  @Output() success = new EventEmitter<string | boolean>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this._visible);
    if (value) {
      this.init();
    } else {
      this.destroy();
    }
  }
  get visible(): boolean {
    return this._visible;
  }

  isProcessing = false;

  constructor(private wordSender: WordSenderBase) { }

  init() {
    if (!this.word) {
      this.word = new Word();
    }
    if (this.mode === 'add') {
      this._action = this.add;
    } else {
      this._action = this.update;
    }
  }

  destroy() {
    this.word = null;
  }

  public yesClick(): void {
    this.isProcessing = true;
    this._action();

  }

  public noClick(): void {
    this.visible = false;
  }

  private add(): void {
    const contract = <AddWordContract>{
      groupId: this.groupId,
      language1: this.word.language1,
      language2: this.word.language2,
      language1Example: this.word.language1Example,
      language2Example: this.word.language2Example,
      visibility: true
    }
    this.wordSender.add(contract).subscribe(
      (wordId: string) => {
        console.log('Complete successful');
        this.success.emit(wordId);
      },
      (error: any) => {
        console.log(`Error: ${error}`)
        this.success.emit(false);
      },
      () => {
        this.isProcessing = false;
        this.visible = false;
      }
    )
  }

  private update(): void {
    const contract = <UpdateWordContract>{
      id: this.word.id,
      language1: this.word.language1,
      language2: this.word.language2,
      language1Example: this.word.language1Example,
      language2Example: this.word.language2Example,
      isVisible: this.word.isVisible
    }
    this.wordSender.update(contract).subscribe(
      () => {
        console.log('Complete successful');
      },
      (error: any) => {
        console.log(`Error: ${error}`)
      },
      () => {
        this.isProcessing = false;
      })
  }
}
