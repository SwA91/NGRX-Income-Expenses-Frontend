import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, Firestore, collection, doc, docSnapshots, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { map, takeWhile } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { TypeDocument } from '../enum/shared.enum';
import * as entryExitActions from '../income-expenses/income-expenses.actions';
import { User, User as UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User;
  private auth: Auth = inject(Auth);
  private authState$ = authState(this.auth);
  private firestore: Firestore = inject(Firestore);
  private isLogin: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  initAuthListener() {

    this.authState$.subscribe(async (fAuth) => {

      this.isLogin = !!fAuth?.uid;

      if (fAuth?.uid) {

        this.snapShotUser(fAuth.uid)
          .pipe(takeWhile(() => this.isLogin))
          .subscribe((resp) => {
            const user = UserData.fromFirebase(resp);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }))
          });

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

  private snapShotUser(uid: string) {
    return docSnapshots(doc(this.firestore, uid, TypeDocument.USER)).pipe(map(data => data.data()));
  }

  get user() {
    // avoid mutations
    return { ...this._user };
  }
}
