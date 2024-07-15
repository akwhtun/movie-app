import mongoose from 'mongoose';

const FavouriteMovieSchema = new mongoose.Schema({
    userId: String,
    movieId: String,
    movieName: String,
    moviePoster: String,
});

export default mongoose.models.FavouriteMovie || mongoose.model('FavouriteMovie', FavouriteMovieSchema);

