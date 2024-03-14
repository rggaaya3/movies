import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { MovieService } from './services/movie-service.service';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hack-app';

  constructor(
    public router: Router,
    private userService: UserService,
    private movieService: MovieService,
    private dataSharingService: DataSharingService,
  ) { }

  ngOnInit(): void {
    // Simulate user information (replace this with your actual user data)
    const user = {
      "id": "XDDlRVfk4blckF6fnLw6",
      "name": "David",
      "email": "david@example.com",
      "userId": "XDDlRVfk4blckF6fnLw6",
      "watchList": [
        
      ]
    };

    // Set user information on app load
    this.userService.setUserInfo(user);
    
  }


  navigateToRoute(route: string) {
    switch (route) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'fav':
        this.router.navigate(['/fav']);
        break;
      default:
        break;
    }
  }
}
