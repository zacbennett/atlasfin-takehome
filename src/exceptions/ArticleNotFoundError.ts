class ArticleNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ArticleNotFoundError"
    }
}

export default ArticleNotFoundError;