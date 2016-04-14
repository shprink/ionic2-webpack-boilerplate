import {Page, NavParams} from 'ionic-angular';


@Page({
    template: require('./session-detail.html')
})
export class SessionDetailPage {
    session: any;

    constructor(private navParams: NavParams) {
        this.session = navParams.data;
    }
}
