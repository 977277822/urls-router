/**
 * Created by Mr.Carry on 2017/1/3.
 */
"use strict";
var express = require('express');


let urls = function (express_app, config_file_path) {
    Object.keys(config_file_path.urls).forEach((key)=> {
        let items = config_file_path.urls[key];
        let router_filter = config_file_path.filter;
        var router = express.Router();
        if (router_filter && router_filter[key]) {
            middleware(router, router_filter[key]);
        }

        items.forEach((item)=> {
            let url = item.url;
            let action = item.action;
            let type = item.type;
            let filter = item.filter;
            router[type](url, function (req, res, next) {
                if (filter)
                    filter(req, res, next);
                action(req, res, next);
            });
        });

        express_app.use(key, router);
    });
};

let middleware = function (router, middleware_func) {
    router.use(function (req, res, next) {
        middleware_func(req, res, next);
    });
};

module.exports = function (express_app, config_file_path) {
    let config = require(config_file_path);
    urls(express_app, config);
};