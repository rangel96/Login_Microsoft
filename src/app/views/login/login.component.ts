import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private msalService: MsalService
  ) {}

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      response => {
        if (response != null && response.account != null) {
          this.msalService.instance.setActiveAccount(response.account);
        }
      }
    );
  }


  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login(): void {
    this.msalService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
    });
  }

  logout(): void {
    this.msalService.logout();
  }


}
