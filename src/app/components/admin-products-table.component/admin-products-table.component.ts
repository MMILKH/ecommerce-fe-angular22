import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table.component/generic-table.component';
import { AdminServices } from '../../services/admin/admin.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { ProdottoDto } from '../../models/prodotto.model';

@Component({
  imports: [GenericTableComponent],
  selector: 'app-admin-Products-table',
  standalone: true,
  styleUrl: './admin-Products-table.component.css',
  templateUrl: './admin-Products-table.component.html',
})
export class AdminProductsTableComponent implements OnInit {
private adminService = inject( AdminServices);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  row:ProdottoDto[]=[];
  columns:{key: keyof ProdottoDto; label: string}[]=[

    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'descrizioneBreve', label: 'Descrizione da catalogo' },
    {key: 'prezzo', label: 'Prezzo'}
  
  ];

  

  ngOnInit(): void {
    if (this.authService.currentUser()?.ruolo==="admin"){
    this.adminService.getProducts().subscribe({
      
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
