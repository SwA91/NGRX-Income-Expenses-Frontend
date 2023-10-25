import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, user, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private auth: Auth = inject(Auth);
  private user$ = user(this.auth);
  private userSubscription!: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log('user$: ', aUser);
    })
  }

  async createUser(name: string, email: string, password: string): Promise<boolean> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('createUser', user);
      
      return user.uid !== '';
    } catch (error) {
      console.warn('createUser: ', error);
      
      return false;
    }
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }
}
