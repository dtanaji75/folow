const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY2);
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vsujeet591@gmail.com',
        pass: '8652248919'
    }
});
module.exports = {
    sendMail(from, to, subject, register_otp) {
        return new Promise(async (resolve, reject) => {
            // pathToAttachment = `${__dirname}/public/upload/`+image;
            // attachment = fs.readFileSync(pathToAttachment).toString("base64");
            // var url = `http://localhost:4000/verify_email/${random}`
            const msg = {
                from: process.env.SEND_EMAIL_FROM2,
                to: to,
                subject: 'Email Verification',
                html : `This OTP Valid for 5 minutes....
                Please copy the OTP for email verification....`+register_otp
                // html: `Please Click this link to confirm your email : <a href="${url}">${url}</a>`
                // attachments: [{
                //     content: attachment,
                //     filename: image,
                // }]
            };


            sgMail.send(msg, async function (err, info) {
                if (err) {
                    console.log("Unable send to email to " + to + " | " + err);
                    try {
                        resolve({ status: false, 'error': err });
                    } catch (err) {
                        console.log("!st error workingngng...");
                    }
                } else {
                    console.log("Email is send successfully to " + to);
                    try {
                        resolve({ status: true, 'info': info });
                    } catch (err) {
                        console.log("2nd error workingg....");
                    }
                }
            })

        })
    },

    sendNewPassword(from, to1, subject, id, otp){
        return new Promise( async (resolve, reject)=>{
            // var url1 = `http://localhost:4200/auth/forgot_password/${id}`;
            const msg = {
                from: process.env.SEND_EMAIL_FROM2,
                to: to1,
                subject: 'Reset Password OTP',
                html : `Please Copy the Otp. It will be expired within 5 minutes : `+otp
                // html: `Please Click this link to create new password : <a href="${url1}">${url1}</a>`
                // attachments: [{
                //     content: attachment,
                //     filename: image,
                // }]
            };

            sgMail.send(msg, async function(err, info){
                if (err) {
                    console.log("Unable send to email to " + to1 + " | " + err);
                    try {
                        resolve({ status: false, 'error': err });
                    } catch (err) {
                        console.log("!st error workingngng...");
                    }
                } else {
                    console.log("Email is send successfully to " + to1);
                    try {
                        resolve({ status: true, 'info': info });
                    } catch (err) {
                        console.log("2nd error workingg....");
                    }
                }
            })
        })
    },
    sendMail_to_user(from, to, subject, register_otp) {
        return new Promise((resolve, reject) => {
            var mailOptions = {
                from: 'vsujeet591@gmail.com',
                to: to,
                subject: 'Email Verification',
                html : `This OTP Valid for 5 minutes....
                Please copy the OTP for email verification....`+register_otp
            };


            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log("unable to send email to " + to + ' | ' + error);
                    try {
                        resolve({ 'status': false, 'error': error, 'code': '500' })
                    } catch (err) {
                        console.log("1st error workingngnng...");
                    }

                } else {
                    console.log("Email sent to : " + info);
                    try {
                        // const status_update1 = await user_details.updateMany({ 'email': to }, { $set: { 'status': true } })
                        // console.log("Updated status  " + status_update1);
                        console.log("Email is send successfully to " + to);
                        resolve({ 'status': true, 'code': '200' })
                    } catch (err) {
                        console.log("2nd error workingg....");
                    }
                }
            })
        })

    },
    sendMail_to_user_newpassword(from, to, subject, otp) {
        return new Promise((resolve, reject) => {
            var mailOptions = {
                from: 'vsujeet591@gmail.com',
                to: to,
                subject: 'Reset Password OTP',
                html : `Please Copy the Otp. It will be expired within 5 minutes : `+otp
            };


            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log("unable to send email to " + to + ' | ' + error);
                    try {
                        resolve({ 'status': false, 'error': error, 'code': '500' })
                    } catch (err) {
                        console.log("1st error workingngnng...");
                    }

                } else {
                    console.log("Email sent to : " + info);
                    try {
                        // const status_update1 = await user_details.updateMany({ 'email': to }, { $set: { 'status': true } })
                        // console.log("Updated status  " + status_update1);
                        console.log("Email is send successfully to " + to);
                        resolve({ 'status': true, 'code': '200' })
                    } catch (err) {
                        console.log("2nd error workingg....");
                    }
                }
            })
        })

    }


}