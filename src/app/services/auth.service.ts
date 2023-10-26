import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User as DataUser } from '../models/user.model';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription!: Subscription;
  private firestore: Firestore = inject(Firestore);
  usersCollection!: CollectionReference;

  constructor() {
    this.usersCollection = collection(this.firestore, 'user')
  }

  initAuthListener() {
    this.authState$.subscribe((fuser: User | null) => {
      console.log('authStateSubscription: ', fuser);
    })
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  createUser(name: string, email: string, password: string) {

    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser = new DataUser(
          user.uid,
          name,
          email,
        );

        addDoc(collection(this.firestore, `${user.uid}/user`), newUser)
          .then((documentReference: DocumentReference) => {
            console.log(documentReference);            
          });

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
