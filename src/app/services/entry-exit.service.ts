import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionSnapshots, deleteDoc, doc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
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

  deleteEntryExit(uidItem?: string) {

    if (!uidItem) return Promise.reject(false);

    return deleteDoc(doc(this.dbFirestore,
      this.authService.user.uid,
      TypeDocument.ENTRY_EXIT,
      TypeDocument.ITEMS,
      uidItem
    ));

  }

  initEntryExitListener() {
    return collectionSnapshots(
      collection(this.dbFirestore, this.authService.user.uid, TypeDocument.ENTRY_EXIT, TypeDocument.ITEMS)
    ).pipe(
      map((resp) => resp.map((doc) => ({ ...doc.data(), uid: doc.id, })))
    );
  }

  addEntryExit(entryExit: EntryExit) {

    const colRef = collection(this.dbFirestore, this.authService.user.uid, TypeDocument.ENTRY_EXIT, TypeDocument.ITEMS);
    return from(addDoc(colRef, { ...entryExit }));
  }
}
