import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  name: string;
  city: string;
  state: string;
  picture: string;
}

interface ApiResponse {
  results: {
    name: {
      first: string;
      last: string;
    };
    location: {
      city: string;
      state: string;
    };
    picture: {
      large: string;
    };
  }[];
}

@Component({
  selector: 'app-lista-cards',
  templateUrl: './lista-cards.component.html',
  styleUrls: ['./lista-cards.component.css']
})
export class ListaCardsComponent implements OnInit {

  users: User[] = [];
  page = 0;
  pageSize = 3;
  hasNext = false;
  hasPrev = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    const response = await this.http.get<ApiResponse>('https://randomuser.me/api/?results=20').toPromise();
    this.users = response?.results?.map(user => ({
      name: `${user.name.first} ${user.name.last}`,
      city: user.location.city,
      state: user.location.state,
      picture: user.picture.large,
    })) || [];
    this.updatePage();
  }

  updatePage() {
    this.hasPrev = this.page > 0;
    this.hasNext = this.page * this.pageSize + this.pageSize < this.users.length;
  }

  handlePrev() {
    this.page--;
    this.updatePage();
  }

  handleNext() {
    this.page++;
    this.updatePage();
  }

}
