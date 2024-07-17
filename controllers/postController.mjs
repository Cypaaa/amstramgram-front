import postService from "../services/postService.mjs";

const posts = async (req, res) => {
    const { page = 1, limit = 25 } = req.query;
    const posts = await postService.getPosts(req.cookies['token'], page, limit);
    res.render('pages/posts.ejs', { posts });
};

const post = async (req, res) => {
    const { id } = req.params;
    const post = await postService.getPost(req.cookies['token'], id);
    res.render('pages/post.ejs', { post });
};

const newpostGet = async (req, res) => {
    res.render('pages/newpost.ejs');
};

const newpostPost = async (req, res) => {
    const result = await postService.createPost(req.cookies['token'], req.body.title, req.files);
    if (result != null && parseInt(result.post_id) > 0) {
        res.redirect('/posts/' + result.post_id);
    } else {
        res.redirect(400, '/posts/new');
    }
};

const postController = {
    posts,
    post,
    newpostGet,
    newpostPost
};

export default postController;