import { Injectable } from "@angular/core";
import { PostModel } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root' })
export class PostService{
    private items: PostModel[] = [];
    private itemsUpdated = new Subject<PostModel[]>();      //如果PostModel有变化的话，items也跟着变

    constructor(private http : HttpClient, private authService: AuthService) {}       // 创建了一个http的instance
    getItems(){
        // return [...this.items];
        this.http
            .get<{ message : string; body : any}>(     
                'http://localhost:3000/api/posts/'       
            )
            .pipe(
                map((postData)=>{
                    return postData.body.map((post: { title: any; content: any; _id: any; imagePath: any; })=> {
                        return { 
                            title: post.title, 
                            content: post.content, 
                            id: post._id,
                            imagePath: post.imagePath,
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

    addItems(titleInstance: string, contentInstance: string, imageInstance: File){
        const instance = new FormData();
        instance.append('title', titleInstance);
        instance.append('content', contentInstance);
        instance.append('image', imageInstance, titleInstance);

        this.http
            .post<{ message: string; post: PostModel }>(
                'http://localhost:3000/api/posts/',
                instance
            )
            .subscribe((responseData) => {
                const newItem: PostModel= {
                    id: responseData.post.id,
                    title: titleInstance,
                    content: contentInstance,
                    imagePath: responseData.post.imagePath,
                }

                this.items.push(newItem); // [title: "title", content:"content"]
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

    getItem(id: string){
        return this.http.get<{
          imagePath: string; _id: String, title: String, content: string
}>(
            'http://localhost:3000/api/posts/' + id
        );
    }

    updateItem(id: string, title: string, content: string, imageInstance?: File) {
        const post: PostModel = { id: id, title: title, content: content};
        this.http
          .put('http://localhost:3000/api/posts/' + id, post)
          .subscribe((response) => {
            console.log(response);
            const updatedItems = [...this.items];
            const oldItemIndex = updatedItems.findIndex((p) => p.id === post.id);
            updatedItems[oldItemIndex] = post;      // 新的post替换老的post
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);        //更新
        });
    }
}

function subscribe(arg0: (postData: any) => void) {
    throw new Error("Function not implemented.");
}
