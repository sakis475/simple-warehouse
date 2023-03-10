import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public driverNames = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .get('http://localhost:3013/v1/drivers', {
        observe: 'response',
        headers,
      })
      .subscribe(
        (response: any) => {
          this.driverNames = response.body.map(
            (driver: { name: string }) => driver.name
          );
        },
        (error: any) => {
          console.log(error);
          alert(`${error.status}, ${error.error.description}`);
          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }

  reset() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .get(`http://localhost:3013/v1/reset-database`, {
        observe: 'response',
        headers,
      })
      .subscribe(
        (response: any) => {
          location.reload();
        },
        (error: any) => {
          console.log(error);
          alert(`${error.status}, ${error.error.description}`);
          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }
}
