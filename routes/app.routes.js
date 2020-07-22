const userCtrl = require('../controllers/user.ctrl');
const postCtrl = require('../controllers/post.ctrl');
const settingCtrl = require('../controllers/setting.ctrl');


const multer = require('multer');
const fs = require('fs');

const jwt = require('../config/jwt.config');

//
module.exports = (app) => {
    ////////// userCtrl
    app.post('/app/register', userCtrl.registerUser);
    app.post('/app/login', userCtrl.loginUser);
    app.post('/app/forgot_password', userCtrl.forgotPasswordUser);
    app.post('/app/reset_password', userCtrl.resetPassword);
    app.post('/app/user_verify', userCtrl.user_verify);
    app.post('/app/social_login', userCtrl.social_login);

    app.post('/app/user_detail', userCtrl.user_detail);
    app.post('/app/update_user_profile', userCtrl.update_user_profile);
    app.post('/app/user_profiling', userCtrl.user_profiling);
    app.post('/app/get_user_profiling_by_id', userCtrl.get_user_profiling_by_id);


    ///////// postCtrl
    // app.post('/app/post_images', postCtrl.post_images);
    // app.post('/app/post_videos', postCtrl.post_videos);

    // app.post('/app/post_like', postCtrl.post_like);
    app.post('/app/post_like', postCtrl.post_like_2);

    // app.post('/app/post_comment', postCtrl.post_comment);
    app.post('/app/post_comment', postCtrl.post_comment_2);

    app.post('/app/post_media', postCtrl.post_media);
    /// post_media_test
    app.post('/app/post_media_test', postCtrl.post_media_test);
    // app.post('/app/get_all_media_after_login', postCtrl.get_all_media_after_login);
    app.post('/app/get_all_media_after_login', postCtrl.get_all_media_after_login_2);

    // app.post('/app/get_post_like_detail', postCtrl.get_post_like_detail);
    app.post('/app/get_post_like_detail', postCtrl.get_post_like_detail_2);

    // app.post('/app/get_post_comment_detail', postCtrl.get_post_comment_detail);
    app.post('/app/get_post_comment_detail', postCtrl.get_post_comment_detail_2);
    
    // get_post_details

    app.post('/app/get_post_details', postCtrl.get_post_details);
    
    
    app.post('/app/delete_post_comment', postCtrl.delete_post_comment);
    
    // app.get('/app/get_all_post', postCtrl.get_all_post); 
    // app.get('/app/get_all_media', postCtrl.get_all_media);
    app.get('/app/get_all_media', postCtrl.get_all_media_2);
    app.get('/app/get_all_media_test', postCtrl.get_all_media_test);

    app.get('/app/get_all_comment', postCtrl.get_all_comment);
    /////// settingCtrl

    app.get('/app/get_setting_list', settingCtrl.get_setting_list);
    app.post('/app/add_setting_list', settingCtrl.add_setting_list);
    app.post('/app/invite', settingCtrl.invite);
    app.post('/app/features', settingCtrl.features);
    app.post('/app/account', settingCtrl.account);
    app.post('/app/privacy_security', settingCtrl.privacy_security);
    app.post('/app/account_privacy', settingCtrl.account_privacy);
    app.post('/app/visible_likes', settingCtrl.visible_likes);
    app.post('/app/block_list', settingCtrl.block_list);
    app.post('/app/content_liked', settingCtrl.content_liked);
    app.post('/app/authentication_options', settingCtrl.authentication_options);
    app.post('/app/data_download', settingCtrl.data_download);
    app.post('/app/manage_subscribers', settingCtrl.manage_subscribers);
    app.post('/app/notifications', settingCtrl.notifications);
    app.post('/app/support', settingCtrl.support);
    
}
