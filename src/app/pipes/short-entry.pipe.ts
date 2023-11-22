import { Pipe, PipeTransform } from '@angular/core';
import { EntryExit } from '../models/entry-exit.model';
import { TypeEntry } from '../enum/shared.enum';

@Pipe({
  name: 'shortEntry'
})
export class ShortEntryPipe implements PipeTransform {

  transform(items: EntryExit[]): EntryExit[] {
    return items.sort((a, b) => a.type === TypeEntry.EXIT ? 1 : -1);
  }

}
