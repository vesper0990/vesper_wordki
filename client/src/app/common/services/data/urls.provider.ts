import { environment } from 'src/environments/environment';

export class UrlsProvider {

  static groups: string;
  static groupsItems: string;
  static groupItem: string;
  static groupDetails: string;
  static groupAdd: string;
  static groupUpdate: string;
  static groupRemove: string;
  static groupSplit: string;

  static userUrl: string;
  static userRegister: string;
  static userLogin: string;
  static userToken: string;
  static user: string;

  static words: string;
  static wordGet: string;
  static wordAdd: string;
  static wordAddAll: string;
  static wordUpdate: string;
  static wordsUpdateAll: string;
  static wordsRemove: string;

  static results: string;
  static resultAdd: string;

  static initialize() {
    console.log(`ApiUrl: ${environment.apiUrl}`);
    this.groups = `${environment.apiUrl}Groups/`;
    this.groupsItems = `${UrlsProvider.groups}getItems`;
    this.groupItem = `${UrlsProvider.groups}getItem`;
    this.groupDetails = `${UrlsProvider.groups}getDetails`;
    this.groupAdd = `${UrlsProvider.groups}add`;
    this.groupUpdate = `${UrlsProvider.groups}update`;
    this.groupRemove = `${UrlsProvider.groups}remove`;
    this.groupSplit = `${UrlsProvider.groups}split`;

    this.userUrl = `${environment.apiUrl}Users/`;
    this.userRegister = `${UrlsProvider.userUrl}register`;
    this.userLogin = `${UrlsProvider.userUrl}login`;
    this.userToken = `${UrlsProvider.userUrl}token`;
    this.user = `${UrlsProvider.userUrl}user`;

    this.words = `${environment.apiUrl}Words/`;
    this.wordGet = `${UrlsProvider.words}get`;
    this.wordAdd = `${UrlsProvider.words}add`;
    this.wordAddAll = `${UrlsProvider.words}addAll`;
    this.wordUpdate = `${UrlsProvider.words}update`;
    this.wordsUpdateAll = `${UrlsProvider.words}updateAll`;
    this.wordsRemove = `${UrlsProvider.words}remove`;

    this.results = `${environment.apiUrl}Results/`;
    this.resultAdd = `${UrlsProvider.results}add`;
  }
}

UrlsProvider.initialize();
