import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { TypeDocument } from '../enum/shared.enum';
import { EntryExit } from '../models/entry-exit.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntryExitService {

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  private dbFirestore: Firestore = inject(Firestore);

  constructor(
    private authService: AuthService
  ) { }

  initEntryExitListener() {
    const colRef = collection(
      this.dbFirestore,
      this.authService.user.uid,
      TypeDocument.ENTRY_EXIT,
      TypeDocument.ITEMS
    );
    return from(getDocs(colRef));
  }

  addEntryExit(entryExit: EntryExit) {

    const colRef = collection(this.dbFirestore, this.authService.user.uid, TypeDocument.ENTRY_EXIT, TypeDocument.ITEMS);
    return from(addDoc(colRef, { ...entryExit }));
  }
}
