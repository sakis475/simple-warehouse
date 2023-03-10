import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss'],
})
export class DriverTableComponent implements OnInit {
  tableDataScanned: any = [];
  tableDataUnScanned: any = [];
  @Input() driverName: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .get(
        `http://localhost:3013/v1/order?driver=${this.driverName}&scanned=true`,
        {
          observe: 'response',
          headers,
        }
      )
      .subscribe(
        (response: any) => {
          this.tableDataScanned = response.body;
          console.log(response);
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);
          // if (error.status === 401) this.router.navigate(['/']);
        }
      );

    this.http
      .get(
        `http://localhost:3013/v1/order?driver=${this.driverName}&scanned=false`,
        {
          observe: 'response',
          headers,
        }
      )
      .subscribe(
        (response: any) => {
          this.tableDataUnScanned = response.body;
          console.log(response);
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);
          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }
}
