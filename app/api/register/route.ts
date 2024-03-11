import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb";



export async function POST(request: Request) {
    try {
        // Get user info
    const { name, email, password, confirmPassword } = await request.json()

    // Check if required info exists
    if(!name || !email || !password || !confirmPassword) {
        return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if user exists
    const exist = await prisma!.user.findUnique({
        where: {
            email
        }
    })
    if(exist) {
        return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Check if password and confirmPassword match
    if(password !== confirmPassword) {
        return new Response("Passwords do not match", { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma!.user.create({
        data: {
            email,
            hashedPassword,
            name
        }
    })

    return Response.json(user, { status: 201 });
    } catch (err) {
        console.log(err)
        return new Response("Internal server error", { status: 500 });
    }
}

