import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  constructor(
    private titleServive: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd ))
      .pipe(map(() => this.activatedRoute))
      .pipe(map( route => {
        while(route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleServive.setTitle(event.title));
  }    
}
