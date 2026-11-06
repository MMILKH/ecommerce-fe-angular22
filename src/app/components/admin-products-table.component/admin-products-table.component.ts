import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table.component/generic-table.component';
import { AdminServices } from '../../services/admin/admin.service';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { FiltroProdotto } from '../../models/filtroProdotto.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [GenericTableComponent,FormsModule,RouterLink],
  selector: 'app-admin-Products-table',
  standalone: true,
  styleUrl: './admin-Products-table.component.css',
  templateUrl: './admin-Products-table.component.html',
})
export class AdminProductsTableComponent implements OnInit {
private adminService = inject( AdminServices);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
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

  filtri : FiltroProdotto = {
    id : '',
    nome: '',
    descrizioneBreve: '',
    categoria: '',

  }
  

  ngOnInit(): void {
    if (this.authService.currentUser()?.ruolo==="admin"){


    this.route.queryParamMap.subscribe(params =>{
      this.filtri.id = params.get ('id') || '';
      this.filtri.nome = params.get('nome') || '';
      this.filtri.descrizioneBreve = params.get('descrizioneBreve') || '';
      this.filtri.categoria = params.get('categoria') || '';
      this.adminService.getProducts(this.filtri).subscribe({
      
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
    queryParams: { nome: this.filtri.nome || null, descrizioneBreve: this.filtri.descrizioneBreve || null,
       categoria: this.filtri.categoria || null, id: this.filtri.id || null, },
    queryParamsHandling: 'merge'
  });
  }

  onReset(): void {
    this.filtri = { nome: '', descrizioneBreve: '',categoria: '', id: '' };
    this.onRicerca();
  }
  
}
