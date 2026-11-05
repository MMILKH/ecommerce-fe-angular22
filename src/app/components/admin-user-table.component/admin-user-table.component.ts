import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table.component/generic-table.component';
import { AdminServices } from '../../services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { User } from '../../models/user.model';

@Component({
  imports: [GenericTableComponent],
  selector: 'app-admin-user-table',
  standalone: true,
  styleUrl: './admin-user-table.component.css',
  templateUrl: './admin-user-table.component.html',
})
export class AdminUserTableComponent implements OnInit {
private adminService = inject( AdminServices);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  row:User[]=[];
  columns:{key: keyof User; label: string}[]=[

    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'cognome', label: 'Cognome' },
    { key: 'email', label: 'E-mail' },
    {key: 'ruolo', label: 'Ruolo'}
  
  ];

  

  ngOnInit(): void {
    if (this.authService.currentUser()?.ruolo==="admin"){
    this.adminService.getUser().subscribe({
      
      next: (response)=>{
        this.row = response;
        this.cdr.detectChanges();
      },
      error: (err)=>console.error('non è stato possibile recuperare gli utenti',err)
      
    });
  } else{
    this.router.navigate(['/user/login']);
  }

  }
  
}
