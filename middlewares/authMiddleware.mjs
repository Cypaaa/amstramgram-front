import userService from '../services/userService.mjs';

const verify  = async (req) => {
    const token = req.cookies['token'];
    if (typeof(token) != 'string' || token.length < 32) {
        return null;
    }

    return await userService.getUserSelf(token);
};

const optional = async (req, res, next) => {
    req.user = await verify(req);
    next();
};

const required = async (req, res, next) => {
    req.user = await verify(req);
    if (req.user == null) {
        return res.redirect('/');
    }
    next();
};

const authMiddleware = {
    optional,
    required,
};

export default authMiddleware;