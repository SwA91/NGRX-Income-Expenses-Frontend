import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User as UserData } from '../models/user.model';
import { setDoc, CollectionReference, Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  private firestore: Firestore = inject(Firestore);
  usersCollection!: CollectionReference;

  constructor(
    private store: Store<AppState>
  ) {
    this.usersCollection = collection(this.firestore, 'user')
  }

  initAuthListener() {
    this.authState$.subscribe(async (fAuth) => {
      console.log('authState$: ', fAuth);

      if (fAuth?.uid) {
        const myDocRef = doc(this.usersCollection, fAuth.uid);
        const fUser = (await getDoc(myDocRef)).data();
        const user = UserData.fromFirebase(fUser);
        this.store.dispatch(authActions.setUser({ user }))
      } else {
        this.store.dispatch(authActions.unSetUser());
      }

    });
  }


  createUser(name: string, email: string, password: string) {

    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser = new UserData(
          user.uid,
          name,
          email,
        );

        // Define the document reference
        const myDocRef = doc(this.usersCollection, user.uid);

        return setDoc(myDocRef, { ...newUser });
      });
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.authState$.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
