import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.navigate(["register"], { relativeTo: this.route })
  }
  ;


}
