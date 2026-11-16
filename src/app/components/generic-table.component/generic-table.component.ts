import { Component,EventEmitter,Input, Output } from '@angular/core';

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


  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  onEdit(row: T) {
    this.edit.emit(row);
  }

  onDelete(row: T) {
    this.delete.emit(row);
  }
}
