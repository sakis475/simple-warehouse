import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  registerPass = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log(this.username, this.password, this.registerPass);

    this.http
      .post(
        'http://localhost:3013/v1/login',
        {
          name: this.username,
          password: this.password,
        },
        { observe: 'response', headers: { 'content-type': 'application/json' } }
      )
      .subscribe(
        (response: any) => {
          console.log(response);

          localStorage.setItem('token', String(response.body.token));
          this.router.navigate(['/home']);
        },
        (error: any) => alert(`${error.status}, ${error.error.description}`)
      );
    //make request to server
    //if correct save jwt token to browser storage
    //redirect to home
  }

  register() {
    this.http
      .post(
        `http://localhost:3013/v1/register`,
        {
          name: this.username,
          password: this.password,
          registerToken: this.registerPass,
        },

        { observe: 'response', headers: { 'content-type': 'application/json' } }
      )
      .subscribe(
        (response: any) => {
          console.log(response.token);
          localStorage.setItem('token', String(response.body.token));
          this.router.navigate(['/home']);
        },
        (error: any) => alert(`${error.status}, ${error.error.description}`)
      );
  }
}
