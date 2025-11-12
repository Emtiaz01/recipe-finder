import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBar {
  @Output() search = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  onSearch(): void {
    const searchTerm = this.searchInput.nativeElement.value.trim();
    if (searchTerm) {
      this.search.emit(searchTerm);
      this.searchInput.nativeElement.value = ''; // Clear input after search
    }
  }
}
