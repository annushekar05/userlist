import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';

export interface UserList {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  avatar: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  sortingEnabledFirstName = false;
  sortingEnabledLastName = false;
  sortingEnabledEmail = false;
  userList: Array<UserList>;
  badFirstName: boolean = false;
  badLastName: boolean = false;
  noResultFound:boolean = false;
  regexp = new RegExp('^[A-Z]+[a-zA-Z]*$');
  pageNum = 1;
  searchedId = '';
  isLoading = true;
  sortingName: string;
  isDesc: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.retrieveDelayedUserList().subscribe((response) => {
      this.isLoading = false;
        this.userList = response.data;
    },
    (error) => {
      this.noResultFound = true;
    });
  }

  goToPage(pgNumber){
    this.searchedId = '';
    this.apiService.retrieveUserList(pgNumber).subscribe((response) => {
      this.userList = response.data;
    },
    (error) => {
      this.noResultFound = true;
    });
  }

  onSubmit(id, firstName, lastName){
    if(!this.regexp.test(firstName)) {
      this.badFirstName = true;
    }else{
      this.badFirstName = false;
    }
    if(!this.regexp.test(lastName)) {
      this.badLastName = true;
    }else{
      this.badLastName = false;
    }
  }

  deleteUser(id){
    const index =this.userList.findIndex((element) => {
      return element.id === id;
    });
    if (index >= 0) {
      this.userList.splice(index,1);
      this.userList = [...this.userList];
      this.apiService.deleteUser(id);
    }
  }

  searchById(){
    this.apiService.retrieveUser(this.searchedId).subscribe((response) => {
      this.userList = [];
      this.userList[0] = response.data;
      this.userList = [...this.userList];
    },
    (error) => {
      this.noResultFound = true;
    });
  }
  sort(name: string): void {
    this.sortingEnabledEmail = this.sortingEnabledFirstName = this.sortingEnabledLastName = false;
    if(name == 'email'){
      this.sortingEnabledEmail = true;
    }else if(name == 'first_name'){
      this.sortingEnabledFirstName = true;
    }else if(name == 'last_name'){
      this.sortingEnabledLastName = true;
    }
    if (name && this.sortingName !== name) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = name;
  }

}
