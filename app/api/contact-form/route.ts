import sgMail from "@sendgrid/mail"
import { MailDataRequired } from "@sendgrid/mail"



const sendApiKey = process.env.SENDGRID_API_KEY || ""
sgMail.setApiKey(sendApiKey)
let message: MailDataRequired


export async function POST(request: Request) {
    const body = await request.json()
    const { email, name, description } = body
    console.log(email, name, description)

    let text = `Email: ${email}\nName: ${name}\nDescription: ${description}`
    let emailHtml = `<p>Email: ${email}</p><p>Name: ${name}</p><p>Description: ${description}</p>`

    const message = {
        to: "joshmeadows@newgendigitalmedia.com", 
        from: "website@newgendigitalmedia.com", 
        subject: 'Contact Form Submission',
        text: text,
        html: emailHtml,
      }
    await sgMail.send(message)
    return new Response("ok", { status: 200 })
}
