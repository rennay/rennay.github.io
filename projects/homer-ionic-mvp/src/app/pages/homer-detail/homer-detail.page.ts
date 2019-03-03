import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-homer-detail',
  templateUrl: './homer-detail.page.html',
  styleUrls: ['./homer-detail.page.scss'],
})
export class HomerDetailPage implements OnInit {
  _homer_list: Observable<any>;
  subs: Subscription[] = new Array();
  _result: any;
  _title: String;
  _soundCheck: boolean;

  constructor(private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public dbSvc: DbService) {

    this._result = {
      start_time: {
        seconds: Number
      },
      light_token: String,
      intent_id: String,
      auth_code: String,
      heavy_token: String,
      api_data: String,
      filename: String,
      imagePath: String,
      soundLink: String
    };
  }

  ngOnInit() {
    var _api = this.route.snapshot.paramMap.get('api');
    var _queryUID = this.route.snapshot.paramMap.get('id');
    this._title = this.jsUcfirst(_api);

    console.log(`--- _api: ${_api} _queryUID: ${_queryUID}`);

    var isDoc = false;
    this._soundCheck = false;    
    if (_queryUID === '0') {
      var query = ref => ref.orderBy('start_time', 'desc').limit(1);
      this._homer_list = this.dbSvc.collection$(`/latest`);
      this._soundCheck = true;
    }
    else {
      this._homer_list = this.dbSvc.doc$(`/${_api}/${_queryUID}`);
      isDoc = true;
    }

    this._result['imagePath'] = "assets/images/homer_thinking.png";

    var sub = this._homer_list.subscribe(data => {
      var val = data;
      if (isDoc === false) {
        val = data[0];
      }

      this._result['API'] = val.API;
      this._result['env'] = val.env;
      this._result['light_token'] = val.light_token;
      this._result['start_time'].seconds = val.start_time.seconds;
      this._result['intent_id'] = val.intent_id;
      this._result['auth_code'] = val.auth_code;
      this._result['heavy_token'] = val.heavy_token;
      this._result['api_data'] = val.api_data;
      var status = val.status;

      this._result['imagePath'] = "assets/images/homer_woohoo.png";
      this._result['soundLink'] = "http://www.richmolnar.com/Sounds/Homer%20-%20Woohoo!%20(1).wav"
      if (status === false) {
        this._result['imagePath'] = "assets/images/homer_doh.png";
        this._result['soundLink'] = "http://www.richmolnar.com/Sounds/Homer%20-%20D'oh!%20(1).wav";
      }

      const ref = this.storage.ref(val.filename);
      var s = ref.getDownloadURL().subscribe(filenameUrl => {
        this._result['filename'] = filenameUrl;
      });
      this.subs.push(s);

      if (isDoc === false) {
        if (this._soundCheck === true) {
          this.playSound(this._result['soundLink']);
        }
      }
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): any {
    var i = 0;
    for (i = 0; i < this.subs.length; i++) {
      let sub = this.subs[i];
      console.log("-- unsubscribing...");
      sub.unsubscribe();
    }
  }

  playHomer() {
    console.log("-- playHomer..");
    this.playSound("http://www.richmolnar.com/Sounds/Homer%20-%20Woohoo!%20(1).wav");
  }

  playSound(src) {
    console.log(`-- playSound(${src})`);

    let audio = new Audio();
    audio.src = src;
    audio.load();
    // audio.play();

    const playPromise = audio.play();
    if (playPromise !== null) {
      playPromise.catch(() => { audio.play(); })
    }
  }

  openUrl(url) {
    window.open(url, '_system');
  }

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
