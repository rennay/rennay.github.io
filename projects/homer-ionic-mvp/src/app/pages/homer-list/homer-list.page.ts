import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-homer-list',
  templateUrl: './homer-list.page.html',
  styleUrls: ['./homer-list.page.scss'],
})
export class HomerListPage implements OnInit {
  _homer_list: Observable<any>;
  _api: String;
  _env: String;
  _title: String;
  _allenv: boolean;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              public dbSvc: DbService) { }

  ngOnInit() {
    this._api = this.route.snapshot.paramMap.get('api');
    this._env = this.route.snapshot.paramMap.get('env');
    var _limit = Number(this.route.snapshot.paramMap.get('limit'));
    this._title = this.jsUcfirst(this._api) + " - " + this.jsUcfirst(this._env);

    console.log(`--- _api: ${this._api} _env: ${this._env} _limit: ${_limit}`);

    if (_limit > 144) {
      _limit = 144;
    }

    var query = ref => ref.orderBy('start_time', 'desc').limit(_limit);
    this._allenv = true;
    if (this._env !== '*') {
      query = ref => ref.where('env', '==', this._env).orderBy('start_time', 'desc').limit(_limit);
      this._allenv = false;
    }
    // var query = ref => ref.where('API', '==', _api).orderBy('start_time', 'desc').limit(_limit);
    
    this._homer_list = this.dbSvc.collection$(`/${this._api}`, query);
  }

  load(_api, _resultID) {
    console.log(`--- _api: ${_api} _resultID: ${_resultID}`);
    this.router.navigate([`/homer-detail/${_api}/${_resultID}`]);
  }

  jsUcfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }  
}
