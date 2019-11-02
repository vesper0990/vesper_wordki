import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguagesProvider } from '@app/common/services';
import { Language } from '@app/common/models/model';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items: any[] = [
    { key: '1', value: 'jeden' },
    { key: '2', value: 'dwa' },
    { key: '3', value: 'trzy' },
  ];

  languages = LanguagesProvider.languages;
  selectedLanguage: Language;

  constructor() {
  }

  ngOnInit() {
    // this.selectedLanguage = this.languages[0];
  }



}
