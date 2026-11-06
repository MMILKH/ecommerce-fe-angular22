import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table.component/generic-table.component';
import { AdminServices } from '../../services/admin/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { User } from '../../models/user.model';
import { FiltroUtente } from '../../models/filtroUtente.model';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [GenericTableComponent,FormsModule,RouterLink],
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
  private route = inject (ActivatedRoute);
  row:User[]=[];
  columns:{key: keyof User; label: string}[]=[

    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'cognome', label: 'Cognome' },
    { key: 'email', label: 'E-mail' },
    {key: 'ruolo', label: 'Ruolo'}
  
  ];

  filtri: FiltroUtente = {
    nome: '',
    cognome: '',
    email: '',
    ruolo: ''
  };

  ngOnInit(): void {
    if (this.authService.currentUser()?.ruolo==="admin"){


    this.route.queryParamMap.subscribe(params =>{
      this.filtri.nome=params.get('nome') || '';
      this.filtri.cognome=params.get('cognome') || '';
      this.filtri.email=params.get('email') || '';
      this.filtri.ruolo=params.get('ruolo') || '';
      this.adminService.getUser(this.filtri).subscribe({
      
      next: (response)=>{
        this.row = response;
        this.cdr.detectChanges();
      },
      error: (err)=>console.error('non è stato possibile recuperare gli utenti',err)
      
    });
    }

    )
    
  } else{
    this.router.navigate(['/user/login']);
  }

  }

  onRicerca(): void {
    this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { nome: this.filtri.nome || null, cognome: this.filtri.cognome || null,
       email: this.filtri.email || null, ruolo: this.filtri.ruolo|| null, },
    queryParamsHandling: 'merge'
  });
  }

  onReset(): void {
    this.filtri = { nome: '', cognome: '', email: '', ruolo: '' };
    this.onRicerca();
  }
}
