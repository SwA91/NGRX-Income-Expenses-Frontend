import { Injectable, NgZone, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
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
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  initEntryExitListener() {
    const q = query(collection(this.dbFirestore, this.authService.user.uid, TypeDocument.ENTRY_EXIT, TypeDocument.ITEMS));
    return new Observable<EntryExit[]>(subscriber => {
      // Observable o promesa muere al pasar por el unsubscribe del observable
      onSnapshot(q, (resp) => {
        const data: any[] = [];
        resp.forEach((doc) => {
          data.push({ ...doc.data(), uid: doc.id, });
        });
        this.ngZone.run(() => {
          subscriber.next(data);
        });
      })
    });
  }

  addEntryExit(entryExit: EntryExit) {

    const colRef = collection(this.dbFirestore, this.authService.user.uid, TypeDocument.ENTRY_EXIT, TypeDocument.ITEMS);
    return from(addDoc(colRef, { ...entryExit }));
  }
}
