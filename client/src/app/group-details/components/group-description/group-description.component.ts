import { Component, OnInit, Input } from '@angular/core';
import { GroupDetails } from '../../models/group-details.model';
import { WordsDetails } from '../../models/words-details.model';

@Component({
  selector: 'app-group-description',
  templateUrl: './group-description.component.html',
  styleUrls: ['./group-description.component.scss']
})
export class GroupDescriptionComponent implements OnInit {

  @Input() group: GroupDetails;
  @Input() wordsDetails: WordsDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
