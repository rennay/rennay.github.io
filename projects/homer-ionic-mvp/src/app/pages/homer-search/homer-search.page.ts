import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homer-search',
  templateUrl: './homer-search.page.html',
  styleUrls: ['./homer-search.page.scss'],
})
export class HomerSearchPage implements OnInit {
  _api: String;
  _env: String;
  _limit: String;

  constructor(private router: Router) { }

  ngOnInit() {
    this._api = "accounts";
    this._env = "sandbox";
    this._limit = "72";
  }

  search() {
    console.log("-- search");
    console.log(`_api: ${this._api}`);
    console.log(`_env: ${this._env}`);
    console.log(`_limit: ${this._limit}`);
    this.router.navigate([`/homer-list/${this._api}/${this._env}/${this._limit}`]);
  }
}
