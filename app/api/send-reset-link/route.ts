import Stripe from "stripe"
import sgMail from "@sendgrid/mail"
import { MailDataRequired } from "@sendgrid/mail"
import prisma from "@/app/libs/prismadb"

const sendApiKey = process.env.SENDGRID_API_KEY || ""
sgMail.setApiKey(sendApiKey)
let message: MailDataRequired

export async function POST(request: Request) {
    try {
        // get the email from the request body
        const { email } = await request.json()

        if(!email) {
            return new Response(JSON.stringify({message: "Email is required"}), { status: 400 })
        }
        // check if the email exists in the database
        const user = await prisma?.user.findUnique({
            where: {
                email
            }
        })
        // if the user does not exist, return an error
        if (!user) {
            return new Response(JSON.stringify({message: "No user found"}), { status: 400 })
        }

        // Check if the user has an account
        const account = await prisma?.account.findUnique({
            where: { userId: user.id }
        })

        // if the user does not have an account, return an error saying to use google sign in
        if(account) {
            return new Response(JSON.stringify({message: "User has a Google account. Please sign in with Google."}), { status: 400 })
        }
        // send the email
        const message = {
            to: email, 
            from: 'passwordreset@newgendigitalmedia.com', 
            subject: 'NewGen Digital Media Subscription Created',
            message: 'You have requested a password reset. Please click the link to reset your password. Reset Password',
            html: `<p>You have requested a password reset. Please click the link to reset your password. <a href="https://www.newgendigitalmedia.com/reset-password/${user.id}">Reset Password</a></p>`,
          }
        await sgMail.send(message)
        return new Response(JSON.stringify({message: "Email sent"}), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({message: "Internal Server Error"}), { status: 500 })
    }
}