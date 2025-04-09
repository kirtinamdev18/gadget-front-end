import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Gadget } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    gadgets?: Gadget[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(gadgets => {
            this.loading = false;
            this.gadgets = gadgets;
        });
    }
}