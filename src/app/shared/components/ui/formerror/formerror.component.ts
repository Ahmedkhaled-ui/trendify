import { Component, Input, input, InputSignal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formerror',
  imports: [],
  templateUrl: './formerror.component.html',
  styleUrl: './formerror.component.css',
})
export class FormerrorComponent {
  // inputFormData:InputSignal< any> = input();

  @Input() inputFormData!: AbstractControl | null;
  @Input() conformPass!: AbstractControl | null;
}
