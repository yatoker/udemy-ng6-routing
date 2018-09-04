import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  user: { id: number, name: string };
  paramsSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    // this.route.params is an observable that means once subscribed to it, whenever the route is reached, the callback func. will be executed.
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'],
        this.user.name = params['name']
    });
  }

  ngOnDestroy(): void {
    //Normally, observable subscription won't be removed when a component is destroyed. 
    //Subscription information is saved in the memory and whenever a destroyed and subscribed component is reinited, it gets subscribed again.
    //Calling unsubscribe on component destroy method does the job when ubsubscription needed.
    this.paramsSubscription.unsubscribe();
  }

}
