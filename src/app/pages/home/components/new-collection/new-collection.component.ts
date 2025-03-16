import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-new-collection',
  imports: [TranslatePipe],
  templateUrl: './new-collection.component.html',
  styleUrl: './new-collection.component.css',
})
export class NewCollectionComponent {}
