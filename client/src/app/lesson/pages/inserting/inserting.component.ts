import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { RouteParamsHandler } from '../../services/route-params.handler/route-params.handler';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  templateUrl: './inserting.component.html',
  styleUrls: ['./inserting.component.scss']
})
export class InsertingComponent extends BaseComponent {

  constructor(protected lessonStore: Store<LessonState>,
    protected routeParamsHandler: RouteParamsHandler,
    protected route: ActivatedRoute,
    protected router: Router) {
    super(lessonStore, routeParamsHandler,
      route, router);
  }
}
