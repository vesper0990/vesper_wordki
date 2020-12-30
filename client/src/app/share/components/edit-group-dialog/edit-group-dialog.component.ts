import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { EditGroup } from './edit-group.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss']
})
export class EditGroupDialogComponent implements OnInit {

  private _group: EditGroup;
  @Input() set group(value: EditGroup) {
    this._group = value;
    console.log(this._group);
    this.initForm();
  }

  @Input() set mode(value: 'edit' | 'add') {
    this.setTitle(value);
    this.setRemoveBtnVisibility(value);
  }

  @Input() isVisible = false;

  @Output() save: EventEmitter<EditGroup> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  groupForm: FormGroup;
  title: string;
  isRemoveVisible: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      languageFront: [''],
      languageBack: [''],
    });
  }

  private initForm(): void {
    if (!this.groupForm) {
      return;
    }
    this.groupForm.patchValue({
      name: this._group.name,
      languageFront: this._group.languageFront,
      languageBack: this._group.languageBack,
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (!this.isVisible) {
      return;
    }
    if (event.key === 'Escape') {
      this.onCancel();
    }
  }

  onSave(): void {
    const newGroup = new EditGroup(
      this._group.id,
      this.groupForm.get('name').value,
      this.groupForm.get('languageFront').value,
      this.groupForm.get('languageBack').value
    );
    this.save.emit(newGroup);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onRemove(): void {
    this.remove.emit(this._group.id);
  }

  private setTitle(value: 'edit' | 'add'): void {
    this.title = value === 'add' ? 'Add a new group' : 'Edit the group';
  }

  private setRemoveBtnVisibility(value: 'edit' | 'add'): void {
    this.isRemoveVisible = value === 'edit';
  }
}
