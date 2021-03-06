import { Component } from '@angular/core';
import { MenuController, App, NavParams, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';

import { LeavePage } from '../leave/leave';
import { TimeTablelistPage } from '../timetablelist/timetablelist';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profile: ProfileModel = new ProfileModel();
  loading: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProfileService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.profileService
      .getData()
      .then(data => {
        this.profile.user = data.user;
        this.profile.following = data.following;
        this.profile.followers = data.followers;
        this.profile.posts = data.posts;
        this.profile.teachers = data.teachers;
        this.loading.dismiss();
      });
  }

}
