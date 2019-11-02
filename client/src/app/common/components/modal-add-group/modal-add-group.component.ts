import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GroupSenderBase, GroupProviderBase } from '../../services/data/data.service';
import { AddGroupContract, UpdateGroupContract } from '../../services/data/group/sender-base.service';
import { UserService } from '../../services/user/user.service';
import { GroupItem } from '../../models/model';
import { ModalAddGroupModel } from './modal-add-group.model';

@Component({
  selector: 'app-modal-add-group',
  templateUrl: './modal-add-group.component.html',
  styleUrls: ['./modal-add-group.component.scss']
})
export class ModalAddGroupComponent {
  private action: any;
  private _visible: boolean;

  @Input() mode: "add" | "edit";
  @Input() group: ModalAddGroupModel;

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


  constructor(private groupProvider: GroupProviderBase,
    private groupSender: GroupSenderBase,
    private userService: UserService) { }

  private init() {
    if (this.mode === "add") {
      this.action = this.add;
    } else {
      this.action = this.update;
    }
    if (!this.group) {
      this.group = new ModalAddGroupModel();
    }
  }

  private destroy() {
    this.group = null;
  }

  closeDialog(): void {
    this.visible = false;
  }

  yesClick(): void {
    if (this.isProcessing) {
      return;
    }
    this.action();
  }

  noClick(): void {
    this.closeDialog();
  }

  private add(): void {
    this.isProcessing = true;
    const contract = <AddGroupContract>{
      name: this.group.name,
      language1: this.group.language1.languageEnum,
      language2: this.group.language2.languageEnum,
      userId: this.userService.user.id
    }
    this.groupSender.add(contract).subscribe(
      (groupId: string) => this.success.emit(groupId),
      (error: any) => {
        console.error(`Error: ${error}`);
        this.success.emit(false)
      },
      () => {
        this.isProcessing = false;
        this.closeDialog();
      }

    )
  }

  private getAddedGroup(groupId: string) {
    this.groupProvider.getGroup(groupId).subscribe(
      (group: GroupItem) => {

      },
      (error: any) => {
        console.error(`Error: ${error}`);
      },

    )
  }

  private update(): void {
    this.isProcessing = true;
    const contract = <UpdateGroupContract>{
      id: this.group.id,
      language1: this.group.language1.languageEnum,
      language2: this.group.language2.languageEnum,
      name: this.group.name
    }
    this.groupSender.update(contract).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(`Error: ${error}`);
      },
      () => {
        this.isProcessing = false;
        this.closeDialog();
      }
    )
  }
}
