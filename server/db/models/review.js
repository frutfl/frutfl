const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    content: {
        type: Sequelize.TEXT,
        validate: {
            len: [0, 10000]
        }
    },
    title: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 140]
        }
    }
});

module.exports = Review;
