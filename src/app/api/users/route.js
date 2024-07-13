import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, email, image } = await request.json();
        await connectDB();

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, image });
        }

        return NextResponse.json({ message: "User registered or already exists" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const users = await User.find({});
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching users:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { email } = await request.json();
        await connectDB();

        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
