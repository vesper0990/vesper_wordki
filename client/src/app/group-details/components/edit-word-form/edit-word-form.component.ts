import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-edit-word-form',
  templateUrl: './edit-word-form.component.html',
  styleUrls: ['./edit-word-form.component.scss']
})
export class EditWordFormComponent implements OnInit {

  @Input() word: Word;

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

}
