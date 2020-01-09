import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fiszka',
  templateUrl: './fiszka.component.html',
  styleUrls: ['./fiszka.component.scss']
})
export class FiszkaComponent implements OnInit {

  @Input() language1: string;
  @Input() language2: string;

  constructor() { }

  ngOnInit() {
  }

}
