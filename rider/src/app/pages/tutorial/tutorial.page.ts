import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private router: Router) { }
  @ViewChild('tutorialSlides') tutorialSlides: IonSlides;
  ngOnInit() {
  }

  async skipTutorial(){
       await Storage.set({key:'tutorialComplete', value: "true"});
       this.router.navigateByUrl('');
  }

  async next(){
      await this.tutorialSlides.slideNext();
  }

}
