//NPM Packages
var randomnumber = require('random-number');

//Configuration Modules
var upload = require('../config/upload-file.config');

//Models
var user = require('../models/application/user');
var post_like_image = require('../models/application/post_like_image');
var post_like_video = require('../models/application/post_like_video');
var post_comment_image = require('../models/application/post_comment_image');
var post_comment_video = require('../models/application/post_comment_video');
var post_media = require('../models/application/post_media');

var post_like_media = require('../models/application/post_like_media');
var post_like = require('../models/application/post_like');
var post_comment = require('../models/application/post_comment');
var post_comment_media = require('../models/application/post_comment_media');

var post_media_test = require('../models/application/post_media_test');

// var mimetype = "https://videogallery.nyc3.digitaloceanspaces.com/1593153878327hd1.jpg";
// console.log(mimetype);
// // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});
// console.log(mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length))

module.exports = {
    // post_images: async function (req, res) {
    //     upload(req, res, async function (error, upload) {
    //         if (error) {
    //             res.status(200).send({ status: false, error: error })
    //         } else {
    //             console.log(req.body.description, req.body.location, req.body.email, req.body.auth_token);
    //             var file_name = [];
    //             console.log(req.files);
    //             if (req.files.images) {
    //                 console.log("inside if");
    //                 console.log(req.files.images)
    //                 const file = req.files.images;
    //                 for (var i = 0; i < file.length; i++) {
    //                     console.log(file[i].key);
    //                     file_name.push(file[i].key);
    //                 }
    //                 console.log(file_name);
    //                 var is_user = await user.findOne({ auth_token: req.body.auth_token });
    //                 var moment = require('moment-timezone');
    //                 var today = new Date();
    //                 var m_today = moment(today);
    //                 var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
    //                 var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
    //                 if (is_user) {
    //                     var post_image = await post_images.create({
    //                         images: file_name,
    //                         email: is_user.email,
    //                         username: is_user.username,
    //                         profile_image: is_user.profile_image,
    //                         description: req.body.description,
    //                         location: req.body.location,
    //                         post_timing: indian_time,
    //                         post_utc_time: utc_time,
    //                         type: 'image'
    //                     });
    //                     if (post_image) {
    //                         res.status(200).send({
    //                             status: true, success: "Successfully Uploaded", response: {
    //                                 post_image: {
    //                                     username: is_user.username,
    //                                     location: post_image.location,
    //                                     images: file_name,
    //                                     // profile_image : 'https://videogallery.nyc3.digitaloceanspaces.com/nature-24.jpg',
    //                                     profile_image: 'https://videogallery.nyc3.digitaloceanspaces.com/' + is_user.profile_image,
    //                                     post_timing: post_image.post_timing,
    //                                     description: post_image.description,
    //                                     post_utc_time: post_image.post_utc_time
    //                                 }

    //                             }
    //                         })
    //                     } else {
    //                         res.status(200).send({ status: false, error: "Not posted successfully" })
    //                     }
    //                 } else {
    //                     res.status(200).send({ status: false, error: "Auth Token doesn't matched..." });
    //                 }
    //             } else {
    //                 res.status(200).send({ status: false, error: 'No files uploaded' })
    //             }
    //         }
    //     })
    // },
    // post_videos: async function (req, res) {
    //     upload(req, res, async function (error, upload) {
    //         if (error) {
    //             res.status(200).send({ status: false, error: error })
    //         } else {
    //             if (req.files.video) {
    //                 var file = req.files.video;
    //                 var file_name = [];
    //                 console.log(req.files)
    //                 for (var i = 0; i < file.length; i++) {
    //                     console.log(file[i].key);
    //                     file_name.push(file[i].key);
    //                 }
    //                 var moment = require('moment-timezone');
    //                 var today = new Date();
    //                 var m_today = moment(today);
    //                 var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
    //                 var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
    //                 var is_user = await user.findOne({ auth_token: req.body.auth_token });
    //                 if (is_user) {
    //                     var post_video = await post_videos.create({
    //                         videos: file_name,
    //                         email: is_user.email,
    //                         username: is_user.username,
    //                         profile_image: is_user.profile_image,
    //                         description: req.body.description,
    //                         location: req.body.location,
    //                         post_timing: indian_time,
    //                         post_utc_time: utc_time,
    //                         type: 'video'
    //                     });
    //                     if (post_video) {
    //                         res.status(200).send({
    //                             status: true, success: "Successfully Uploaded", response: {
    //                                 post_video: {
    //                                     username: is_user.username,
    //                                     location: post_video.location,
    //                                     videos: file_name,
    //                                     // profile_image : 'https://videogallery.nyc3.digitaloceanspaces.com/nature-24.jpg',
    //                                     profile_image: 'https://videogallery.nyc3.digitaloceanspaces.com/' + is_user.profile_image,
    //                                     post_timing: post_video.post_timing,
    //                                     description: post_video.description,
    //                                     post_utc_time: post_video.post_utc_time
    //                                 }

    //                             }
    //                         })
    //                     } else {
    //                         res.status(200).send({ status: false, error: "Not posted successfully" })
    //                     }
    //                 } else {
    //                     res.status(200).send({ status: false, error: "Auth Token doesn't matched..." });
    //                 }
    //             } else {
    //                 res.status(200).send({ status: false, error: 'No files uploaded' })
    //             }
    //         }
    //     })
    // },
    post_like: async function (req, res) {
        var moment = require('moment-timezone');
        var today = new Date();
        var m_today = moment(today);
        var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
        var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
        var is_user = await user.findOne({ auth_token: req.body.auth_token });
        if (is_user) {
            if (req.body.like == '1') {
                console.log("delete like over here");
                console.log(req.body.like, is_user.email, req.body.post_id, req.body.type);
                if (req.body.type === 'image') {
                    var delete_image = await post_like_image.deleteOne({ email: is_user.email, image_id: req.body.post_id, image: req.body.post_name });
                    if (delete_image) {
                        console.log(delete_image);
                        var like_count = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
                        res.status(200).send({ status: true, success: "Successfully unliked image", response: { total_like: like_count } })
                    }
                }
                else if (req.body.type === 'video') {
                    var delete_video = await post_like_video.deleteOne({ email: is_user.email, video_id: req.body.post_id, video: req.body.post_name });
                    if (delete_video) {
                        console.log(delete_image);
                        var like_count = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
                        res.status(200).send({ status: true, success: "Successfully unliked video", response: { total_like: like_count } })
                    }
                }
                else {
                    res.status(200).send({ status: false, error: "type doesn't match" })
                }
            } else if (req.body.like == '0') {
                console.log("create_create........................");
                if (req.body.type === 'image') {
                    console.log(req.body.like);
                    var check_like_image = await post_like_image.findOne({ image_id: req.body.post_id, email: is_user.email, image: req.body.post_name });
                    if (check_like_image) {
                        var check_like_count = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
                        res.status(200).send({ status: false, error: "Already liked image", response: { total_like: check_like_count } })
                    } else {

                        var create_post_like = await post_like_image.create({
                            image: req.body.post_name,
                            image_id: req.body.post_id,
                            email: is_user.email,
                            username: is_user.username,
                            like: 1,
                            timing: indian_time,
                            utc_time: utc_time,
                            type: req.body.type
                        })
                        console.log(create_post_like);
                        if (create_post_like) {
                            console.log("hellooooo");
                            console.log(create_post_like);
                            var total_count = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
                            res.status(200).send({
                                status: true, success: "Successfully liked image",
                                response: {
                                    post_like: {
                                        image: create_post_like.image,
                                        image_id: create_post_like.image_id,
                                        email: create_post_like.email,
                                        like: create_post_like.like,
                                        total_like: total_count,
                                        timing: create_post_like.timing,
                                        utc_time: create_post_like.utc_time

                                    }
                                }
                            })
                        } else {
                            res.status(200).send({ status: false, error: "Not Created successfully.." })
                        }
                    }
                } else if (req.body.type === 'video') {
                    console.log(req.body.like);
                    var check_like_video = await post_like_video.findOne({ video_id: req.body.post_id, email: is_user.email, video: req.body.post_name });
                    if (check_like_video) {
                        var check_like_count = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
                        res.status(200).send({ status: false, error: "Already liked video", response: { total_like: check_like_count } })
                    } else {

                        var create_post_like = await post_like_video.create({
                            video: req.body.post_name,
                            video_id: req.body.post_id,
                            email: is_user.email,
                            username: is_user.username,
                            like: 1,
                            timing: indian_time,
                            utc_time: utc_time,
                            type: req.body.type
                        })
                        console.log(create_post_like);
                        if (create_post_like) {
                            console.log("hellooooo");
                            console.log(create_post_like);
                            var total_count = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
                            res.status(200).send({
                                status: true, success: "Successfully liked video",
                                response: {
                                    post_like: {
                                        video: create_post_like.video,
                                        video_id: create_post_like.video_id,
                                        email: create_post_like.email,
                                        like: create_post_like.like,
                                        total_like: total_count,
                                        timing: create_post_like.timing,
                                        utc_time: create_post_like.utc_time

                                    }
                                }
                            })
                        } else {
                            res.status(200).send({ status: false, error: "Not Created successfully.." })
                        }
                    }
                } else {
                    res.status(200).send({ status: false, error: "type doesn't match" })
                }
            } else {
                res.status(200).send({ status: false, error: "please like or unlike" })
            }
        } else {
            res.status(200).send({ status: false, error: "No Such auth_token" });
        }
    },
    ///////  post like  2
    post_like_2: async function (req, res) {
        var moment = require('moment-timezone');
        var today = new Date();
        var m_today = moment(today);
        var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
        var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
        var is_user = await user.findOne({ auth_token: req.body.auth_token });

        var mimetype = req.body.post_name;
        console.log(mimetype);
        // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});
        console.log(mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length));
        var post_name = mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length);


        if (is_user) {
            if (req.body.like == '1') {
                if (post_name) {
                    var delete_like = await post_like_media.deleteOne({ email: is_user.email, media_id: req.body.post_id, media:post_name });
                    if (delete_like) {
                        console.log(delete_like);
                        var like_count = await post_like_media.find({ media_id: req.body.post_id, media: post_name }).countDocuments();
                        res.status(200).send({ status: true, success: "Successfully unliked " + req.body.type, response: { total_like: `${like_count}` } })
                    }
                } else {
                    var delete_like = await post_like.deleteOne({ email: is_user.email, post_id: req.body.post_id });
                    if (delete_like) {
                        console.log(delete_like);
                        var like_count = await post_like.find({ post_id: req.body.post_id }).countDocuments();
                        res.status(200).send({ status: true, success: "Successfully unliked post", response: { total_like: `${like_count}` } })
                    }
                }
            } else if (req.body.like == '0') {
                if (post_name) {
                    console.log(req.body.like);
                    var check_like = await post_like_media.findOne({ media_id: req.body.post_id, media: post_name, email: is_user.email });
                    if (check_like) {
                        var check_like_count = await post_like_media.find({ media_id: req.body.post_id, media: post_name }).countDocuments();
                        res.status(200).send({ status: false, error: "Already liked " + req.body.type, response: { total_like: `${check_like_count}` } })
                    } else {
                        var create_post_like = await post_like_media.create({
                            media: post_name,
                            media_id: req.body.post_id,
                            email: is_user.email,
                            username: is_user.username,
                            like: 1,
                            timing: indian_time,
                            utc_time: utc_time,
                            type: req.body.type
                        });

                        console.log(create_post_like);
                        if (create_post_like) {
                            console.log("hellooooo");
                            console.log(create_post_like);
                            var total_count = await post_like_media.find({ media_id: req.body.post_id, media: post_name }).countDocuments();
                            res.status(200).send({
                                status: true, success: "Successfully liked " + req.body.type,
                                response: {
                                    post_like_media: {
                                        media: create_post_like.image,
                                        media_id: create_post_like.image_id,
                                        email: create_post_like.email,
                                        like: create_post_like.like,
                                        total_like: total_count ? `${total_count}` : "0",
                                        timing: create_post_like.timing,
                                        utc_time: create_post_like.utc_time

                                    }
                                }
                            })
                        } else {
                            res.status(200).send({ status: false, error: "Not Created successfully.." })
                        }
                    }
                } else {
                    console.log(req.body.like);
                    var check_like = await post_like.findOne({ post_id: req.body.post_id, email: is_user.email });
                    if (check_like) {
                        var check_like_count = await post_like.find({ post_id: req.body.post_id }).countDocuments();
                        res.status(200).send({ status: false, error: "Already liked post", response: { total_like: `${check_like_count}` } })
                    } else {
                        var create_post_like = await post_like.create({

                            post_id: req.body.post_id,
                            email: is_user.email,
                            username: is_user.username,
                            like: 1,
                            timing: indian_time,
                            utc_time: utc_time,
                            type: req.body.type
                        });

                        console.log(create_post_like);
                        if (create_post_like) {
                            console.log("hellooooo");
                            console.log(create_post_like);
                            var total_count = await post_like.find({ post_id: req.body.post_id }).countDocuments();
                            res.status(200).send({
                                status: true, success: "Successfully liked post",
                                response: {
                                    post_like: {
                                        post_id: create_post_like.post_id,
                                        email: create_post_like.email,
                                        like: create_post_like.like,
                                        total_like: `${total_count}`,
                                        timing: create_post_like.timing,
                                        utc_time: create_post_like.utc_time
                                    }
                                }
                            })
                        } else {
                            res.status(200).send({ status: false, error: "Not Created successfully.." })
                        }
                    }
                }
            } else {
                res.status(200).send({ status: false, error: "please like or unlike" })
            }

            // if(req.body.like == '1'){
            //     var delete_like = await post_like.deleteOne({ email: is_user.email, post_id: req.body.post_id }).countDocuments();
            //     var delete_like_media = await post_like_media.deleteOne({ email: is_user.email, media_id: req.body.post_id }).countDocuments();
            //     if (delete_like) {
            //         console.log(delete_like);
            //         var like_count = await post_like.find({ post_id: req.body.post_id }).countDocuments();
            //         res.status(200).send({ status: true, success: "Successfully unliked post", response: { total_like: `${like_count}` } })
            //     }else if(delete_like_media){
            //         console.log(delete_like);
            //         var like_count = await post_like_media.find({ media_id: req.body.post_id }).countDocuments();
            //         res.status(200).send({ status: true, success: "Successfully unliked media", response: { total_like: `${like_count}` } })
            //     }
            // }else if (req.body.like == '0') {
            //     var check_like_media = await post_like_media.findOne({ media_id: req.body.post_id,  email: is_user.email });
            //     var check_like = await post_like.findOne({ post_id: req.body.post_id, email: is_user.email });
            //     if(check_like_media){
            //         var check_like_count = await post_like_media.find({ media_id: req.body.post_id }).countDocuments();
            //         res.status(200).send({ status: false, error: "Already liked media", response: { total_like: `${check_like_count}` } })
            //     }else if(check_like){
            //         var check_like_count = await post_like.find({ post_id: req.body.post_id }).countDocuments();
            //         res.status(200).send({ status: false, error: "Already liked post", response: { total_like: `${check_like_count}` } })
            //     }else{

            //     }
            // }else {
            //     res.status(200).send({ status: false, error: "please like or unlike" })
            // }
        }
    },
    post_comment: async function (req, res) {
        var moment = require('moment-timezone');
        var today = new Date();
        var m_today = moment(today);
        var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
        var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
        var is_user = await user.findOne({ auth_token: req.body.auth_token });
        if (is_user) {
            if (req.body.comment) {
                console.log("create_create........................");
                if (req.body.type === 'image') {
                    console.log(req.body.comment);
                    var check_comment_image = await post_comment_image.findOne({ image_id: req.body.post_id, email: is_user.email });
                    // if (check_comment_image) {
                    //     var check_like_count = await post_like_image.find({ image_id: req.body.post_id }).countDocuments();
                    //     res.status(200).send({ status: false, error: "Already liked image", response: { total_like: check_like_count } })
                    // } else {

                    var create_post_comment = await post_comment_image.create({
                        image: req.body.post_name,
                        image_id: req.body.post_id,
                        email: is_user.email,
                        username: is_user.username,
                        comment: req.body.comment,
                        timing: indian_time,
                        utc_time: utc_time,
                        type: req.body.type
                    })
                    console.log(create_post_comment);
                    if (create_post_comment) {
                        console.log("hellooooo");
                        console.log(create_post_comment);
                        var total_count = await post_comment_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
                        res.status(200).send({
                            status: true, success: "Successfully liked image",
                            response: {
                                post_comment: {
                                    image: create_post_comment.image,
                                    image_id: create_post_comment.image_id,
                                    email: create_post_comment.email,
                                    comment: create_post_comment.comment,
                                    total_comment: total_count,
                                    timing: create_post_comment.timing,
                                    utc_time: create_post_comment.utc_time

                                }
                            }
                        })
                    } else {
                        res.status(200).send({ status: false, error: "Not Created successfully.." })
                    }
                    // }
                } else if (req.body.type === 'video') {
                    console.log(req.body.comment);
                    var check_comment_video = await post_comment_video.findOne({ video_id: req.body.post_id, email: is_user.email });
                    // if (check_comment_video) {
                    //     var check_like_count = await post_like_video.find({ video_id: req.body.post_id }).countDocuments();
                    //     res.status(200).send({ status: false, error: "Already liked video", response: { total_like: check_like_count } })
                    // } else {

                    var create_post_comment = await post_comment_video.create({
                        video: req.body.post_name,
                        video_id: req.body.post_id,
                        email: is_user.email,
                        username: is_user.username,
                        comment: req.body.comment,
                        timing: indian_time,
                        utc_time: utc_time,
                        type: req.body.type
                    })
                    console.log(create_post_comment);
                    if (create_post_comment) {
                        console.log("hellooooo");
                        console.log(create_post_comment);
                        var total_count = await post_comment_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
                        res.status(200).send({
                            status: true, success: "Successfully liked video",
                            response: {
                                post_comment: {
                                    video: create_post_comment.video,
                                    video_id: create_post_comment.video_id,
                                    email: create_post_comment.email,
                                    comment: create_post_comment.comment,
                                    total_comment: total_count,
                                    timing: create_post_comment.timing,
                                    utc_time: create_post_comment.utc_time
                                }
                            }
                        })
                    } else {
                        res.status(200).send({ status: false, error: "Not Created successfully.." })
                    }
                    // }
                } else {
                    res.status(200).send({ status: false, error: "type doesn't match" })
                }
            }
            else {
                console.log("delete like over here");
                console.log(req.body.comment, is_user.email, req.body.post_id, req.body.type);
                if (req.body.type === 'image') {
                    var delete_image = await post_comment_image.deleteOne({ email: is_user.email, image_id: req.body.post_id, image: req.body.post_name });
                    if (delete_image) {
                        console.log(delete_image);
                        var comment_count = await post_comment_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
                        res.status(200).send({ status: true, success: "Successfully uncomment image", response: { total_comment: comment_count } })
                    }
                }
                else if (req.body.type === 'video') {
                    var delete_video = await post_comment_video.deleteOne({ email: is_user.email, video_id: req.body.post_id, video: req.body.post_name });
                    if (delete_video) {
                        console.log(delete_video);
                        var comment_count = await post_comment_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
                        res.status(200).send({ status: true, success: "Successfully uncomment video", response: { total_comment: comment_count } })
                    }
                }
                else {
                    res.status(200).send({ status: false, error: "type doesn't match" })
                }
            }
        } else {
            res.status(200).send({ status: false, error: "No Such auth_token" });
        }
    },

    /// post_comment_2

    post_comment_2: async function (req, res) {
        var moment = require('moment-timezone');
        var today = new Date();
        var m_today = moment(today);
        var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
        var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
        var is_user = await user.findOne({ auth_token: req.body.auth_token });

        var mimetype = req.body.post_name;
        console.log(mimetype);
        // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});
        console.log(mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length));
        var post_name = mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length);

        if (is_user) {

            if (req.body.comment) {
                if (post_name) {
                    console.log(req.body.comment);
                    var create_post_comment = await post_comment_media.create({
                        media: post_name,
                        media_id: req.body.post_id,
                        email: is_user.email,
                        username: is_user.username,
                        comment: req.body.comment,
                        timing: indian_time,
                        utc_time: utc_time,
                        type: req.body.type
                    });

                    console.log(create_post_comment.email);
                    if (create_post_comment) {
                        console.log("hellooooo");
                        console.log(create_post_comment.username);
                        var total_count = await post_comment_media.find({ media_id: req.body.post_id, media: post_name }).countDocuments();
                        res.status(200).send({
                            status: true, success: "Successfully commented " + req.body.type,
                            response: {
                                post_comment_media: {
                                    media: create_post_comment.media,
                                    media_id: create_post_comment.media_id,
                                    email: create_post_comment.email,
                                    comment: create_post_comment.comment,
                                    total_comment: `${total_count}`,
                                    timing: create_post_comment.timing,
                                    utc_time: create_post_comment.utc_time

                                }
                            }
                        })
                    } else {
                        res.status(200).send({ status: false, error: "Not Created successfully.." })
                    }
                } else {
                    console.log(req.body.comment);
                    var create_post_comment = await post_comment.create({

                        post_id: req.body.post_id,
                        email: is_user.email,
                        username: is_user.username,
                        comment: req.body.comment,
                        timing: indian_time,
                        utc_time: utc_time,
                        type: req.body.type
                    });

                    console.log(create_post_comment.email);
                    if (create_post_comment) {
                        console.log("hellooooo");
                        console.log(create_post_comment);
                        var total_count = await post_comment.find({ post_id: req.body.post_id }).countDocuments();
                        res.status(200).send({
                            status: true, success: "Successfully commented post",
                            response: {
                                post_comment: {
                                    post_id: create_post_comment.post_id,
                                    email: create_post_comment.email,
                                    comment: create_post_comment.comment,
                                    total_comment: `${total_count}`,
                                    timing: create_post_comment.timing,
                                    utc_time: create_post_comment.utc_time
                                }
                            }
                        })
                    } else {
                        res.status(200).send({ status: false, error: "Not commented successfully.." })
                    }
                }
            }
            else {

                res.status(200).send({ status: false, error: "Please enter comment" });
                // console.log("delete working...")
                // if(req.body.post_name){
                //     var delete_comment = await post_comment_media.deleteOne({ email: is_user.email, media_id: req.body.post_id, media: req.body.post_name });
                //     if (delete_comment) {
                //         console.log(delete_comment);
                //         var comment_count = await post_comment_media.find({ media_id: req.body.post_id, media: req.body.post_name }).countDocuments();
                //         res.status(200).send({ status: true, success: "Successfully deleted comment", response: { total_comment: comment_count } })
                //     }
                // }else{
                //     var delete_comment = await post_comment.deleteOne({ email: is_user.email, post_id: req.body.post_id });
                //     if (delete_comment) {
                //         console.log(delete_comment);
                //         var comment_count = await post_comment.find({ post_id: req.body.post_id }).countDocuments();
                //         res.status(200).send({ status: true, success: "Successfully deleted comment", response: { total_comment: comment_count } })
                //     }
                // }
            }
        }
    },

    delete_post_comment: async function (req, res) {
        var delete_post_comment = await post_comment.deleteOne({ _id: req.body._id });
        var delete_post_comment_media = await post_comment_media.deleteOne({ _id: req.body._id });


        console.log("delete_post_comment" + JSON.stringify(delete_post_comment));
        console.log("delete_post_comment_media" + delete_post_comment_media);
        if (delete_post_comment) {
            res.status(200).send({ status: true, success: 'Successfully deleted  comment' })
        } else if (delete_post_comment_media) {
            res.status(200).send({ status: true, success: 'Successfully deleted  comment' })
        } else {
            res.status(200).send({ status: false, error: "Kuchh bhi delete nahi hua" });
        }
    },

    get_all_post: async function (req, res) {
        var all_images = await post_images.find({}, { __v: 0, email: 0 });
        var all_videos = await post_videos.find({}, { __v: 0, email: 0 });
        console.log(all_images.length);
        var big_length = (all_images.length > all_videos.length) ? all_images.length : all_videos.length;
        console.log(big_length);
        var post_data = [];
        for (var i = 0; i < big_length; i++) {
            if (all_images[i]) {
                for (var j = 0; j < all_images[i].images.length; j++) {
                    // post_data.push(
                    //     {
                    //         images: all_images[i] ? all_images[i].images:'',
                    //         image_id: all_images[i] ? all_images[i]._id : '',
                    //         image_username: all_images[i] ? all_images[i].username : '',
                    //         image_profile_image:all_images[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_images[i].profile_image : '',
                    //         image_description:all_images[i] ? all_images[i].description : '',
                    //         image_location:all_images[i] ? all_images[i].location : '',
                    //         image_post_timing:all_images[i] ? all_images[i].post_timing : '',
                    //         image_post_utc_time:all_images[i] ? all_images[i].post_utc_time : '',
                    //         image_type : all_images[i] ? all_images[i].type : '',

                    //     // comment_count: comment_count,
                    //     // like_count: like_count
                    //     // post_like: like_data[0] ? 1 : 0

                    //         videos: all_videos[i] ? all_videos[i].videos : '',
                    //         video_id: all_videos[i] ? all_videos[i]._id : '',
                    //         video_username: all_videos[i] ? all_videos[i].username : '',
                    //         video_profile_image: all_videos[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_videos[i].profile_image : '',
                    //         video_description: all_videos[i] ? all_videos[i].description : '',
                    //         video_location: all_videos[i] ? all_videos[i].location : '',
                    //         video_post_timing: all_videos[i] ? all_videos[i].post_timing : '',
                    //         video_post_utc_time: all_videos[i] ? all_videos[i].post_utc_time : '',
                    //     }
                    // );
                }
            }

            if (all_images[i]) {
                for (var j = 0; j < all_images[i].images.length; j++) {
                    post_data.push({
                        images: all_images[i].images ? all_images[i].images[j] : '',
                        _id: all_images[i] ? all_images[i]._id : '',
                        username: all_images[i] ? all_images[i].username : '',
                        profile_image: all_images[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_images[i].profile_image : '',
                        description: all_images[i] ? all_images[i].description : '',
                        location: all_images[i] ? all_images[i].location : '',
                        post_timing: all_images[i] ? all_images[i].post_timing : '',
                        post_utc_time: all_images[i] ? all_images[i].post_utc_time : '',
                        type: all_images[i] ? all_images[i].type : '',
                    })
                }
            }

        }
        console.log(post_data.length)
        res.status(200).send({ status: true, response: { post: post_data.reverse() } })

    },

    // post the images and videos
    post_media: async function (req, res) {
        upload(req, res, async function (error, upload) {
            if (error) {
                res.status(200).send({ status: false, error: error })
            } else {
                console.log(req.body.description, req.body.location, req.body.email, req.body.auth_token);
                console.log(req.files.media);
                if (req.files.media) {
                    const file = req.files.media;
                    var type = [];
                    var file_name = [];
                    var post_type;
                    for (var i = 0; i < file.length; i++) {
                        console.log(file[i].key);
                        var mimetype = file[i].mimetype;
                        console.log(mimetype);
                        // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});

                        var filter = mimetype.substr(0, mimetype.lastIndexOf('/'));
                        type.push(filter);
                        file_name.push({ name: file[i].key, type: filter });
                        // type.push(file[i].mimetype);
                    };
                    var counter = 0;
                    var counter2 = 0;
                    for (var j = 0; j < type.length; j++) {
                        if (type[j] == 'image') {
                            counter++;
                            if (counter == type.length) {
                                post_type = 'image'
                            } else {
                                post_type = 'mixed'
                            }
                        } else if (type[j] == 'video') {
                            counter2++;
                            if (counter2 == type.length) {
                                post_type = 'video'
                            } else {
                                post_type = 'mixed'
                            }
                        } else {

                        }
                    };
                    console.log("post_type : " + post_type);
                    var is_user = await user.findOne({ auth_token: req.body.auth_token });
                    var moment = require('moment-timezone');
                    var today = new Date();
                    var m_today = moment(today);
                    var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
                    var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
                    if (is_user) {
                        var posting = await post_media.create({
                            media: file_name,
                            email: is_user.email,
                            username: is_user.username,
                            profile_image: is_user.profile_image,
                            description: req.body.description,
                            location: req.body.location,
                            post_timing: indian_time,
                            post_utc_time: utc_time,
                            type: post_type
                        });
                        if (posting) {

                            var file_name_all = [];
                            for (var m = 0; m < file_name.length; m++) {
                                file_name_all.push({ media_id: posting.media[m]._id, media: 'https://videogallery.nyc3.digitaloceanspaces.com/' + file_name[m].name, media_type: file_name[m].type, like: "0", total_like: "0", media_like_details: [], total_comment: "0", comment: "0", media_comment_details: [] })
                            }
                            res.status(200).send({
                                status: true, success: "Successfully Uploaded", response: {
                                    post_media: {
                                        _id: posting._id,
                                        username: is_user.username,
                                        profile_image: 'https://videogallery.nyc3.digitaloceanspaces.com/' + is_user.profile_image,
                                        // profile_image : 'https://videogallery.nyc3.digitaloceanspaces.com/nature-24.jpg',
                                        description: posting.description,
                                        location: posting.location,
                                        post_timing: posting.post_timing,
                                        post_utc_time: posting.post_utc_time,
                                        type: posting.type,
                                        total_post_like: "0",
                                        total_post_comment: "0",
                                        post_like: "0",
                                        post_comment: "0",
                                        media: file_name_all,
                                    }

                                }
                            })
                        } else {
                            res.status(200).send({ status: false, error: "Not posted successfully" })
                        }
                    } else {
                        res.status(200).send({ status: false, error: "Auth Token doesn't matched..." });
                    }
                } else {
                    res.status(200).send({
                        status: false,
                        error: "No files uploaded"
                    })
                }
            }
        })

    },

    // get All the post before login
    get_all_media: async function (req, res) {
        var all_media = await post_media.find({}, { __v: 0, email: 0 });

        var post_data = [];


        for (var i = 0; i < all_media.length; i++) {

            // console.log(all_media[i].ima);
            if (all_media[i]) {
                var test_data = [];
                var total_post_like = 0;
                var total_post_comment = 0;
                for (var j = 0; j < all_media[i].media.length; j++) {

                    var image_like = await post_like_image.find({ image: all_media[i].media[j] }).countDocuments();
                    var video_like = await post_like_video.find({ video: all_media[i].media[j] }).countDocuments();
                    var image_comment = await post_comment_image.find({ image: all_media[i].media[j] });
                    var video_comment = await post_comment_video.find({ video: all_media[i].media[j] });
                    var i_specific_comment = await post_comment_image.find({ image_id: all_media[i]._id, image: all_media[i].media[j] }, { _id: 0, __v: 0, image: 0, image_id: 0, timing: 0, utc_time: 0, type: 0 });
                    var v_specific_comment = await post_comment_video.find({ video_id: all_media[i]._id, video: all_media[i].media[j] }, { _id: 0, __v: 0, video: 0, video_id: 0, timing: 0, utc_time: 0, type: 0 })
                    // console.log(i_specific_comment);
                    // console.log(image_comment);
                    var i_comment = [];
                    for (var k = 0; k < i_specific_comment.length; k++) {
                        console.log(i_specific_comment[k])
                        i_comment.push({ comment: i_specific_comment[k].comment, username: i_specific_comment[k].username });
                    }
                    var v_comment = [];
                    for (var l = 0; l < v_specific_comment.length; l++) {
                        // console.log(v_specific_comment);
                        v_comment.push({ comment: v_specific_comment[l].comment, username: v_specific_comment[l].username });
                    }
                    if (image_like) {
                        total_post_like = total_post_like + image_like;
                    }
                    if (video_like) {
                        total_post_like = total_post_like + video_like;
                    }

                    if (image_comment) {
                        total_post_comment = total_post_comment + image_comment.length;
                    }
                    if (video_comment) {
                        total_post_comment = total_post_comment + video_comment.length;
                    }

                    test_data.push({
                        media: all_media[i].media ? "https://videogallery.nyc3.digitaloceanspaces.com/" + all_media[i].media[j] : '',
                        like: 0,
                        total_like: (all_media[i].type === 'image') ? image_like : video_like,
                        total_comment: (all_media[i].type === 'image') ? image_comment.length : video_comment.length,
                        comment: (all_media[i].type === 'image') ? i_comment : v_comment
                    });

                }
                // console.log(all_media[i]);
                post_data.push({
                    _id: all_media[i] ? all_media[i]._id : '',
                    username: all_media[i] ? all_media[i].username : '',
                    profile_image: all_media[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_media[i].profile_image : '',
                    description: all_media[i] ? all_media[i].description : '',
                    location: all_media[i] ? all_media[i].location : '',
                    post_timing: all_media[i] ? all_media[i].post_timing : '',
                    post_utc_time: all_media[i] ? all_media[i].post_utc_time : '',
                    type: all_media[i] ? all_media[i].type : '',
                    total_post_like: '1',
                    total_post_comment: '1',
                    post_like: total_post_like,
                    post_comment: total_post_comment,
                    media: test_data.reverse()
                    // v_comment : (all_media[i].type === 'video') ? v_comment : ''
                });
            }
        }
        res.status(200).send({ status: true, success: "Successfully get all Post", response: { all_post_media: post_data.reverse() } })
    },
    //////// get_all_media

    get_all_media_2: async function (req, res) {

        var all_media = await post_media.find({}, { __v: 0, email: 0 });

        var post_data = [];

        for (var i = 0; i < all_media.length; i++) {

            if (all_media[i]) {
                var test_data = [];

                var total_post_comment = 0;
                for (var j = 0; j < all_media[i].media.length; j++) {

                    var media_like = await post_like_media.find({ media: all_media[i].media[j].name });
                    var media_comment = await post_comment_media.find({ media: all_media[i].media[j].name });
                    console.log(media_comment);
                    var post_like_count = await post_like.find({ post_id: all_media[i]._id });
                    var post_comment_count = await post_comment.find({ post_id: all_media[i]._id });

                    // var is_user_like_post = await post_like.find({post_id: all_media[i]._id, email : is_user.email}).countDocuments();
                    // var is_user_comment_post = await post_comment.find({post_id: all_media[i]._id, email : is_user.email}).countDocuments();


                    // var like = await post_like_media.find({ media: all_media[i].media[j], email: is_user.email }).countDocuments();
                    // var comment = await post_comment_media.find({ media: all_media[i].media[j], email: is_user.email }).countDocuments();

                    var post_like_username = [];
                    for (var k = 0; k < post_like_count.length; k++) {
                        // console.log(post_like_count[k].username);
                        post_like_username.push({ email: post_like_count[k].email, username: post_like_count[k].username, post_like: post_like_count[k].like, time: post_like_count[k].timing });
                    }
                    var post_comment_username = [];
                    for (var k = 0; k < post_comment_count.length; k++) {
                        // console.log(post_like_count[k].username);
                        post_comment_username.push({ email: post_comment_count[k].email, username: post_comment_count[k].username, post_comment: post_comment_count[k].comment, time: post_comment_count[k].timing });
                    }


                    var media_like_username = [];
                    for (var l = 0; l < media_like.length; l++) {
                        // console.log(media_like[l].username);
                        media_like_username.push({ email: media_like[l].email, username: media_like[l].username, like: media_like[l].like, time: media_like[l].timing });
                    }

                    var media_comment_username = [];
                    for (var m = 0; m < media_comment.length; m++) {
                        // console.log(media_like[l].username);
                        media_comment_username.push({ email: media_comment[m].email, username: media_comment[m].username, comment: media_comment[m].comment, time: media_comment[m].timing });
                    }
                    test_data.push({
                        media_id: all_media[i].media ? all_media[i].media[j]._id : '',
                        media: all_media[i].media ? "https://videogallery.nyc3.digitaloceanspaces.com/" + all_media[i].media[j].name : '',
                        media_type: all_media[i].media ? all_media[i].media[j].type : '',
                        like: "0",
                        total_like: media_like.length > 0 ? `${media_like.length}` : "0",
                        media_like_details: media_like_username ? media_like_username : "0",
                        comment: "0",
                        total_comment: media_comment.length > 0 ? `${media_comment.length}` : "0",
                        media_comment_details: media_comment_username ? media_comment_username : "0"
                        // total_comment: (all_media[i].type === 'image') ? image_comment.length : video_comment.length,
                        // comment: (all_media[i].type === 'image') ? i_comment : v_comment
                    });
                }
                post_data.push({
                    _id: all_media[i] ? all_media[i]._id : '',
                    username: all_media[i] ? all_media[i].username : '',
                    profile_image: all_media[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_media[i].profile_image : '',
                    description: all_media[i] ? all_media[i].description : '',
                    location: all_media[i] ? all_media[i].location : '',
                    post_timing: all_media[i] ? all_media[i].post_timing : '',
                    post_utc_time: all_media[i] ? all_media[i].post_utc_time : '',
                    type: all_media[i] ? all_media[i].type : '',
                    total_post_like: post_like_count.length ? `${post_like_count.length}` : '0',
                    post_like: "0",
                    post_like_details: post_like_username ? post_like_username : '',
                    total_post_comment: post_comment_count.length ? `${post_comment_count.length}` : '0',
                    post_comment_details: post_comment_username ? post_comment_username : '',
                    // post_comment : total_post_comment,
                    media: test_data
                })
            }
        }
        res.status(200).send({ status: true, success: "Successfully get all Post", response: { all_post_media: post_data.reverse() } })

    },
    // get All the post after the login
    get_all_media_after_login: async function (req, res) {
        var is_user = await user.findOne({ auth_token: req.body.auth_token });
        if (is_user) {
            var all_media = await post_media.find({}, { __v: 0, email: 0 });

            var post_data = [];

            for (var i = 0; i < all_media.length; i++) {

                // console.log(all_media[i].ima);
                if (all_media[i]) {
                    var test_data = [];
                    var total_post_like = 0;
                    var total_post_comment = 0;
                    for (var j = 0; j < all_media[i].media.length; j++) {
                        var image_like = await post_like_image.find({ image: all_media[i].media[j] }).countDocuments();
                        var video_like = await post_like_video.find({ video: all_media[i].media[j] }).countDocuments();
                        var image_comment = await post_comment_image.find({ image: all_media[i].media[j] });
                        var video_comment = await post_comment_video.find({ video: all_media[i].media[j] });
                        var i_specific_comment = await post_comment_image.find({ image_id: all_media[i]._id, image: all_media[i].media[j] }, { _id: 0, __v: 0, image: 0, image_id: 0, email: 0, timing: 0, utc_time: 0, type: 0 });
                        var v_specific_comment = await post_comment_video.find({ video_id: all_media[i]._id, video: all_media[i].media[j] }, { _id: 0, __v: 0, video: 0, video_id: 0, email: 0, timing: 0, utc_time: 0, type: 0 })
                        var i_like = await post_like_image.find({ image: all_media[i].media[j], email: is_user.email }).countDocuments();
                        var v_like = await post_like_video.find({ video: all_media[i].media[j], email: is_user.email }).countDocuments();
                        // console.log(i_specific_comment);
                        var i_comment = [];
                        for (var k = 0; k < i_specific_comment.length; k++) {
                            i_comment.push(i_specific_comment[k].comment);
                        }
                        var v_comment = [];
                        for (var l = 0; l < v_specific_comment.length; l++) {
                            console.log(v_specific_comment);
                            v_comment.push(v_specific_comment[l].comment);
                        }
                        console.log("comment :- " + image_like)
                        if (image_like) {
                            total_post_like = total_post_like + image_like;
                        }
                        if (video_like) {
                            total_post_like = total_post_like + video_like;
                        }

                        if (image_comment) {
                            total_post_comment = total_post_comment + image_comment.length;
                        }
                        if (video_comment) {
                            total_post_comment = total_post_comment + video_comment.length;
                        }

                        test_data.push({
                            media: all_media[i].media ? "https://videogallery.nyc3.digitaloceanspaces.com/" + all_media[i].media[j] : '',
                            like: (all_media[i].type === 'image') ? i_like : v_like,
                            total_like: (all_media[i].type === 'image') ? image_like : video_like,
                            total_comment: (all_media[i].type === 'image') ? image_comment.length : video_comment.length,
                            comment: (all_media[i].type === 'image') ? i_comment : v_comment
                        });
                    }
                    post_data.push({
                        _id: all_media[i] ? all_media[i]._id : '',
                        username: all_media[i] ? all_media[i].username : '',
                        profile_image: all_media[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_media[i].profile_image : '',
                        description: all_media[i] ? all_media[i].description : '',
                        location: all_media[i] ? all_media[i].location : '',
                        post_timing: all_media[i] ? all_media[i].post_timing : '',
                        post_utc_time: all_media[i] ? all_media[i].post_utc_time : '',
                        type: all_media[i] ? all_media[i].type : '',
                        post_like: total_post_like,
                        post_comment: total_post_comment,
                        media: test_data.reverse()
                    })
                }
            }
            res.status(200).send({ status: true, success: "Successfully get all Post", response: { all_post_media: post_data.reverse() } })
        } else {
            res.status(200).send({ status: false, error: "No such authenticated user" })
        }
    },

    ////// get_all_media_after_login_2

    get_all_media_after_login_2: async function (req, res) {
        var is_user = await user.findOne({ auth_token: req.body.auth_token });
        if (is_user) {
            var all_media = await post_media.find({}, { __v: 0, email: 0 });

            var post_data = [];

            for (var i = 0; i < all_media.length; i++) {

                if (all_media[i]) {
                    var test_data = [];

                    var total_post_comment = 0;
                    for (var j = 0; j < all_media[i].media.length; j++) {

                        var media_like = await post_like_media.find({ media: all_media[i].media[j].name });
                        var media_comment = await post_comment_media.find({ media: all_media[i].media[j].name });
                        console.log(media_comment);
                        var post_like_count = await post_like.find({ post_id: all_media[i]._id });
                        var post_comment_count = await post_comment.find({ post_id: all_media[i]._id });

                        var is_user_like_post = await post_like.find({ post_id: all_media[i]._id, email: is_user.email }).countDocuments();
                        var is_user_comment_post = await post_comment.find({ post_id: all_media[i]._id, email: is_user.email }).countDocuments();


                        var like = await post_like_media.find({ media: all_media[i].media[j].name, email: is_user.email }).countDocuments();
                        var comment = await post_comment_media.find({ media: all_media[i].media[j].name, email: is_user.email }).countDocuments();

                        var post_like_username = [];
                        for (var k = 0; k < post_like_count.length; k++) {
                            // console.log(post_like_count[k].username);
                            post_like_username.push({ email: post_like_count[k].email, username: post_like_count[k].username, post_like: post_like_count[k].like, time: post_like_count[k].timing });
                        }
                        var post_comment_username = [];
                        for (var k = 0; k < post_comment_count.length; k++) {
                            // console.log(post_like_count[k].username);
                            post_comment_username.push({ email: post_comment_count[k].email, username: post_comment_count[k].username, post_comment: post_comment_count[k].comment, time: post_comment_count[k].timing });
                        }


                        var media_like_username = [];
                        for (var l = 0; l < media_like.length; l++) {
                            // console.log(media_like[l].username);
                            media_like_username.push({ email: media_like[l].email, username: media_like[l].username, like: media_like[l].like, time: media_like[l].timing });
                        }

                        var media_comment_username = [];
                        for (var m = 0; m < media_comment.length; m++) {
                            // console.log(media_like[l].username);
                            media_comment_username.push({ email: media_comment[m].email, username: media_comment[m].username, comment: media_comment[m].comment, time: media_comment[m].timing });
                        }
                        test_data.push({
                            media_id: all_media[i].media ? all_media[i].media[j]._id : '',
                            media: all_media[i].media ? "https://videogallery.nyc3.digitaloceanspaces.com/" + all_media[i].media[j].name : '',
                            media_type: all_media[i].media ? all_media[i].media[j].type : '',
                            like: like ? `${like}` : '0',
                            total_like: media_like ? `${media_like.length}` : "0",
                            media_like_details: media_like_username ? media_like_username : "0",
                            comment: comment ? `${comment}` : '',
                            total_comment: media_comment ? `${media_comment.length}` : "0",
                            media_comment_details: media_comment_username ? media_comment_username : "0"
                            // total_comment: (all_media[i].type === 'image') ? image_comment.length : video_comment.length,
                            // comment: (all_media[i].type === 'image') ? i_comment : v_comment
                        });
                    }
                    post_data.push({
                        _id: all_media[i] ? all_media[i]._id : '',
                        username: all_media[i] ? all_media[i].username : '',
                        profile_image: all_media[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_media[i].profile_image : '',
                        description: all_media[i] ? all_media[i].description : '',
                        location: all_media[i] ? all_media[i].location : '',
                        post_timing: all_media[i] ? all_media[i].post_timing : '',
                        post_utc_time: all_media[i] ? all_media[i].post_utc_time : '',
                        type: all_media[i] ? all_media[i].type : '',
                        total_post_like: post_like_count.length ? `${post_like_count.length}` : '0',
                        post_like: is_user_like_post ? `${is_user_like_post}` : "0",
                        post_like_details: post_like_username ? post_like_username : '',
                        total_post_comment: post_comment_count.length ? `${post_comment_count.length}` : '0',
                        post_comment_details: post_comment_username ? post_comment_username : '',
                        // post_comment : total_post_comment,
                        media: test_data ? test_data : []
                    })
                }
            }
            res.status(200).send({ status: true, success: "Successfully get all Post", response: { all_post_media: post_data.reverse() } })
        } else {
            res.status(200).send({ status: false, error: "No such authenticated user" })
        }
    },

    // get the details of users who are like the perticular images or video
    get_post_like_detail: async function (req, res) {
        var auth_token = req.body.auth_token;
        var is_user = await user.findOne({ auth_token: auth_token });
        if (is_user) {
            console.log(req.body.post_id);
            var image_like = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name });
            var video_like = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name });
            var image_like_count = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
            var video_like_count = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
            console.log(image_like);
            console.log(video_like);
            if (image_like.length > 0) {
                var i_email = [];
                for (var i = 0; i < image_like.length; i++) {
                    console.log(image_like[i].email);
                    i_email.push(image_like[i].email);
                }
                var users = await user.find({ email: { $in: i_email } });

                var user_details = [];
                for (var j = 0; j < users.length; j++) {
                    // console.log(users[j])
                    user_details.push({
                        user_id: users[j]._id ? users[j]._id : '',
                        name: users[j].name ? users[j].name : '',
                        profile_image: users[j] ? users[j].profile_image : '',
                        total_like: image_like_count
                    });
                }
                res.status(200).send({
                    status: true, success: "Successfully get Details",
                    response: { like_details: user_details }
                })

            } else if (video_like.length > 0) {
                var i_email = [];
                for (var i = 0; i < video_like.length; i++) {
                    console.log(video_like[i].email);
                    i_email.push(video_like[i].email);
                }
                var users = await user.find({ email: { $in: i_email } });
                //   console.log(users);
                var user_details = [];
                for (var j = 0; j < users.length; j++) {
                    // console.log(users[j])
                    user_details.push({
                        user_id: users[j]._id ? users[j]._id : '',
                        name: users[j].name ? users[j].name : '',
                        profile_image: users[j] ? users[j].profile_image : '',
                        total_like: video_like_count
                    });
                }
                res.status(200).send({
                    status: true, success: "Successfully get Details",
                    response: { like_details: user_details }
                })
            } else {
                res.status(200).send({ status: false, error: "niether image nor video" });
            }

        } else {
            res.status(200).send({ status: false, error: "Authtoken invalid" });
        }
    },

    /// get_post_like_detail_2
    get_post_like_detail_2: async function (req, res) {
        var auth_token = req.body.auth_token;
        var is_user = await user.findOne({ auth_token: auth_token });
        if (is_user) {
            // console.log(req.body.post_id);
            // var image_like = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name });
            // var video_like = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name });
            // var image_like_count = await post_like_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
            // var video_like_count = await post_like_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
            // console.log(image_like);
            // console.log(video_like);
            // if (image_like.length > 0) {
            //     var i_email = [];
            //     for (var i = 0; i < image_like.length; i++) {
            //         console.log(image_like[i].email);
            //         i_email.push(image_like[i].email);
            //     }
            //     var users = await user.find({ email: { $in: i_email } });

            //     var user_details = [];
            //     for (var j = 0; j < users.length; j++) {
            //         // console.log(users[j])
            //         user_details.push({
            //             user_id: users[j]._id ? users[j]._id : '',
            //             name: users[j].name ? users[j].name : '',
            //             profile_image: users[j] ? users[j].profile_image : '',
            //             total_like: image_like_count
            //         });
            //     }
            //     res.status(200).send({
            //         status: true, success: "Successfully get Details",
            //         response: { like_details: user_details }
            //     })

            // } else if (video_like.length > 0) {
            //     var i_email = [];
            //     for (var i = 0; i < video_like.length; i++) {
            //         console.log(video_like[i].email);
            //         i_email.push(video_like[i].email);
            //     }
            //     var users = await user.find({ email: { $in: i_email } });
            //     //   console.log(users);
            //     var user_details = [];
            //     for (var j = 0; j < users.length; j++) {
            //         // console.log(users[j])
            //         user_details.push({
            //             user_id: users[j]._id ? users[j]._id : '',
            //             name: users[j].name ? users[j].name : '',
            //             profile_image: users[j] ? users[j].profile_image : '',
            //             total_like: video_like_count
            //         });
            //     }
            //     res.status(200).send({
            //         status: true, success: "Successfully get Details",
            //         response: { like_details: user_details }
            //     })
            // } else {
            //     res.status(200).send({ status: false, error: "niether image nor video" });
            // }
            var mimetype = req.body.post_name;
            console.log(mimetype);
            // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});
            console.log(mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length));
            var post_name = mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length);

            var get_media_like = await post_like_media.find({ media_id: req.body.post_id, media: post_name });
            // var get_post_like = await post_like.find({ post_id: req.body.post_id});
            // if(get_post_like.length > 0){
            //     var post_emails = [];
            //         for (var i = 0; i < get_post_like.length; i++) {
            //             console.log(get_post_like[i]);
            //             post_emails.push(get_post_like[i].email);
            //         }
            //         var users = await user.find({ email: { $in: post_emails } });
            //         var post_user_detail = [];
            //     for (var j = 0; j < users.length; j++) {
            //         // console.log(users[j])
            //         post_user_detail.push({
            //             user_id: users[j]._id ? users[j]._id : '',
            //             name: users[j].name ? users[j].name : '',
            //             profile_image: users[j] ? users[j].profile_image : '',
            //             total_like: get_post_like.length
            //         });
            //     }
            // }
            if (get_media_like.length > 0) {
                var emails = [];
                for (var i = 0; i < get_media_like.length; i++) {
                    // console.log(get_media_like[i].email);
                    emails.push(get_media_like[i].email);
                }
                var users = await user.find({ email: { $in: emails } });
                var user_details = [];
                for (var j = 0; j < users.length; j++) {
                    // console.log(users[j])
                    user_details.push({
                        user_id: users[j]._id ? users[j]._id : '',
                        name: users[j].name ? users[j].name : '',
                        profile_image: users[j] ? users[j].profile_image : '',
                        total_like: `${get_media_like.length}`
                    });
                }
            }
            res.status(200).send({
                status: true, success: "Successfully get Details",
                response: { like_details: user_details }
            })
        } else {
            res.status(200).send({ status: false, error: "Authtoken invalid" });
        }
    },


    // get the details of users who are like the perticular images or video
    get_post_comment_detail: async function (req, res) {
        var auth_token = req.body.auth_token;
        var is_user = await user.findOne({ auth_token: auth_token });
        if (is_user) {
            console.log(req.body.post_id);
            var image_comment = await post_comment_image.find({ image_id: req.body.post_id, image: req.body.post_name });
            var video_comment = await post_comment_video.find({ video_id: req.body.post_id, video: req.body.post_name });
            var image_comment_count = await post_comment_image.find({ image_id: req.body.post_id, image: req.body.post_name }).countDocuments();
            var video_comment_count = await post_comment_video.find({ video_id: req.body.post_id, video: req.body.post_name }).countDocuments();
            console.log(image_comment);
            console.log(video_comment);
            if (image_comment.length > 0) {
                var i_email = [];
                for (var i = 0; i < image_comment.length; i++) {
                    console.log(image_comment[i].email);
                    i_email.push(image_comment[i].email);
                }
                var users = await user.find({ email: { $in: i_email } });

                var user_details = [];
                for (var j = 0; j < users.length; j++) {
                    // console.log(users[j])
                    user_details.push({
                        user_id: users[j]._id ? users[j]._id : '',
                        name: users[j].name ? users[j].name : '',
                        profile_image: users[j] ? users[j].profile_image : '',
                        total_comment: image_comment_count
                    });
                }
                res.status(200).send({
                    status: true, success: "Successfully get Details",
                    response: { comment_details: user_details }
                })

            } else if (video_comment.length > 0) {
                var i_email = [];
                for (var i = 0; i < video_comment.length; i++) {
                    console.log(video_comment[i].email);
                    i_email.push(video_comment[i].email);
                }
                var users = await user.find({ email: { $in: i_email } });
                //   console.log(users);
                var user_details = [];
                for (var j = 0; j < users.length; j++) {
                    // console.log(users[j])
                    user_details.push({
                        user_id: users[j]._id ? users[j]._id : '',
                        name: users[j].name ? users[j].name : '',
                        profile_image: users[j] ? users[j].profile_image : '',
                        total_comment: video_comment_count
                    });
                }
                res.status(200).send({
                    status: true, success: "Successfully get Details",
                    response: { comment_details: user_details }
                })
            } else {
                res.status(200).send({ status: false, error: "niether image nor video" });
            }

        } else {
            res.status(200).send({ status: false, error: "Authtoken invalid" });
        }
    },
    /// get_post_comment_detail

    get_post_comment_detail_2: async function (req, res) {
        var auth_token = req.body.auth_token;
        var is_user = await user.findOne({ auth_token: auth_token });
        if (is_user) {

            var mimetype = req.body.post_name;
            console.log(mimetype);
            // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});
            console.log(mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length));
            var post_name = mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length);


            var get_media_comment = await post_comment_media.find({ media_id: req.body.post_id, media: post_name });
            if (get_media_comment.length > 0) {
                var emails = [];
                for (var i = 0; i < get_media_comment.length; i++) {
                    // console.log(get_media_comment[i].comment);
                    // console.log(get_media_comment[i].email);
                    emails.push(get_media_comment[i].email);
                }
                var users = await user.find({ email: { $in: emails } });

                var user_details = [];
                for (var j = 0; j < users.length; j++) {
                    console.log(users[j].email);
                    var user_commented = await post_comment_media.find({ media_id: req.body.post_id, media: post_name, email: users[j].email });
                    console.log(user_commented.length)
                    var comments = [];
                    for (var k = 0; k < user_commented.length; k++) {
                        comments.push({ comment: user_commented[k].comment, time: user_commented[k].timing });
                    }
                    user_details.push({
                        user_id: users[j]._id ? users[j]._id : '',
                        name: users[j].name ? users[j].name : '',
                        profile_image: users[j] ? users[j].profile_image : '',
                        total_comment: get_media_comment.length ? `${get_media_comment.length}` : "0",
                        user_commented: comments ? comments : ''
                    });
                }
            }
            res.status(200).send({
                status: true, success: "Successfully get Details",
                response: { comment_details: user_details }
            })
        } else {
            res.status(200).send({ status: false, error: "Authtoken invalid" });
        }
    },

    /// get_post_details
    get_post_details: async function (req, res) {
        var is_user = await user.findOne({ auth_token: req.body.auth_token });
        // console.log(is_user);
        if (is_user) {

            var mimetype = req.body.post_name;
            console.log(mimetype);
            // file_name.push({media :'https://videogallery.nyc3.digitaloceanspaces.com/'+ file[i].key, like : 0, total_like : 0, total_comment : 0, comment : []});
            console.log(mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length));
            var post_name = mimetype.substring(mimetype.indexOf('es.com/') + 7, mimetype.length);


            var like = await post_like_media.find({ media: post_name, email: is_user.email }).countDocuments();
            var comment = await post_comment_media.find({ media: post_name, email: is_user.email }).countDocuments();
            var post_details = await post_media.findOne({ _id: req.body.post_id });
            var post_media_details = await post_media.findOne({ _id: req.body.post_id, media: { $elemMatch: { name: post_name } } });
            var media_like_details = await post_like_media.find({ media_id: req.body.post_id, media: { $regex: post_name } });
            var media_comment_details = await post_comment_media.find({ media_id: req.body.post_id, media: { $regex: post_name } });
            var user_details = await user.findOne({ email: post_details ? post_details.email : '' });
            if (post_media_details) {
                // console.log(media_like_details);
                // add like details into array
                var like_array = [];
                for (var i = 0; i < media_like_details.length; i++) {
                    like_array.push({ email: media_like_details[i].email, username: media_like_details[i].username, like: media_like_details[i].like, time: media_like_details[i].timing });
                }
                // add comment details into array
                var comment_array = [];
                for (var j = 0; j < media_comment_details.length; j++) {
                    comment_array.push({ email: media_comment_details[j].email, username: media_comment_details[j].username, comment: media_comment_details[j].comment, time: media_comment_details[j].timing })
                }

                /// main array where all details
                var main = [];
                console.log(post_media_details.media);
                for (var i = 0; i < post_media_details.media.length; i++) {
                    main.push({
                        media_id: post_media_details.media[i]._id,
                        media: "https://videogallery.nyc3.digitaloceanspaces.com/" + post_media_details.media[i].name,
                        media_type: post_media_details.media[i].type,
                        like: `${like}`,
                        total_like: `${like_array.length}`,
                        media_like_details: like_array,
                        comment: `${comment}`,
                        total_comment: `${comment_array.length}`,
                        media_comment_details: comment_array
                    })
                }
                console.log(main)

                res.status(200).send({
                    status: true, success: "Successfully get details",

                    response: {
                        post_detail: {
                            _id: post_details._id ? post_details._id : '',
                            // post_name: post_media_details.media[0] ? post_media_details.media[0].name : '',
                            // email: post_details.email ? post_details.email : '',
                            username: post_details.username ? post_details.username : '',
                            // name: user_details.name ? user_details.name : '',
                            profile_image: post_details ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + post_details.profile_image : '',
                            description: post_details.description ? post_details.description : '',
                            location: post_details.location ? post_details.location : '',
                            post_timing: post_details.post_timing ? post_details.post_timing : '',
                            post_utc_time: post_details.post_utc_time ? post_details.post_utc_time : '',
                            type: post_details ? post_details.type : '',
                            total_post_like: '0',
                            post_like: '0',
                            post_like_details: [],
                            total_post_comment: '0',
                            post_comment_details: [],
                            media: main,


                            // total_like: media_like_details.length ? media_like_details.length : '0',
                            // like_details: like_array ? like_array : [],
                            // total_comment: media_comment_details.length ? media_comment_details.length : 0,
                            // comment_details: comment_array ? comment_array : [],
                            // share: '0'
                        }
                    }
                })
            } else {
                res.status(200).send({ status: false, error: "NO media found" });
            }
        } else {
            res.status(200).send({ status: false, error: 'Auth token not valid' })
        }
    },


    get_all_comment: async function (req, res) {
        post_like_image.find(function (err, data) {
            res.json({ data: data })
        })
    },



    /// post_media_test


    post_media_test: async function (req, res) {
        upload(req, res, async function (error, upload) {
            var auth_token = req.body.auth_token;
            var location = req.body.location;
            var description = req.body.description;
            var media = req.body.media;
            var is_user = await user.findOne({ auth_token: auth_token });

            if (is_user) {


                console.log(req.body.media);
                var moment = require('moment-timezone');
                var today = new Date();
                var m_today = moment(today);
                var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
                var utc_time = moment.utc().format('DD/MM/YYYY  hh:mm:ss a');
                var media_array = [];
                for (var i = 0; i < media.length; i++) {
                    media_array.push({ name: media[i] })
                }
                var create_media = await post_media_test.create({
                    media: media_array,
                    email: is_user.username,
                    username: is_user.username,
                    profile_image: is_user.profile_image,
                    description: description,
                    location: location,
                    post_timing: indian_time,
                    post_utc_time: utc_time,
                    type: 'fixed'
                });

                res.status(200).send({
                    status: true, success: "Successfully created.",

                    response: { post_details: create_media }
                });


            } else {
                res.status(200).send({ status: false, error: "Error working..." });
            }
        })

    },


    get_all_media_test: async function (req, res) {
        var all_media = await post_media_test.find({}, { __v: 0, email: 0 });

        var post_data = [];

        for (var i = 0; i < all_media.length; i++) {

            if (all_media[i]) {
                var test_data = [];

                var total_post_comment = 0;
                for (var j = 0; j < all_media[i].media.length; j++) {
                    console.log(all_media[i].media[j].name)
                    //     var media_like = await post_like_media.find({ media: all_media[i].media[j] });
                    //     var media_comment = await post_comment_media.find({ media: all_media[i].media[j] });
                    //     console.log(media_comment);
                    //     var post_like_count = await post_like.find({ post_id: all_media[i]._id });
                    //     var post_comment_count = await post_comment.find({ post_id: all_media[i]._id });

                    //     // var is_user_like_post = await post_like.find({post_id: all_media[i]._id, email : is_user.email}).countDocuments();
                    //     // var is_user_comment_post = await post_comment.find({post_id: all_media[i]._id, email : is_user.email}).countDocuments();


                    //     // var like = await post_like_media.find({ media: all_media[i].media[j], email: is_user.email }).countDocuments();
                    //     // var comment = await post_comment_media.find({ media: all_media[i].media[j], email: is_user.email }).countDocuments();

                    //     var post_like_username = [];
                    //     for (var k = 0; k < post_like_count.length; k++) {
                    //         // console.log(post_like_count[k].username);
                    //         post_like_username.push({ email: post_like_count[k].email, username: post_like_count[k].username, post_like: post_like_count[k].like, time: post_like_count[k].timing });
                    //     }
                    //     var post_comment_username = [];
                    //     for (var k = 0; k < post_comment_count.length; k++) {
                    //         // console.log(post_like_count[k].username);
                    //         post_comment_username.push({ email: post_comment_count[k].email, username: post_comment_count[k].username, post_comment: post_comment_count[k].comment, time: post_comment_count[k].timing });
                    //     }


                    //     var media_like_username = [];
                    //     for (var l = 0; l < media_like.length; l++) {
                    //         // console.log(media_like[l].username);
                    //         media_like_username.push({ email: media_like[l].email, username: media_like[l].username, like: media_like[l].like, time: media_like[l].timing });
                    //     }

                    //     var media_comment_username = [];
                    //     for (var m = 0; m < media_comment.length; m++) {
                    //         // console.log(media_like[l].username);
                    //         media_comment_username.push({ email: media_comment[m].email, username: media_comment[m].username, comment: media_comment[m].comment, time: media_comment[m].timing });
                    //     }
                    //     test_data.push({
                    //         media: all_media[i].media ? "https://videogallery.nyc3.digitaloceanspaces.com/" + all_media[i].media[j] : '',
                    //         like: "0",
                    //         total_like: media_like.length > 0 ? `${media_like.length}` : "0",
                    //         media_like_details: media_like_username ? media_like_username : "0",
                    //         comment: "0",
                    //         total_comment: media_comment.length > 0 ? `${media_comment.length}` : "0",
                    //         media_comment_details: media_comment_username ? media_comment_username : "0"
                    //         // total_comment: (all_media[i].type === 'image') ? image_comment.length : video_comment.length,
                    //         // comment: (all_media[i].type === 'image') ? i_comment : v_comment
                    //     });
                }
                post_data.push({
                    _id: all_media[i] ? all_media[i]._id : '',
                    username: all_media[i] ? all_media[i].username : '',
                    profile_image: all_media[i] ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + all_media[i].profile_image : '',
                    description: all_media[i] ? all_media[i].description : '',
                    location: all_media[i] ? all_media[i].location : '',
                    post_timing: all_media[i] ? all_media[i].post_timing : '',
                    post_utc_time: all_media[i] ? all_media[i].post_utc_time : '',
                    type: all_media[i] ? all_media[i].type : '',
                    // total_post_like: post_like_count.length ? `${post_like_count.length}` : '0',
                    // post_like: "0",
                    // post_like_details: post_like_username ? post_like_username : '',
                    // total_post_comment: post_comment_count.length ? `${post_comment_count.length}` : '0',
                    // post_comment_details: post_comment_username ? post_comment_username : '',
                    // // post_comment : total_post_comment,
                    // media: test_data.reverse()
                })
            }
        }
        res.status(200).send({ status: true, success: "Successfully get all Post", response: { all_post_media: post_data.reverse() } })

    }

}