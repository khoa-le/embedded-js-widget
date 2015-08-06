define(['jquery', 'ractive', 'rv!templates/job', 'text!css/my-widget_embed.css'], function (wnwQuery, Ractive, jobTemplate, css) {

    'use strict';
    wnwQuery.noConflict(true);
    var app = {
        init: function () {
            Ractive.DEBUG = false;
            var html = '<html><head></head><body>Foo</body></html>';
            var $iframe = vnwQuery("<iframe></iframe>");

            wnwQuery("#vietnamworks-jobs").append($iframe);
            var $style = wnwQuery("<style></style>", {type: "text/css"});
            $style.text(css);
            wnwQuery("head").append($style);
            wnwQuery.ajax({
                url: "http://api.sontt.vnw25.com/jobs/search-jsonp/",
                dataType: "jsonp",
                data: {
                    'CONTENT-MD5' : "4c443c7e2c515d6b4b4d693c2f63434a7773226a614846733c4c4d4348",
                    'email': wnwQuery('#vietnamworks-jobs').data('vnw-email'),
                    'job_title': wnwQuery('#vietnamworks-jobs').data('vnw-keyword'),
                    'job_category': wnwQuery('#vietnamworks-jobs').data('vnw-industry'),
                    'job_location': wnwQuery('#vietnamworks-jobs').data('vnw-location'),
                    'page_size': wnwQuery('#vietnamworks-jobs').data('vnw-numjobs'),
                    'lang': wnwQuery('#vietnamworks-jobs').data('vnw-lang')
                }

            }).then(function (resp) {

                resp = wnwQuery.parseJSON(resp);
                var data = resp.data;

                // render our main view
                this.ractive = new Ractive({

                    el: wnwQuery("#vietnamworks-jobs"),
                    template: jobTemplate,
                    data: {
                        jobs:data.jobs
                    }
                });
            }, function (resp) {

            });

        },
        reload: function ($email,$job_title,$job_category,$job_location,$page_size,$lang) {
            Ractive.DEBUG = true;
            var $style = wnwQuery("<style></style>", {type: "text/css"});
            $style.text(css);
            wnwQuery("head").append($style);
            wnwQuery.ajax({
                url: "http://api.sontt.vnw25.com/jobs/search-jsonp/",
                dataType: "jsonp",
                data: {
                    'CONTENT-MD5' : "4c443c7e2c515d6b4b4d693c2f63434a7773226a614846733c4c4d4348",
                    'email':$email,
                    'job_title':$job_title,
                    'job_category': $job_category,
                    'job_location': $job_location,
                    'page_size':$page_size,
                    'lang': $lang
                }

            }).then(function (resp) {

                resp = wnwQuery.parseJSON(resp);
                var data = resp.data;

                // render our main view
                this.ractive = new Ractive({
                    el: wnwQuery('#vietnamworks-jobs'),
                    template: jobTemplate,
                    data: {
                        jobs:data.jobs
                    }
                });
            }, function (resp) {

            });
        }
    };

    return app;

});
