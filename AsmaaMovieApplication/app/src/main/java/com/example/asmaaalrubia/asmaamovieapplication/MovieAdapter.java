package com.example.asmaaalrubia.asmaamovieapplication;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import java.util.ArrayList;
import android.widget.ImageView;
import android.widget.TextView;
import butterknife.BindView;
import butterknife.ButterKnife;
import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;


public class MovieAdapter extends RecyclerView.Adapter<MovieAdapter.MovieViewHolder>{

    private final static String LOG_TAG = MovieAdapter.class.getSimpleName();
    public static final float POSTER_ASPECT_RATIO = 1.5f;

    private final ArrayList<Movie> MovieList;

    //private OnItemClickListener mOnItemClickListener;

   // public interface OnItemClickListener {
     //   void send_details(Movie movie, int position);}


    public MovieAdapter(ArrayList<Movie> movieList/*,OnItemClickListener mItemClickListener*/) {
        this.MovieList = movieList;
      //  this.mOnItemClickListener = mItemClickListener;
    }


    @NonNull
    @Override
    public MovieViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Context parentContext = parent.getContext();
        int layoutForMovieItem = R.layout.layout_grid_item;
        LayoutInflater inflater = LayoutInflater.from(parentContext);
        boolean shouldAttachToParentImmediately = false;
        View view = inflater.inflate(R.layout.layout_grid_item, parent, shouldAttachToParentImmediately);
        final Context context = view.getContext();

        int gridColsNumber = context.getResources()
                .getInteger(R.integer.number_of_grid_columns);

        view.getLayoutParams().height = (int) (parent.getWidth() / gridColsNumber *
                POSTER_ASPECT_RATIO);


        MovieViewHolder viewHolder = new MovieViewHolder(view);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull final MovieViewHolder holder, int position) {
        final Movie movie = MovieList.get(position);
        final Context context = holder.mView.getContext();

        holder.mMovie = movie;
        holder.mMovietitle.setText(movie.getMovieName());

        String posterUrl = movie.getPoster();
        // Warning: onError() will not be called, if url is null.
        // Empty url leads to app crash.
        if (posterUrl == null) {
            holder.mMovietitle.setVisibility(View.VISIBLE);
        }

        Picasso.get()
                .load(movie.getPoster())
                .config(Bitmap.Config.RGB_565)
           //     .placeholder(R.drawable.image_placeholder)
                .into(holder.mMovieThumbnail,
                        new Callback() {
                            @Override
                            public void onSuccess() {
                                if (holder.mMovie.getID() != movie.getID()) {
                                    holder.cleanUp();
                                } else {
                                    holder.mMovieThumbnail.setVisibility(View.VISIBLE);
                                }
                            }

                            @Override
                            public void onError(Exception e) {
                                holder.mMovietitle.setVisibility(View.VISIBLE);
                            }
                        }
                );

      //  holder.mView.setOnClickListener(new View.OnClickListener() {
           /* @Override
            public void onClick(View v) {
                mOnItemClickListener.send_details(movie,holder.getAdapterPosition());
            }
        });*/
    }

    @Override
    public int getItemCount() {
        return MovieList.size();
    }

    @Override
    public void onViewRecycled(MovieViewHolder holder) {
        super.onViewRecycled(holder);
        holder.cleanUp();
    }
    ////////////////////////////////////////////////////////////
    @Override
    public long getItemId(int position) {
        return position;
    }
    /////////////////////////////////////////////////////////////////

    //Inner Class
    public class MovieViewHolder extends RecyclerView.ViewHolder {
        public final View mView;

        public Movie mMovie;

        @BindView(R.id.Movie_Poster)
        ImageView mMovieThumbnail;

        @BindView(R.id.movie_title)
        TextView mMovietitle;

        public MovieViewHolder(View view) {
            super(view);
            ButterKnife.bind(this, view);
            mView = view;

        }
        //Other methods
        public void cleanUp() {
            final Context context = mView.getContext();
            Picasso.get().cancelRequest(mMovieThumbnail);
            mMovieThumbnail.setImageBitmap(null);
            mMovieThumbnail.setVisibility(View.INVISIBLE);
            mMovietitle.setVisibility(View.GONE);
        }

    }

    public void AddGridData(ArrayList<Movie> movies){
        MovieList.clear();
        MovieList.addAll(movies);
        notifyDataSetChanged();
    }

    public ArrayList<Movie> getMovies() {
        return MovieList;
    }

}
