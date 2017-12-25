/**
 * Created by senntyou on 2017/3/27.
 */

seeAjax.config({
    env: 0, //environment
    name: {
        test: "test",
        implement: 'implement'
    },
    url: {
        test: [
            "a.json",
            "b.json"
        ],
        implement: [
            "",
            "b.json"
        ]
    },
    requestKeys: {
        test: [
            {
                key1: 'keya'
            },
            {
                key1: 'keyb'
            }
        ],
        implement: [
            {
                key1: 'keya'
            },
            {
                key1: 'keyb'
            }
        ]
    },
    responseRefactor: {
        common: [
            {
                success: 'result!bool'
            },
            {
                success: 'result!bool'
            }
        ],
        test: [
            {
                data: [
                    {
                        newId: 'id',
                        images: 'pics',
                        _images: [
                            {
                                newId: 'id',
                                newSrc: 'src'
                            }
                        ]
                    }
                ]
            },
            {
                data: [
                    {
                        images: [
                            {
                                newId: 'id',
                                newSrc: 'src'
                            }
                        ]
                    }
                ]
            }
        ],
        implement: [
            {
                data: [
                    {
                        newId: 'id',
                        images: 'pics',
                        _images: [
                            {
                                newId: 'id',
                                newSrc: 'src'
                            }
                        ]
                    }
                ]
            },
            {
                data: [
                    {
                        images: [
                            {
                                newId: 'id',
                                newSrc: 'src'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    preHandle: {
        common: [
            function (req) {
                req.common = 0
            },
            function (req) {
                req.common = 1
            }
        ],
        test: [
            function (req) {
                req.test = 0
            },
            function (req) {
                req.test = 1
            }
        ],
        implement: [
            function (req) {
                req.test = 0
            },
            function (req) {
                req.test = 1
            }
        ]
    },
    postHandle: {
        common: [
            function (res, req) {
                res.common = 0;
                console.log('req:');
                console.log(req);
            },
            function (res, req) {
                res.common = 1;
                console.log('req:');
                console.log(req);
            }
        ],
        test: [
            function (res, req) {
                res.test = 0;
                console.log('req:');
                console.log(req);
            },
            function (res, req) {
                res.test = 1;
                console.log('req:');
                console.log(req);
            }
        ],
        implement: [
            function (res) {
                res.test = 0
            },
            function (res) {
                res.test = 1
            }
        ]
    },
    implement: {
        implement: [
            function (data) {
                return {
                    "result": 1,
                    "msg": "success",
                    "data": [
                        {
                            "id": 1,
                            "pics": [
                                {
                                    "id": 1,
                                    "src": "a.jpg"
                                },
                                {
                                    "id": 2,
                                    "src": "b.jpg"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "pics": [
                                {
                                    "id": 11,
                                    "src": "aa.jpg"
                                },
                                {
                                    "id": 22,
                                    "src": "bb.jpg"
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
});

$.seeAjax.get('test', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);

    $.seeAjax.config({
        environment: 1
    });
    $.seeAjax.post('test', {key1: 'haha'}, function (res) {
        console.log('env: 1');
        console.log(res);

        makeTest2();
    }, !0);
});

$.seeAjax.get('implement', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);
});

function makeTest2() {
    $.seeAjax.config({
        environment: 0, //环境标识（用于数组选值）：0->服务器环境, 1->本地环境
        name: {
            test2: "test2"
        },
        url: {
            test2: [
                "a.json",
                "b.json"
            ]
        },
        requestKeys: {
            test2: [
                {
                    key1: 'keya'
                },
                {
                    key1: 'keyb'
                }
            ]
        },
        responseRefactor: {
            common: [
                {
                    success: 'result!bool'
                },
                {
                    success: 'result!bool'
                }
            ],
            test2: [
                {
                    data: [
                        {
                            newId: 'id',
                            images: 'pics',
                            _images: [
                                {
                                    newId: 'id',
                                    newSrc: 'src'
                                }
                            ]
                        }
                    ]
                },
                {
                    data: [
                        {
                            images: [
                                {
                                    newId: 'id',
                                    newSrc: 'src'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        preHandle: {
            common: [
                function (req) {
                    req.common2 = 0
                },
                function (req) {
                    req.common2 = 1
                }
            ],
            test2: [
                function (req) {
                    req.test2 = 0
                },
                function (req) {
                    req.test2 = 1
                }
            ]
        },
        postHandle: {
            common: [
                function (res) {
                    res.common2 = 0
                },
                function (res) {
                    res.common2 = 1
                }
            ],
            test2: [
                function (res) {
                    res.test2 = 0
                },
                function (res) {
                    res.test2 = 1
                }
            ]
        }
    });

    $.seeAjax.put('test2', {key1: 'haha'}, function (res) {
        console.log('env: 0');
        console.log(res);

        $.seeAjax.config({
            environment: 1
        });
        $.seeAjax.delete('test2', {key1: 'haha'}, function (res) {
            console.log('env: 1');
            console.log(res);
        });
    });
}