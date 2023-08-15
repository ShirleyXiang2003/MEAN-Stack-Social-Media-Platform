import { Injectable } from "@angular/core";
import { PostModel } from "./post.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root' })
export class PostService{
    private items: PostModel[] = [];
    private itemsUpdated = new Subject<PostModel[]>();      //如果PostModel有变化的话，items也跟着变

    getItems(){
        return [...this.items];
    }

    getItemUpdatedListener(){
        return this.itemsUpdated.asObservable();    // 监听到 state 1 -> state 2
    }

    addItems(titleInstance: string, contentInstance: string){
        const instance: PostModel = {
            title: titleInstance, 
            content: contentInstance
        };
        this.items.push(instance);
        this.itemsUpdated.next([...this.items]);
    }
}