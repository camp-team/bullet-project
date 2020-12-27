const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')

const API_KEY = functions.config().sendgrid.key

sgMail.setApiKey(API_KEY)

exports.sendMail = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const msg = {
      to: '',
      from: '',
      templateId: 'd-5f041c47f53e4f8bbed195e381ed3fef',
      dynamic_template_data: {
        subject: data.subject,
        name: data.name,
        postId: data.postId,
        content: data.content,
      },
    }
    const res = await sgMail.send(msg)
    return res
  })
