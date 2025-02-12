import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from './resource.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
