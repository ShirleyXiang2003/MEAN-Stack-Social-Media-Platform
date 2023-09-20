import { Injectable } from "@angular/core";
import { PostModel } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root' })
export class PostService{
    private items: PostModel[] = [];
    private itemsUpdated = new Subject<PostModel[]>();      //如果PostModel有变化的话，items也跟着变

    constructor(private http : HttpClient) {}       // 创建了一个http的instance
    getItems(){
        // return [...this.items];
        this.http
            .get<{ message : string; body : any}>(     
                'http://localhost:3000/api/posts'       
            )
            .pipe(
                map((postData)=>{
                    return postData.body.map((post: { title: any; content: any; _id: any; })=> {
                        return { 
                            title: post.title, 
                            content: post.content, 
                            id: post._id,
                        };
                    });
                })
            )
            .subscribe((postData)=> {
                console.log(postData);
                this.items=postData;
                this.itemsUpdated.next([...this.items]);
            });

    }

    getItemUpdatedListener(){
        return this.itemsUpdated.asObservable();    // 监听到 state 1 -> state 2
    }

    addItems(titleInstance: string, contentInstance: string){
        const instance: PostModel = {
            id: '1',
            title: titleInstance, 
            content: contentInstance
        };

        this.http
            .post<{ message: string; postId: string }>(
                'http://localhost:3000/api/posts',
                instance
            )
            .subscribe((responseData) => {
                console.log(responseData);
                const postId = responseData.postId;
                instance.id = postId;
                this.items.push(instance); // [title: "title", content:"content"]
                this.itemsUpdated.next([...this.items]);
                console.log('form add Item', this.items);
            });
            
    }

    //postId 来确认要删除掉post
    deleteItem(postId: string) {
        this.http
            .delete('http://localhost:3000/api/posts/' + postId)
            .subscribe((responseData)=> {
                console.log(responseData);
                const updatedPosts = this.items.filter((post) => post.id !== postId);
                this.items = updatedPosts;
                this.itemsUpdated.next([...this.items]);
            });
    }
}

function subscribe(arg0: (postData: any) => void) {
    throw new Error("Function not implemented.");
}
