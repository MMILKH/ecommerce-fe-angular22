import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table.component/generic-table.component';
import { AdminServices } from '../../services/admin/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { User } from '../../models/user.model';
import { FiltroUtente } from '../../models/filtroUtente.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  imports: [GenericTableComponent,FormsModule,RouterLink,CommonModule,ReactiveFormsModule],
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
  private fb = inject(FormBuilder);


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


  isModalOpen = false;
  userForm!: FormGroup;
  idUserInMod: number | null = null;



  ngOnInit(): void {
    if (this.authService.currentUser()?.ruolo.nome==="admin"){

      this.userForm = this.fb.group({
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        ruolo: ['', Validators.required]

      });


    this.route.queryParamMap.subscribe(params =>{
      this.filtri.nome=params.get('nome') || '';
      this.filtri.cognome=params.get('cognome') || '';
      this.filtri.email=params.get('email') || '';
      this.filtri.ruolo=params.get('ruolo') || '';

      this.adminService.getUser(this.filtri).subscribe({
      
      next: (response) => {
          this.row = response.map((user: any) => ({
            ...user,
            ruolo: typeof user.ruolo === 'object' ? user.ruolo?.nome : user.ruolo
          }));
          this.cdr.detectChanges();
        },
        error: (err) => console.error('non è stato possibile recuperare gli utenti', err)
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



  onEditUser(user: User): void {
    this.idUserInMod = user.id ?? null;
    
    this.userForm.patchValue({
      nome: user.nome,
      cognome: user.cognome,
      email: user.email,
      ruolo: user.ruolo
    });

    this.isModalOpen = true;
  }

  chiudiModale(): void {
    this.isModalOpen = false;
    this.idUserInMod = null;
    this.userForm.reset();
  }

onSubmitModifica(): void {
  
    const fromValues = this.userForm.value;
    const userMod: User = {
      ...fromValues,
      ruolo : {
        nome: fromValues.ruolo
      }
    }

    this.adminService.updateUser(this.idUserInMod!, userMod).subscribe({
      next: () => {
        this.chiudiModale();
        this.onRicerca();
      },
      error: (err) => console.error("Errore durante l'aggiornamento dell'utente", err)
    });
  }

  onDeleteUser(user: User): void {
    const userId = (user as any).id;
    if (confirm(`Vuoi davvero eliminare l'utente "${user.nome} ${user.cognome}"?`)) {
      this.adminService.deleteUser?.(userId).subscribe({
        next: () => {
          this.onRicerca();
        },
        error: (err) => console.error("Errore durante l'eliminazione dell'utente", err)
      });
    }
  }

}
