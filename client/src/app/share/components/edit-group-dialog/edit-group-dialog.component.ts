import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EditGroup } from './edit-group.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss']
})
export class EditGroupDialogComponent implements OnInit {

  private _group: EditGroup;
  @Input() set group(value: EditGroup) {
    this._group = value;
    this.display = this._group !== null;
    if (!this.display) {
      return;
    }
    this.initForm();
    this.setTitle();
  }

  @Output() submit2: EventEmitter<EditGroup> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  display = false;
  title: string;
  name = this.formBuilder.control('', [Validators.required, Validators.minLength(4)]);

  groupForm = this.formBuilder.group({
    name: this.name,
    language1: [''],
    language2: [''],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  private initForm(): void {
    this.groupForm.patchValue({
      name: this._group.name,
      language1: this._group.language1,
      language2: this._group.language2,
    });
  }

  private setTitle(): void {
    this.title = this._group.id === 0 ? 'Dodaj grupę' : 'Edytuj';
  }

  onSubmit(): void {
    const newGroup = {
      ...this._group,
      name: this.groupForm.get('name').value,
      language1: this.groupForm.get('language1').value.type,
      language2: this.groupForm.get('language1').value.type,
    };
    this.submit2.emit(newGroup);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onRemove(): void {
    this.remove.emit(this._group.id);
  }

}
