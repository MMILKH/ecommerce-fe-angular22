import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest.model';

@Component({
  imports: [],
  selector: 'app-login.component',
  standalone: true,
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  loginData!: LoginRequest;
  ngOnInit(): void {
    
  }


}
