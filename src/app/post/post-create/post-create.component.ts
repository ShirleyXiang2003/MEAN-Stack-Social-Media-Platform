import { Component } from "@angular/core";

@Component({
    selector: 'post-create',
    templateUrl: './post-create.component.html',

})

export class PostCreateComponent {
    content = 'hi';
    enterValue = 'Demo entered value';
    clickMe(){
        console.log('hi I am here.');
    }

    fakeClick(){
        console.log('I am a fake click');
        this.content = 'Now I am hello not hi.';
        this.enterValue = 'Value changed.';
    }
}