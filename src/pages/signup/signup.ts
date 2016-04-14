import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Page({
    template: require('./signup.html')
})
export class SignupPage {
    signup: { username?: string, password?: string } = {};
    submitted = false;

    constructor(private nav: NavController, private userData: UserData) { }

    onSignup(form) {
        this.submitted = true;

        if (form.valid) {
            this.userData.signup();
            this.nav.push(TabsPage);
        }
    }
}
