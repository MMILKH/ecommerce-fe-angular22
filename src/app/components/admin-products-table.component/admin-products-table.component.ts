import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table.component/generic-table.component';
import { AdminServices } from '../../services/admin/admin.service';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { AuthService } from '../../services/user/login.service';
import { ProdottoDto } from '../../models/prodotto.model';
import { FiltroProdotto } from '../../models/filtroProdotto.model';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [GenericTableComponent,FormsModule,RouterLink,ReactiveFormsModule],
  selector: 'app-admin-Products-table',
  standalone: true,
  styleUrl: './admin-Products-table.component.css',
  templateUrl: './admin-Products-table.component.html',
})
export class AdminProductsTableComponent implements OnInit {
private adminService = inject(AdminServices);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
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
    page: 0,
    elements: 10,
    sort: 'asc'

  }

  totalPages:number = 0;


  isModalOpen = false;
  prodottoForm!: FormGroup;
  idProdottoMod: number |null = null;
  

  ngOnInit(): void {
    if (this.authService.currentUser()?.ruolo.nome==="admin"){


        this.prodottoForm = this.fb.group({
        nome: ['', Validators.required],
        categoria: ['', Validators.required],
        descrizioneBreve: ['', Validators.required],
        prezzo: [0, [Validators.required, Validators.min(0)]]
      });

    this.route.queryParamMap.subscribe(params =>{
      this.filtri.id = params.get ('id') || '';
      this.filtri.nome = params.get('nome') || '';
      this.filtri.descrizioneBreve = params.get('descrizioneBreve') || '';
      this.filtri.categoria = params.get('categoria') || '';
      this.filtri.page = Number(params.get('page')) || 0;
      this.filtri.elements = Number(params.get('elements')) || 10;

      this.adminService.getProducts(this.filtri).subscribe({
      
      next: (response)=>{
        this.row = response.content;
        this.totalPages = response.totalPages;
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
       categoria: this.filtri.categoria || null, id: this.filtri.id || null,page: this.filtri.page || 0,
        elements: this.filtri.elements || 10, sort: this.filtri.sort || 'asc' },
    queryParamsHandling: 'merge'
  });
  }

  onReset(): void {
    const paginaCorrente = this.filtri.page ?? 0;
    const elementiCorrenti = this.filtri.elements ?? 10;
    this.filtri = { nome: '', descrizioneBreve: '',categoria: '', id: '', page:paginaCorrente, elements:elementiCorrenti, sort: this.filtri.sort};
    this.onRicerca();
        this.cdr.detectChanges();
  }

  cambiaPagina(nuovaPagina: number): void {
    this.filtri.page = nuovaPagina;
    this.onRicerca();
        this.cdr.detectChanges();
  }


  onEditProduct(prodotto: ProdottoDto): void {
    this.idProdottoMod = prodotto.id ?? null;
    
    this.prodottoForm.patchValue({
      nome: prodotto.nome,
      categoria: prodotto.categoria,
      descrizioneBreve: prodotto.descrizioneBreve,
      prezzo: prodotto.prezzo
    });

    this.isModalOpen = true;
  }

  chiudiModale(): void {
    this.isModalOpen = false;
    this.idProdottoMod = null;
    this.prodottoForm.reset();
  }

  onSubmitModifica(): void {
    if (this.prodottoForm.invalid || !this.idProdottoMod) return;

    const prodottoMod: ProdottoDto = this.prodottoForm.value;

    this.adminService.updateProduct(this.idProdottoMod, prodottoMod).subscribe({
      next: () => {
      
        this.chiudiModale();
        this.onRicerca();
        
      },
      error: (err) => console.error("Errore durante l'aggiornamento del prodotto", err)
    });
  }


  onDeleteProduct(prodotto: ProdottoDto): void {
    if (confirm(`Vuoi davvero eliminare il prodotto "${prodotto.nome}"?`)) {
      this.adminService.deleteProduct(prodotto.id!).subscribe({
        next: () => {
          this.onRicerca(); 
        },
        error: (err) => console.error("Errore durante l'eliminazione del prodotto", err)
      });
    }
  }
  }
  

