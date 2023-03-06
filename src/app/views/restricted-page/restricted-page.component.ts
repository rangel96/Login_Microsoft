import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.scss']
})
export class RestrictedPageComponent {

  // Variables
  apiResponseString: string = '';
  apiResponse: any;

  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient
  ) { }

  get getAllInfo(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }


  /***
   * HTTP
   * */
  getProfile () {
    this.httpClient.get("https://graph.microsoft.com/v1.0/me").subscribe( resp  => {
      this.apiResponse = resp;
      this.apiResponseString = JSON.stringify(resp);
    });
  }

  getEmails () {
    this.httpClient.get("https://graph.microsoft.com/v1.0/me/messages").subscribe( resp  => {
      this.apiResponse = resp;
      this.apiResponseString = JSON.stringify(resp);
    });
  }

}
