import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { TypeDocument } from '../enum/shared.enum';
import { User, User as UserData } from '../models/user.model';
import * as entryExitActions from '../income-expenses/income-expenses.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User;
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  private firestore: Firestore = inject(Firestore);

  constructor(
    private store: Store<AppState>
  ) { }

  initAuthListener() {

    this.authState$.subscribe(async (fAuth) => {

      if (fAuth?.uid) {
        const myUsersCollection: CollectionReference = collection(this.firestore, fAuth.uid);
        const myDocRef = doc(myUsersCollection, TypeDocument.USER);
        const fUser = (await getDoc(myDocRef)).data();
        const user = UserData.fromFirebase(fUser);
        this._user = user;
        this.store.dispatch(authActions.setUser({ user }))
      } else {
        this._user = new User('', '', '');
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(entryExitActions.unSetItems());
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

        const myUsersCollection: CollectionReference = collection(this.firestore, user.uid);
        const myDocRef = doc(myUsersCollection, TypeDocument.USER);

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

  get user() {
    // avoid mutations
    return { ...this._user };
  }
}
