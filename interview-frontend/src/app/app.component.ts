import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string;
  currentPage: number;
  maxPage: number;
  keyword: string;
  cities: any;

  constructor(private http: HttpClient) {
    this.title = 'interview-frontend';
    this.currentPage = 0;
    this.maxPage = 0;
    this.keyword = "";
    this.cities = [];
  }

  handleSearch = () => {
    if (this.keyword !== "") {
      this.sendRequest(this.keyword, 1);
    } else {
      //init
      if (this.cities.length > 0) {
        this.cities = [];
        this.currentPage = 0;
        this.maxPage = 0;
      }
    }
  }

  handlePrevPage = () => {
    this.currentPage--;
    this.sendRequest(this.keyword, this.currentPage);
  }

  handleNextPage = () => {
    this.currentPage++;
    this.sendRequest(this.keyword, this.currentPage);
  }

  sendRequest = (keyword: string, page: number) => {
    this.http.post(url, { keyword: keyword, page: page }).subscribe(
      (data: any) => {
        this.cities = data.cities;
        this.maxPage = data.maxPage;
        if (this.maxPage == 0) {
          this.currentPage = 0;
        } else {
          if (this.currentPage == 0) {
            this.currentPage = 1;
          }
        }
      },
      (error) => {
        console.error('Request failed:', error);
      }
    );
  }
}
