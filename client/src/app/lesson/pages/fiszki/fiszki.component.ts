import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteParamsHandler } from '../../services/route-params.handler/route-params.handler';
import { BaseComponent } from '../base/base.component';

@Component({
  templateUrl: './fiszki.component.html',
  styleUrls: ['./fiszki.component.scss']
})
export class FiszkiComponent extends BaseComponent {

  constructor(protected lessonStore: Store<LessonState>,
    protected routeParamsHandler: RouteParamsHandler,
    protected route: ActivatedRoute,
    protected router: Router) {
    super(lessonStore, routeParamsHandler,
      route, router);
  }
}
