import userService from "../services/userService.mjs";

const home = async (req, res) => {
    // get following list, get latest posts from following list
    // else (no follows)
    try {
    const users = await userService.getUsers(req.cookies['token']);
    if (!Array.isArray(users)) {
        throw new Error("couldn't request user list");
    }

    res.render('pages/home.ejs', { users });
    } catch (error) {
        res.status(500).json("Internal error");
    }
};

const profile = async (req, res) => {
    try {
    const user = await userService.getUser(req.cookies['token'], req.params.uuid);
    if (user == null) {
        throw new Error("couldn't request user list");
    }

    res.render('pages/user.ejs', { user });
    } catch (error) {
        res.status(500).json("Internal error");
    }
};

const loginGet = async (req, res) => {
    res.render('pages/login.ejs');
};

const loginPost = async (req, res) => {
    const { username_or_email, password } = req.body;
    const result = await userService.Login(username_or_email, username_or_email, password);
    if (result?.token != null) {
        res.cookie('token', result.token);
        res.redirect('/posts');
    } else {
        res.redirect('/login');
    }
};

const postController = {
    home,
    profile,
    loginGet,
    loginPost
};

export default postController;