import { Component, Input, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/routes/movies/services/movie-api.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  constructor(private movieApiService: MovieApiService) { }

  @Input() movie: any;

  ngOnInit() {
  }

}
