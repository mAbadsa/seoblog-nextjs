const express = require('express');
const router = express.Router();

const { getTags, createTag} = require("../controllers/tag");

const { tagCreateValidator } = require('../validators/tag');
const { runValidation } = require('../validators/index');

const { requireSignin } = require('../controllers/auth');

router.route('/tag').post(tagCreateValidator, runValidation, requireSignin, createTag)

router.route('/tags').get(getTags);

module.exports = {
    router
}