import { Component,Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-generic-table',
  standalone: true,
  styleUrl: './generic-table.component.css',
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent<T> {
  @Input() data: T[] = []; 
  @Input({required: true}) columns: { key: keyof T, label: string }[] = []; 
}
