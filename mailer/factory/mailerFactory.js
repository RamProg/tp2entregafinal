let sentEmails = 0

const createMailer = {
    send: ({ mail, subject, message }) => {
        sentEmails++
    },
    sentEmails: () => {
        return sentEmails
    }
}

module.exports = { createMailer }
