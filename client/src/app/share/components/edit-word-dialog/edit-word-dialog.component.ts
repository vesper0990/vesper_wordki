import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EditWord } from './edit-word.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-word-dialog',
  templateUrl: './edit-word-dialog.component.html',
  styleUrls: ['./edit-word-dialog.component.scss']
})
export class EditWordDialogComponent {

  private _word: EditWord;
  @Input() set word(value: EditWord) {
    this._word = value;
    this.initForm();
  }

  @Input() set mode(value: 'edit' | 'add') {
    this.setTitle(value);
    this.setRemoveBtnVisibility(value);
  }

  @Input() isVisible = false;

  @Output() save: EventEmitter<EditWord> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  wordForm = this.formBuilder.group({
    language1: this.formBuilder.control('', [Validators.required]),
    language2: this.formBuilder.control('', [Validators.required]),
    example1: (''),
    example2: (''),
    isVisible: ('')
  });

  title: string;
  isRemoveVisible: boolean;


  constructor(private formBuilder: FormBuilder) { }

  private initForm(): void {
    if (this._word === null) {
      return;
    }
    this.wordForm.patchValue({
      language1: this._word.language1,
      language2: this._word.language2,
      example1: this._word.example1,
      example2: this._word.example2,
      isVisible: this._word.isVisible,
    });
  }

  onSave(): void {
    const newWord = new EditWord(
      this._word.id,
      this._word.groupId,
      this.wordForm.get('language1').value,
      this.wordForm.get('language2').value,
      this.wordForm.get('example1').value,
      this.wordForm.get('example2').value,
      this.wordForm.get('isVisible').value,
    );
    this.save.emit(newWord);
  }

  onCancel(): void {
    this.cancel.emit({});
  }

  onRemove(): void {
    this.remove.emit(this._word.id);
  }

  private setTitle(value: 'edit' | 'add'): void {
    this.title = value === 'add' ? 'Add a new card' : 'Edit the card';
  }

  private setRemoveBtnVisibility(value: 'edit' | 'add'): void {
    this.isRemoveVisible = value === 'edit';
  }
}
