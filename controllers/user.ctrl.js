//NPM Packages
const mongoose = require('mongoose');
var randomstring = require("randomstring");
var moment = require('moment-timezone');
var bcrypt = require('bcryptjs');
var randomnumber = require('random-number');

// generate 6 digits register_otp
var num = {
  min: 100000,
  max: 999999,
  integer: true
};
const saltRound = 10;
//Configuration Modules
const dbConnection = require('../config/database-connection.config');
const jwt = require('../config/jwt.config');
const send_email = require('../config/send-email.config');
var upload = require('../config/upload-file.config');

//Models
var user = require('../models/application/user');
var google_detail = require('../models/application/google_detail');
var facebook_detail = require('../models/application/facebook_detail');

var post_media = require('../models/application/post_media');
var post_comment_media = require('../models/application/post_comment_media');
var post_like_media = require('../models/application/post_like_media');
var post_like = require('../models/application/post_like');
var post_comment = require('../models/application/post_comment');

module.exports =
{
  registerUser: async function (req, res) {
    var today = new Date();
    var m_today = moment(today);
    var indian_time = m_today.tz('Asia/kolkata').format('DD/MM/YYYY  hh:mm:ss a');
    console.log(indian_time);
    upload(req, res, async function (error, data) {
      if (req.body.email) {
        var user_email = await user.findOne({ email: req.body.email });
        if (user_email) {
          res.status(200).send({ status: false, error: "Email already exists." });
        } else {
          if (req.body.username) {
            var user_username = await user.findOne({ username: req.body.username });
            if (user_username) {
              res.status(200).send({ status: false, error: "username already exists." });
            } else {
              var random = randomstring.generate(6);
              // generate 6 digits register_otp
              var register_otp = randomnumber(num);
              // set otp_register_session here
              var t = (5 * 60 * 1000); // set 5 minute otp_session here.....
              var register_otp_session = new Date(Date.now() + t);
              bcrypt.genSalt(saltRound, async function (err, salt) {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                  if (err) throw err;
                  if (req.files.profile_image) {
                    console.log(req.files.profile_image[0].key);
                    console.log(hash);

                    user.create({
                      username: req.body.username,
                      email: req.body.email,
                      // mobile: req.body.mobile ? req.body.mobile : false,
                      // profile_image: req.files.profile_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/' + req.files.profile_image[0].key : '',
                      profile_image: req.files.profile_image ? req.files.profile_image[0].key : '',
                      password: hash,
                      confirm_pass: hash,
                      random: random,
                      create_at: indian_time,
                      is_email_verified: false,
                      // is_mobile_verified: false,
                      register_otp: register_otp,
                      register_otp_session: register_otp_session
                    }, async function (err, data) {
                      if (err) throw err;
                      else {
                        // send_email.sendMail(null, data.email, null, data.register_otp);
                        send_email.sendMail_to_user(null, data.email, null, data.register_otp)
                        console.log("data are " + data);
                        res.status(200).send({
                          status: true,
                          success: "User Successfully registered !!.",
                          response: { user: { username: data.username, email: data.email } }
                        });
                      }
                    })
                  } else {
                    console.log("file nahi hai");
                    user.create({
                      username: req.body.username,
                      email: req.body.email,
                      // mobile: req.body.mobile ? req.body.mobile : false,
                      // profile_image: 'https://videogallery.nyc3.digitaloceanspaces.com/nature-12.jpg',
                      profile_image: 'nature-12.jpg',
                      password: hash,
                      confirm_pass: hash,
                      random: random,
                      create_at: indian_time,
                      is_email_verified: false,
                      // is_mobile_verified: false,
                      register_otp: register_otp,
                      register_otp_session: register_otp_session
                    }, function (err, data) {
                      if (err) throw err;
                      else {
                        // send_email.sendMail(null, data.email, null, data.register_otp);
                        send_email.sendMail_to_user(null, data.email, null, data.register_otp);
                        console.log("data are " + data);
                        res.status(200).send({
                          status: true,
                          success: "User Successfully registered !!.",
                          response: { user: { username: data.username, email: data.email } }
                        });
                      }
                    })
                  }
                })
              })
            }
          } else {
            res.status(200).send({ status: false, error: "Username must required.." });
          }
        }
      } else {
        res.status(200).send({ status: false, error: "Email must be required." })
      }
    })
  },
  loginUser: async function (req, res) {
    var is_user = await user.findOne({ email: req.body.email });
    if (is_user) {
      bcrypt.compare(req.body.password, is_user.password, async function (err, is_equal) {
        if (err) return next({ errors: [{ message: err.toString() }] });
        if (!is_equal) {
          res.status(200).send({ status: false, error: "Password does'nt match." });
        } else {
          if (is_user.is_email_verified) {
            var auth_token = await jwt.genToken(is_user.email);
            var update_user = await user.updateOne({ email: req.body.email }, { $set: { auth_token: auth_token } });
            if (update_user) {
              res.status(200).send({
                status: true, success: "Login successfully.",
                response: { auth_token: auth_token, user: { username: is_user.username, email: is_user.email } }
              });
            } else {
              res.status(200).send({ status: false, error: "Auth Token Not updated" });
            }
          } else {
            console.log(is_user.is_email_verified);
            res.status(200).send({ status: false, error: "Email not verified" });
          }
        }
      })
    } else {
      res.status(200).send({ status: false, error: "Email Does'nt match." });
    }
  },
  forgotPasswordUser: async function (req, res) {
    if (req.body.email) {
      var is_user = await user.findOne({ email: req.body.email });
      if (is_user) {
        console.log(is_user);
        var reset_password_otp = randomnumber(num);
        var t = (5 * 60 * 1000); // set 5 minute reset_password_otp_session here.....
        var reset_password_otp_session = new Date(Date.now() + t);
        var user_otp = await user.updateOne({ email: req.body.email }, { $set: { reset_password_otp: reset_password_otp, reset_password_otp_session: reset_password_otp_session } });
        if (user_otp) {
          send_email.sendMail_to_user_newpassword(null, is_user.email, null, reset_password_otp);
          res.status(200).send({ status: true, success: "Check your email to change password" });
        }
      } else {
        res.status(200).send({ status: false, error: "Email does'nt exist" });
      }
    } else {
      res.status(200).send({ status: false, error: "Email must be required...." });
    }
  },
  resetPassword: async function (req, res) {
    if (req.body.email) {
      var is_user = await user.findOne({ email: req.body.email });
      if (is_user) {
        var session = is_user.reset_password_otp_session;
        var reset_password_otp_session = new Date(session);
        if (req.body.reset_password_otp == is_user.reset_password_otp) {
          if (reset_password_otp_session > (new Date(Date.now()))) {
            console.log(reset_password_otp_session + " ===== " + " session running.....");
            if (req.body.password) {
              bcrypt.genSalt(saltRound, async function (err, salt) {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                  if (err) throw err;
                  var update_user = await user.updateMany({ email: is_user.email }, { $set: { password: hash, confirm_pass: hash } });
                  if (update_user) {
                    var update_otp = await user.updateOne({ email: is_user.email }, { $set: { reset_password_otp: 'null' } });
                    res.status(200).send({ status: true, success: "Password Successfully Updated" });
                  }
                })
              })
            } else {
              res.status(200).send({ status: false, error: "Please enter the valid password" });
            }
          } else {
            console.log("***********************  session expired")
            res.status(200).send({ status: false, error: "OTP Session expired...." });
          }
        } else {
          res.status(200).send({ status: false, error: "OTP does'nt match..." });
        }
      } else {
        res.status(200).send({ status: false, error: "Email does'nt exist" });
      }
    } else {
      res.status(200).send({ status: false, error: "Email must be required.." });
    }
  },
  user_verify: async function (req, res) {
    if (req.body.email) {
      var is_user = await user.findOne({ email: req.body.email });
      if (is_user) {
        var register_otp_session = is_user.register_otp_session;
        var session_otp = new Date(register_otp_session);
        if (req.body.register_otp == is_user.register_otp) {
          if (session_otp > (new Date(Date.now()))) {
            var update_user = await user.updateOne({ email: req.body.email }, { $set: { is_email_verified: true } });
            if (update_user) {
              var auth_token = await jwt.genToken(is_user.email);
              var update_user_auth = await user.updateOne({ email: req.body.email }, { $set: { auth_token: auth_token } })
              if (update_user_auth) {
                res.status(200).send({
                  status: true, success: "Email verified successfully...",
                  response: { auth_token: auth_token, user: { username: is_user.username, email: is_user.email } }
                });
              } else {
                res.status(200).send({ status: false, error: "Auth Token Not updated" });
              }
            } else {
              res.status(200).send({ status: false, error: "Email not verified" });
            }
          } else {
            res.status(200).send({ status: false, error: "Session expired..." });
          }
        } else {
          res.status(200).send({ status: false, error: "OTP does'nt match..." });
        }
      } else {

      }
    } else {
      res.status(200).send({ status: false, error: "Email must be required.." });
    }
  },
  social_login: async function (req, res) {
    if (req.body.provider == 'com.google') {
      console.log("google : " + req.body.provider);
      var is_user = await google_detail.findOne({ email: req.body.email });

      if (!is_user) {
        if (req.body.email) {
          var auth_token = await jwt.genToken(req.body.email);
          var create_user = await google_detail.create({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            photoUrl: req.body.photoUrl,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            google_authToken: req.body.authToken,
            auth_token: auth_token,
            idToken: req.body.idToken,
            provider: req.body.provider
          });
          console.log(create_user);
          if (create_user) {
            res.status(200).send({
              status: true, success: "Login successfully.",
              response: { google_auth_token: create_user.google_authToken, auth_token: auth_token, user: { _id: create_user._id, email: create_user.email, provider: create_user.provider } }
            });
          } else {
            res.status(200).send({ status: false, error: 'Not saved data' });
          }
        } else {
          res.status(200).send({ status: false, error: 'Email must required...' });
        }
      } else {
        console.log("direct loginn..............................direct login")
        console.log(is_user);
        var auth_token = await jwt.genToken(is_user.email);
        res.status(200).send({
          status: true, success: "Login successfully.",
          response: { google_auth_token: is_user.google_authToken, auth_token: auth_token, user: { _id: is_user._id, email: is_user.email, provider: is_user.provider } }
        });
      }
    } else if (req.body.provider == 'com.facebook') {
      var is_user_2 = await facebook_detail.findOne({ email: req.body.email });
      if (!is_user_2) {
        if (req.body.email) {
          var auth_token = await jwt.genToken(req.body.email);
          var create_user = await facebook_detail.create({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            photoUrl: req.body.photoUrl,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            facebook_authToken: req.body.authToken,
            auth_token: auth_token,
            provider: req.body.provider
          });
          console.log(create_user);
          if (create_user) {

            res.status(200).send({
              status: true, success: "Login successfully.",
              response: { facebook_auth_token: create_user.facebook_authToken, auth_token: auth_token, user: { _id: create_user._id, email: create_user.email, provider: create_user.provider } }
            });
          } else {
            res.status(200).send({ status: false, error: 'Not saved data' });
          }
        } else {
          res.status(200).send({ status: false, error: 'Email must required...' });
        }
      } else {
        console.log("direct loginn..............................direct login")
        console.log(is_user_2);
        var auth_token = await jwt.genToken(is_user_2.email);
        res.status(200).send({
          status: true, success: "Login successfully.",
          response: { facebook_auth_token: is_user_2.facebook_authToken, auth_token: auth_token, user: { _id: is_user_2._id, email: is_user_2.email, provider: is_user_2.provider } }
        });
      }
    } else {
      res.status(200).send({ status: false, error: "Provider does'nt match...." });
    }
  },

  ////////////// After login
  user_detail: async function (req, res) {
    var auth_token = req.body.auth_token;
    var is_user = await user.findOne({ auth_token: auth_token });
    if (is_user) {
      res.status(200).send({
        status: true,
        success: "Successfully get Data.",
        response: {
          user_detail:
          {
            username: is_user.username,
            email: is_user.email,
            profile_image: is_user.profile_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.profile_image : '',
            background_image: is_user.background_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.background_image : '',
            mobile: is_user.mobile,
            name: is_user.name,
            gender: is_user.gender,
            about_me: is_user.about_me,
            name: is_user.name
          }
        }
      })
    } else {
      res.status(200).send({ status: false, error: "Auth Token Invalid." });
    }
  },
  update_user_profile: async function (req, res) {
    upload(req, res, async function (error, uploaded) {
      if (error) {
        res.status(200).send({ status: false, error: error });
      } else {
        var data = await user.findOne({ auth_token: req.body.auth_token });
        if (data) {
          user.findOne({ username: req.body.username }, function (err, username_data) {
            if (err) {
              res.status(200).send({ status: false, error: err });
            } else {
              if (data.username == req.body.username) {
                console.log("ssssssssssssssssssssssss");
                if (req.files.profile_image || req.files.background_image) {
                  // console.log("cccccccccccc : "+req.files.profile_image[0].originalname);
                  // console.log("dddddddddd : "+req.files.background_image[0].originalname);

                  user.updateOne({ auth_token: data.auth_token },
                    {
                      $set:
                      {
                        username: req.body.username ? req.body.username : data.username,
                        profile_image: req.files.profile_image ? req.files.profile_image[0].key : data.profile_image,
                        background_image: req.files.background_image ? req.files.background_image[0].key : data.background_image,
                        mobile: req.body.mobile ? req.body.mobile : data.mobile,
                        name: req.body.name ? req.body.name : data.name,
                        gender: req.body.gender ? req.body.gender : data.gender,
                        about_me: req.body.about_me ? req.body.about_me : data.about_me
                      }
                    }, function (err, updated) {
                      if (err) {
                        res.status(200).send({ status: false, error: err });
                      } else {
                        if (updated) {
                          post_media.updateMany({ email: data.email }, {
                            $set:
                            {
                              username: req.body.username ? req.body.username : data.username,
                              profile_image: req.files.profile_image ? req.files.profile_image[0].key : data.profile_image,
                            }
                          }, async function (err, update_user_image) {
                            if (err) {
                              res.status(200).send({ status: false, error: err });
                            } else {
                              var update_post_comment_media = await post_comment_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like_media = await post_like_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like = await post_like.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_comment = await post_comment.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              res.status(200).send({ status: true, success: "Successfully Updated.." });
                            }
                          })

                        } else {
                          res.status(200).send({ status: false, error: "Not updated successfully." });
                        }
                      }
                    })
                } else {
                  user.updateOne({ auth_token: data.auth_token },
                    {
                      $set:
                      {
                        username: req.body.username ? req.body.username : data.username,
                        profile_image: data.profile_image,
                        mobile: req.body.mobile ? req.body.mobile : data.mobile,
                        name: req.body.name ? req.body.name : data.name,
                        gender: req.body.gender ? req.body.gender : data.gender,
                        about_me: req.body.about_me ? req.body.about_me : data.about_me
                      }
                    }, function (err, updated) {
                      if (err) {
                        res.status(200).send({ status: false, error: err });
                      } else {
                        if (updated) {
                          post_media.updateMany({ email: data.email }, {
                            $set:
                            {
                              username: req.body.username ? req.body.username : data.username,
                              profile_image: data.profile_image,
                            }
                          },async function (err, update_user_image) {
                            if (err) {
                              res.status(200).send({ status: false, error: err });
                            } else {

                              var update_post_comment_media = await post_comment_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like_media = await post_like_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like = await post_like.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_comment = await post_comment.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });


                              res.status(200).send({ status: true, success: "Successfully Updated.." });
                            }
                          })

                        } else {
                          res.status(200).send({ status: false, error: "Not updated successfully." });
                        }
                      }
                    })
                }
              }
              else if (username_data) {
                console.log("aaaaaaaaaaaaaaaaaaa");
                res.status(200).send({ status: false, error: "Username Already exist." })
              }
              else {
                // console.log(req.files);
                // console.log("cccccccccccc : "+req.files.profile_image[0].originalname);
                if (req.files.profile_image || req.files.background_image) {
                  // console.log("cccccccccccc : "+req.files.profile_image[0].originalname);
                  // console.log("dddddddddd : "+req.files.background_image[0].originalname);

                  user.updateOne({ auth_token: data.auth_token },
                    {
                      $set:
                      {
                        username: req.body.username ? req.body.username : data.username,
                        profile_image: req.files.profile_image ? req.files.profile_image[0].key : data.profile_image,
                        background_image: req.files.background_image ? req.files.background_image[0].key : data.background_image,
                        mobile: req.body.mobile ? req.body.mobile : data.mobile,
                        name: req.body.name ? req.body.name : data.name,
                        gender: req.body.gender ? req.body.gender : data.gender,
                        about_me: req.body.about_me ? req.body.about_me : data.about_me
                      }
                    }, function (err, updated) {
                      if (err) {
                        res.status(200).send({ status: false, error: err });
                      } else {
                        if (updated) {
                          post_media.updateMany({ email: data.email }, {
                            $set:
                            {
                              username: req.body.username ? req.body.username : data.username,
                              profile_image: req.files.profile_image ? req.files.profile_image[0].key : data.profile_image,
                            }
                          },async function (err, update_user_image) {
                            if (err) {
                              res.status(200).send({ status: false, error: err });
                            } else {

                              var update_post_comment_media = await post_comment_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like_media = await post_like_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like = await post_like.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_comment = await post_comment.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });


                              res.status(200).send({ status: true, success: "Successfully Updated.." });
                            }
                          })

                        } else {
                          res.status(200).send({ status: false, error: "Not updated successfully." });
                        }
                      }
                    })
                } else {
                  user.updateOne({ auth_token: data.auth_token },
                    {
                      $set:
                      {
                        username: req.body.username ? req.body.username : data.username,
                        profile_image: data.profile_image,
                        mobile: req.body.mobile ? req.body.mobile : data.mobile,
                        name: req.body.name ? req.body.name : data.name,
                        gender: req.body.gender ? req.body.gender : data.gender,
                        about_me: req.body.about_me ? req.body.about_me : data.about_me
                      }
                    }, function (err, updated) {
                      if (err) {
                        res.status(200).send({ status: false, error: err });
                      } else {
                        if (updated) {
                          post_media.updateMany({ email: data.email }, {
                            $set:
                            {
                              username: req.body.username ? req.body.username : data.username,
                              profile_image: data.profile_image,
                            }
                          },async function (err, update_user_image) {
                            if (err) {
                              res.status(200).send({ status: false, error: err });
                            } else {

                              var update_post_comment_media = await post_comment_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like_media = await post_like_media.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_like = await post_like.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });

                              var update_post_comment = await post_comment.updateMany({email: data.email},{$set:
                                {username: req.body.username ? req.body.username : data.username} });


                              res.status(200).send({ status: true, success: "Successfully Updated.." });
                            }
                          })

                        } else {
                          res.status(200).send({ status: false, error: "Not updated successfully." });
                        }
                      }
                    })
                }
              }
            }
          });
        } else {
          res.status(200).send({ status: false, error: "Authtoken invalid" });
        }
      }
    })
  },
  user_profiling: async function (req, res) {
    var is_user = await user.findOne({ auth_token: req.body.auth_token });
    if (is_user) {
      var is_post_media = await post_media.find({ email: is_user.email }, { email: 0, _id: 0, __v: 0, profile_image: 0, username: 0 });
      if (is_post_media) {
        console.log(is_post_media);
        var post_details = [];
        for(var i = 0; i< is_post_media.length; i++){
          var medias = [];
          for(var j =0; j<is_post_media[i].media.length; j++){
            medias.push('https://videogallery.nyc3.digitaloceanspaces.com/'+is_post_media[i].media[j].name)
          }
          post_details.push({ description : is_post_media[i].description, location : is_post_media[i].location, timing : is_post_media[i].post_timing, type : is_post_media[i].type, media :medias})
        }
        res.status(200).send({
          status: true, success: "Successfully get details", response: {
            user_detail: {
              username: is_user.username ? is_user.username : '',
              email: is_user.email ? is_user.email : '',
              profile_image: is_user.profile_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.profile_image : '',
              background_image: is_user.background_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.background_image : '',
              mobile: is_user.mobile ? is_user.mobile : '',
              gender: is_user.gender ? is_user.gender : '',
              about_me: is_user.about_me ? is_user.about_me : '',
              name: is_user.name ? is_user.name : '',
              posts: is_post_media ? `${is_post_media.length}` : "0",
              folowers: '100k',
              folowing: '120',
              user_info: is_user.email ? is_user.email : '',
              post_media: post_details ? post_details: []
            }
          }
        })
      } else {
        res.status(200).send({
          status: true, success: "Successfully get details", response: {
            user_detail: {
              username: is_user.username ? is_user.username : '',
              email: is_user.email ? is_user.email : '',
              profile_image: is_user.profile_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.profile_image : '',
              background_image: is_user.background_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.background_image : '',
              mobile: is_user.mobile ? is_user.mobile : '',
              gender: is_user.gender ? is_user.gender : '',
              about_me: is_user.about_me ? is_user.about_me : '',
              name: is_user.name ? is_user.name : '',
              posts: is_post_media ? `${is_post_media.length}` : "0",
              folowers: '100k',
              folowing: '120',
              user_info: is_user.email ? is_user.email : '',
              post_media: post_details ? post_details: []
            }
          }
        })
      }
    } else {
      res.status(200).send({ status: false, error: "Authtoken invalid" })
    }
  },
  get_user_profiling_by_id: async function (req, res) {
    var is_valid_auth = await user.findOne({ auth_token : req.body.auth_token});
    if(is_valid_auth){
      var is_user = await user.findOne({ _id: req.body.user_id });
      if (is_user) {
        var post_details = await post_media.find({ email: is_user.email }, { email: 0, _id: 0, __v: 0, profile_image: 0, username: 0 });
        if (post_details) {
          res.status(200).send({
            status: true, success: "Successfully get details", response: {
              user_detail: {
                username: is_user.username ? is_user.username : '',
                email: is_user.email ? is_user.email : '',
                profile_image: is_user.profile_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.profile_image : '',
                background_image: is_user.background_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.background_image : '',
                mobile: is_user.mobile ? is_user.mobile : '',
                gender: is_user.gender ? is_user.gender : '',
                about_me: is_user.about_me ? is_user.about_me : '',
                posts: '89',
                folowers: '100k',
                folowing: '120',
                user_info: is_user.email ? is_user.email : '',
                post: post_details ? post_details : []
              }
            }
          })
        } else {
          res.status(200).send({
            status: true, success: "Successfully get details", response: {
              user_detail: {
                username: is_user.username ? is_user.username : '',
                email: is_user.email ? is_user.email : '',
                profile_image: is_user.profile_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.profile_image : '',
                background_image: is_user.background_image ? 'https://videogallery.nyc3.digitaloceanspaces.com/'+is_user.background_image : '',
                mobile: is_user.mobile ? is_user.mobile : '',
                gender: is_user.gender ? is_user.gender : '',
                about_me: is_user.about_me ? is_user.about_me : '',
                posts: '89',
                folowers: '100k',
                folowing: '120',
                user_info: is_user.email ? is_user.email :''
  
              }
            }
          })
        }
      } else {
        res.status(200).send({ status: false, error: "Invalid user" })
      }
    }else{
      res.status(200).send({ status: false, error: "Invalid token" })
    }
  }
}
