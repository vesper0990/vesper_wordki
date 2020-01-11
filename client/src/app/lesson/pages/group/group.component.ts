import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  private routeParamSub: Subscription;

  public id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe((params: Params) => this.handleRouteParam(params));
  }

  private handleRouteParam(value: Params): void {
    this.id = +value['id'];
  }

}
