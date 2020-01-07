import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, of, Observable } from 'rxjs';
import { GroupDetailsProviderBase } from './services/group-details.provider/group-details.provider';
import { map, catchError } from 'rxjs/operators';
import { GroupDetailsDto } from './models/group-details.dto';
import { GroupDetailsMapper } from './services/group-details.mapper/group-details.mapper';
import { GroupDetails } from './models/group-details.model';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  private routeParamSub: Subscription;

  groupDetails: GroupDetails;

  constructor(private route: ActivatedRoute,
    private groupDetailsProvider: GroupDetailsProviderBase,
    private groupDetailsMapper: GroupDetailsMapper) { }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params: Params) => this.handleRouteParam(params));
  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
  }

  private handleRouteParam(value: Params): void {
    const id = +value['id'];
    this.groupDetailsProvider.getGroupDetails(id).subscribe(dto => {
      this.groupDetails = this.groupDetailsMapper.map(dto);
    });
  }
}
