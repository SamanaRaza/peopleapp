import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { Tab } from './tab';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'tab-link',
    templateUrl: './tab-link.component.html',
    styleUrls: ['./tab-link.component.scss']
})
export class TabLinkComponent implements OnInit, OnDestroy {
    @Input() tab: Tab;
    @Input() activeLink: any;
    activeLink1: string
    constructor(private _el: ElementRef) {
    }

    ngOnInit() {
        this.activeLink1 = this.activeLink;
    }

    ngOnDestroy() {

    }

}
