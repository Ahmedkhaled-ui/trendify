import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(MyArray: any[], name: string): any {
    return MyArray.filter((item) =>
      item.title.toLowerCase().includes(name.toLowerCase())
    );
  }
}
