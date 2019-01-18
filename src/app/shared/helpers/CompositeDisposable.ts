import { Subscription, TeardownLogic } from 'rxjs';

export class CompositeDisposable {
  private subscription: Subscription;
  private isSmbSubscribed = false;

  constructor() {
    this.subscription = new Subscription();
  }

  public add(subscriber: TeardownLogic): void {
    this.subscription.add(subscriber);
    this.isSmbSubscribed = true;
  }

  public unsubscribe(): void {
    if (this.isSmbSubscribed) {
      this.subscription.unsubscribe();
      this.isSmbSubscribed = false;
    }
  }
}
