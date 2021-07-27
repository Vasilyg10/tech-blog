const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, post } = require('../models');

router.get('/', (req, res) => {
    post.findAll({
        attributes: [
            'id',
            'title',
            'created at'
        ],
        include: [
            {
                module: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})