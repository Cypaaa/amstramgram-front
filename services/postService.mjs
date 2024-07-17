import fetch from "node-fetch";
import FormData from 'form-data';
import config from "../config/config.mjs";

const ENDPOINT = `${config.apiUrl}/posts`

const getPosts = async (token, page, limit) => {
    const response = await fetch(`${ENDPOINT}?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

const getPost = async (token, post_id) => {
    const response = await fetch(`${ENDPOINT}/${post_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
};

const createPost = async (token, title, images) => {
    const formData = new FormData();

    // Append title as a field in the form data
    formData.append('title', title);

    try {
        images.forEach((image, index) => {
            // Append each file to the form data
            formData.append('images[]', image.buffer, {
                filename: image.originalname,
                contentType: image.mimetype
            });
        });

        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...formData.getHeaders() // Include necessary headers for multipart form data
            },
            body: formData
        });

        if (response.status != 201) {
            throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
};

const postService = {
    getPosts,
    getPost,
    createPost
};

export default postService;