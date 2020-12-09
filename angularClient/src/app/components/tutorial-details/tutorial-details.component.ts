import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  submitted = false;
  id: any;

  tutorial = {
    title: '',
    description: '',
    published: false,
  }

  constructor(private tutorialService: TutorialService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    this.retrieveTutorialById(this.id)
  }

  retrieveTutorialById(id: any): void {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.tutorial.title = data.title;
          this.tutorial.description = data.description;
          this.tutorial.published = data.published;
        },
        error => {
          console.log(error);
        });
  }

  updateTutorialById(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    }
    this.tutorialService.update(this.id, data)
      .subscribe(
        data => {
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
