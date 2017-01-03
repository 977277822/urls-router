/**
 * Created by Mr.Carry on 2017/1/3.
 */
"use strict";



var urls = function (express_app, config_file_path) {
    Object.keys(config_file_path.urls).forEach((key)=> {
        let items = config_file_path.urls[key];
        var express = require('express');
        var router = express.Router();
        items.forEach((item)=> {
            let url = item.url;
            let action = item.action;
            let type = item.type;
            router[type](url, action);
        });

        express_app.use(key, router);
    });
};

module.exports = function (express_app, config_file_path) {
    let config = require(config_file_path);
    urls(express_app, config);
};