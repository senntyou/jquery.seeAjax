
'use strict';

var $ = require('jquery');

var logger = require('./util/logger');
var getReqInfo = require('./get_req_info');
var preHandle = require('./pre_handle');
var postHandle = require('./post_handle');

/**
 * send a request
 *
 * @param method Request Method, like GET, POST, PUT, DELETE, OPTION
 * @param urlName Request url name
 * @param reqData Request data
 * @param callback Success callback
 * @param type Response data type
 * @param stringify Whether stringify request data
 * @param extraOption Extra jquery ajax option
 */
module.exports = (method, urlName, reqData, callback, type, stringify, extraOption) => {

    /**
     * real name, commonly is the same as urlName
     */
    var name = data.option.name[urlName];

    /**
     * current environment index
     * @type {Object.<string, *>|null|*}
     */
    var index = data.option.env;

    if (!name) {
        logger.throwError(`name '${urlName}' is not defined.`);
        return;
    }

    /**
     * request info
     * @type {{url, reqData}|{}|*}
     */
    var reqInfo = getReqInfo(urlName, reqData);

    /**
     * default response doc type
     */
    !type && (type = 'json');

    /**
     * pre handle
     */
    preHandle(reqInfo.reqData, urlName);

    /**
     * custom ajax implement function
     *
     * @type {string|Array|implement|{implement}|*}
     */
    var implement = data.option.implement && data.option.implement[urlName];
    if (implement instanceof Array) implement = implement[index];

    // custom implement
    if (implement) {
        logger.info(`Custom implement ajax for "${urlName}", and request data is: `);
        logger.info(JSON.stringify(reqData));

        var result = implement(!stringify ? reqInfo.reqData : JSON.stringify(reqInfo.reqData));

        logger.info(`result for "${urlName}" is: `);
        logger.info(JSON.stringify(result));

        postHandle(result, reqData, urlName);
        callback(result);
    }
    else {
        var options = extraOption || {};
        options.type = method;
        options.data = !stringify ? reqInfo.reqData : JSON.stringify(reqInfo.reqData);
        options.dataType = type;
        options.success = (res) => {
            /**
             * post handle
             */
            postHandle(res, reqData, urlName);
            callback(res);
        };
        $.ajax(reqInfo.url, options);
    }
};