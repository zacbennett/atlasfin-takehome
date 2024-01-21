import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from './firebase';
import { Article } from "../types/Article";
import ArticleNotFoundError from "../exceptions/ArticleNotFoundError";

class API {
    static async getArticles():Promise<Article[]> {

        return await getDocs(collection(db, "articles"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data() }));
                return newData as Article[];
            })

    }
    static async getArticleById(id: string):Promise<Article> {

        const q = query(collection(db, "articles"), where("id", "==", id));

        return await getDocs(q).then((querySnapshot) => {
            // todo: handle sheet
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data() }));
            if (newData.length === 0) {
                throw new ArticleNotFoundError(`Article with id ${id} not found`);
            }
            return newData[0] as Article;
        })

    }
}
export default API;