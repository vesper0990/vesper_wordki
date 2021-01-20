import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { GroupDetails } from '../../model/group-details';
import { SetGroupDetails } from '../../store/actions';
import { GroupCreatorState } from '../../store/state';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  private formSub: Subscription;

  detailsForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly store: Store<GroupCreatorState>) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      languageFront: [''],
      languageBack: [''],
    });

    this.formSub = this.detailsForm.valueChanges.pipe(
      debounceTime(500),
      map(value => new GroupDetails(value.name, value.languageFront, value.languageBack))
    ).subscribe(value => {
      this.store.dispatch(new SetGroupDetails({ groupDetails: value }));
    });
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

}
