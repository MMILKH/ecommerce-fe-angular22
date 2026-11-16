import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/user/register.service';
import { RegisterRequestDto } from '../../models/registerRequest.model';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink
  ],
  templateUrl: './register.component.html',
})


export class RegisterComponent {
  private registerService=inject(RegisterService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

registerData: RegisterRequestDto = {

    email: '',
    password: '',
    passwordConf: '',
    nome:'',
    cognome:'',
    numero:'',
    indirizzo: ''

  };

    errorMessages: string[] = [];
   onSubmit(): void {
    this.errorMessages = [];

    
    if (this.registerData.password !== this.registerData.passwordConf) {
      this.errorMessages.push('Le password non coincidono.');
      return;
    }

    this.registerService.register(this.registerData).subscribe({
      next: (res) => {
        console.log('Registrazione avvenuta con successo:', res);
        this.router.navigate(['/products/catalog']);
      },
      error: (err) => {
        console.error('Errore durante la registrazione:', err);

        let errorObj = err.error
        if (typeof errorObj === 'string') {
          try {
            errorObj = JSON.parse(errorObj);
          } catch (e) {
      
            this.errorMessages.push(errorObj);
            return;
          }
        }

        
        if (typeof errorObj === 'object' && errorObj !== null) {
         
          this.errorMessages = Object.values(errorObj);
        } else {
          this.errorMessages.push('Errore durante la registrazione. Controlla i dati.');
        }
        this.cdr.detectChanges();
      }
    });
  }

}
