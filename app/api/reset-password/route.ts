import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'


export async function POST(request: Request) {
    try {
        const { id, password, confirmPassword } = await request.json()

        // check if the password and confirm password match
        if (password !== confirmPassword) {
            return new Response(JSON.stringify({ message: "Passwords do not match" }), { status: 400 })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // update the user password
        await prisma?.user.update({
            where: {
                id
            },
            data: {
                hashedPassword
            }
        })
        return new Response(JSON.stringify({ message: "Password changed successfully" }), { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}