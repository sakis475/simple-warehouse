import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  tableData: any[] = [];
  voucherToScan: string = '';
  newRow: any = {};
  updateRow: any = {};
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .get('http://localhost:3013/v1/order', {
        observe: 'response',
        headers,
      })
      .subscribe(
        (response: any) => {
          console.log(response.body);
          this.tableData = response.body;
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);
          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }

  scan(voucher: string) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .put(
        `http://localhost:3013/v1/scan`,
        { voucher },
        {
          observe: 'response',
          headers,
        }
      )
      .subscribe(
        (response: any) => {
          location.reload();
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);

          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }

  voucherScan() {
    // console.log(this.voucherToScan);

    this.scan(this.voucherToScan);
  }

  addRow() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .post('http://localhost:3013/v1/order', this.newRow, {
        observe: 'response',
        headers,
      })
      .subscribe(
        (response: any) => {
          location.reload();
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);

          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }

  updateRowClick() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .put('http://localhost:3013/v1/order', this.updateRow, {
        observe: 'response',
        headers,
      })
      .subscribe(
        (response: any) => {
          location.reload();
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);

          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }

  deleteRow(voucher: any) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .delete(`http://localhost:3013/v1/order?voucher=${voucher}`, {
        observe: 'response',
        headers,
      })
      .subscribe(
        (response: any) => {
          location.reload();
        },
        (error: any) => {
          alert(`${error.status}, ${error.error.description}`);

          // if (error.status === 401) this.router.navigate(['/']);
        }
      );
  }
}
