
import connectDB from "@/app/lib/mongodb";
import FavouriteMovie from "@/app/models/FavouriteMovie";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const { userId, movieId, movieName, moviePoster } = await request.json();
        await connectDB();

        const existingFavourite = await FavouriteMovie.findOne({ userId, movieId });
        if (!existingFavourite) {
            await FavouriteMovie.create({ userId, movieId, movieName, moviePoster });
            return NextResponse.json({ message: "Added to favourite list" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Already exit" }, { status: 201 });
        }


    } catch (error) {
        console.error("Error occurred while adding to favourite:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        await connectDB();
        const favouriteMovies = await FavouriteMovie.find({ userId });

        return NextResponse.json(favouriteMovies, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching favourite movies:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request) {
    try {
        const { movieId, userId } = await request.json();
        await connectDB();

        const result = await FavouriteMovie.deleteOne({ userId, movieId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Movie removed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while removing:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}