import { Injectable } from "@angular/core";
import { PostModel } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root' })
export class PostService{
    private items: PostModel[] = [];
    private itemsUpdated = new Subject<PostModel[]>();      //如果PostModel有变化的话，items也跟着变

    constructor(private http : HttpClient) {}       // 创建了一个http的instance
    getItems(){
        // return [...this.items];
        this.http
            .get<{ message : String; body : PostModel[]}>(     
                'http://localhost:3000/api/posts'       
            )
            .subscribe((postData)=> {
                console.log(postData);
                this.items=postData.body;
                this.itemsUpdated.next([...this.items]);
            });

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

function subscribe(arg0: (postData: any) => void) {
    throw new Error("Function not implemented.");
}
