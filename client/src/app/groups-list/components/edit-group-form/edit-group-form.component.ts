import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Group } from '../../models/group.model';
import { LanguageType } from 'src/app/share/models/language-type.mode';
import { GroupProviderBase } from '../../services/group.provider/group.provider';

@Component({
  selector: 'app-edit-group-form',
  templateUrl: './edit-group-form.component.html',
  styleUrls: ['./edit-group-form.component.scss']
})
export class EditGroupFormComponent implements OnInit {

  @Input() group: Group;
  @Output() submit: EventEmitter<Group> = new EventEmitter();

  langauges: LanguageType[];

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
      language1: this.group.language1.type,
      language2: this.group.language2.type,
    });
    this.langauges = LanguageType.getAll();
  }

  onSubmit(): void {
    console.log(this.groupForm.value);
    const newGroup = new Group(
      this.group.id,
      this.groupForm.get('name').value,
      LanguageType.getLanguageType(this.groupForm.get('language1').value),
      LanguageType.getLanguageType(this.groupForm.get('language2').value),
      this.group.wordsCount
    );
    this.groupProvider.updateGroup(newGroup);
    this.submit.emit(newGroup);
  }
}
