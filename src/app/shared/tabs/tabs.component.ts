import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Tab } from './tab';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'anms-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    @Input() tabs: Tab[];
    @Input() name: string = "";
    activeLink1: any
    activeLink = '';
    background: ThemePalette = undefined;
    constructor(private _router: Router) {

    }

    ngOnInit() {
        this.activeLink = this.tabs[0].path
    }
}
