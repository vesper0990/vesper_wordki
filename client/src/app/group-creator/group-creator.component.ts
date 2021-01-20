import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ParseNewCards, SaveNewGroup, SetFileContent } from './store/actions';
import { selectCanGenerate, selectCanSave } from './store/selectors';
import { GroupCreatorState } from './store/state';

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.component.html',
  styleUrls: ['./group-creator.component.scss']
})
export class GroupCreatorComponent implements OnInit {

  canSave$: Observable<boolean>;
  canGenerate$: Observable<boolean>;

  constructor(private readonly store: Store<GroupCreatorState>) { }

  ngOnInit(): void {
    this.canSave$ = this.store.select(selectCanSave);
    this.canGenerate$ = this.store.select(selectCanGenerate);
  }

  fileContentChanged(event: string): void {
    this.store.dispatch(new SetFileContent({ fileContent: event }));
  }

  generate(): void {
    this.store.dispatch(new ParseNewCards());
  }

  save(): void {
    this.store.dispatch(new SaveNewGroup());
  }
}
