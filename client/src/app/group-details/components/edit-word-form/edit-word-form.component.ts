import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-edit-word-form',
  templateUrl: './edit-word-form.component.html',
  styleUrls: ['./edit-word-form.component.scss']
})
export class EditWordFormComponent implements OnInit {

  @Input() word: Word;
  // @Input() mode: 'edit' | 'add';
  @Input()
  set mode(mode: 'edit' | 'add') {
  }
  @Output() submit: EventEmitter<Word> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();


  wordForm = this.formBuilder.group({
    language1: (''),
    language2: (''),
    example1: (''),
    example2: (''),
    isVisible: ('')
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.wordForm.patchValue({
      language1: this.word.language1,
      language2: this.word.language2,
      example1: this.word.language1 + 'example',
      example2: this.word.language2 + 'example',
      isVisible: this.word.isVisible,
    });
  }

  onSubmit(): void {
    console.log('sumit');
    const newWord = new Word(
      this.word.id,
      this.wordForm.get('language1').value,
      this.wordForm.get('language2').value,
      this.word.drawer,
      this.wordForm.get('isVisible').value
    );
    this.submit.emit(newWord);
  }

  onCancel(): void {
    console.log('cancel');
    this.cancel.emit({});
  }

  onRemove(): void {
    this.remove.emit(this.word);
  }
}
