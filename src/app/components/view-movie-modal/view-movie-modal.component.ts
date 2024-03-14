import { Component, Input,OnInit } from '@angular/core';
import {NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-movie-modal',
  templateUrl: './view-movie-modal.component.html',
  styleUrls: ['./view-movie-modal.component.scss']
})
export class ViewMovieModalComponent implements OnInit  {

  @Input() selectedMovie: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.selectedMovie['releasedate']=  this.selectedMovie['release-date']

  }

  convertMinutesToHoursAndMinutes(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const divisor = runtime % 60;
    const minutes = Math.floor(divisor);

    return `${hours}:${minutes < 10? '0' : ''}${minutes}`;
  }

  dismiss(){
    this.activeModal.dismiss();
  }

}
