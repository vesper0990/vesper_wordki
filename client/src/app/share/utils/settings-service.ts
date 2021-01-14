// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';

// @Injectable()
// export class SettingsService {

//     private static isLoaded = false;

//     constructor(private readonly http: HttpClient) { }

//     async load(): Promise<any> {
//         console.log('settings loading');
//         if (SettingsService.isLoaded || !environment.production) {
//             return Promise.resolve();
//         }

//         const data = await this.http.get('assets/dynamic-cofing.json').toPromise();
//         console.log('data from dynamic-config', data);
//     }
// }
