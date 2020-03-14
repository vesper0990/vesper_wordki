import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';
import { AddedGroup } from '../../models/added-group';
import { AddedWord } from '../../models/added-word';
import { GroupDetailsState } from '../../store/reducre';
import { Store } from '@ngrx/store';
import { AddGroupAction } from '../../store/actions';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  name = this.formBuilder.control('', [Validators.required, Validators.minLength(4)]);
  words = this.formBuilder.array([this.createItem()]);

  groupForm = this.formBuilder.group({
    name: this.name,
    language1: [''],
    language2: [''],
    words: this.words,
  });

  constructor(private formBuilder: FormBuilder,
    private groupDetailsStore: Store<GroupDetailsState>) { }

  ngOnInit(): void {
    this.groupForm.patchValue({
      name: '',
      language1: LanguageType.getLanguageType(LanguageTypeEnum.Undefined),
      language2: LanguageType.getLanguageType(LanguageTypeEnum.Undefined),
    });
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      language1: ['', [Validators.required]],
      language2: ['', [Validators.required]],
      example1: [''],
      example2: [''],
      comment: [''],
    });
  }

  addItem(): void {
    this.words.push(this.createItem());
  }

  removeItem(index: number): void {
    this.words.removeAt(index);
  }

  onSubmit(): void {
    const group = <AddedGroup>{
      name: this.groupForm.get('name').value,
      language1: this.groupForm.get('language1').value.type,
      language2: this.groupForm.get('language2').value.type,
      words: <AddedWord[]>this.words.value,
    };
    this.groupDetailsStore.dispatch(new AddGroupAction({ group: group }));
  }
}
