import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiszka-side',
  templateUrl: './fiszka-side.component.html',
  styleUrls: ['./fiszka-side.component.scss']
})
export class FiszkaSideComponent implements OnInit {

  @Input() value = '';
  @Input() example = '';
  @Input() isTextVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

}
