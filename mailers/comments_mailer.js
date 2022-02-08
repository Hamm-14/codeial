
const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment},'./comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'codeialnodejs@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    },(err,info) => {
        if(err){console.log("Error in sending mail",err);return;}

        console.log('Message Sent',info);
        return;
    });
}