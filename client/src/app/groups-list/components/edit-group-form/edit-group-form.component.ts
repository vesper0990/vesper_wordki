import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Group } from '../../models/group.model';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';
import { GroupProviderBase } from '../../services/group.provider/group.provider';
import { SelectItemGroup, SelectItem } from 'primeng/api/public_api';

@Component({
  selector: 'app-edit-group-form',
  templateUrl: './edit-group-form.component.html',
  styleUrls: ['./edit-group-form.component.scss']
})
export class EditGroupFormComponent implements OnInit {

  @Input() group: Group;
  @Output() submit: EventEmitter<Group> = new EventEmitter();

  languages: LanguageType[];

  name = this.formBuilder.control('', [Validators.required, Validators.minLength(4)]);

  groupForm = this.formBuilder.group({
    name: this.name,
    language1: [''],
    language2: [''],
  });

  constructor(private formBuilder: FormBuilder,
    private groupProvider: GroupProviderBase) { }

  ngOnInit(): void {
    this.groupForm.patchValue({
      name: this.group.name,
      language1: this.group.language1,
      language2: this.group.language2,
    });

    this.groupForm.valueChanges.subscribe(x => console.log(x));
    this.languages = LanguageType.getAll();
  }

  onSubmit(): void {
    const newGroup = new Group(
      this.group.id,
      this.groupForm.get('name').value,
      LanguageType.getLanguageType(this.groupForm.get('language1').value.type),
      LanguageType.getLanguageType(this.groupForm.get('language2').value.type),
      this.group.wordsCount
    );
    this.groupProvider.updateGroup(newGroup);
    this.submit.emit(newGroup);
  }
}
