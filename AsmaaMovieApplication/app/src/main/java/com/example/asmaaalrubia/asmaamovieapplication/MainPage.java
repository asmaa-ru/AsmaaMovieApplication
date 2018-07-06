package com.example.asmaaalrubia.asmaamovieapplication;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import butterknife.BindView;
import butterknife.ButterKnife;
import android.widget.ProgressBar;
import android.widget.Toast;
import com.example.asmaaalrubia.asmaamovieapplication.utilities.NetworkUtilities;
import java.io.IOException;
import java.util.ArrayList;

public class MainPage extends AppCompatActivity {

    @BindView(R.id.indeterminateBar)
    ProgressBar mProgressBar;

    String LatestMoviesURL;
    String MyFavoriteMoviesURL;

    ArrayList<Movie> LatestMoviesList;
    ArrayList<Movie> MyFavoriteMoviesList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_page);
        ButterKnife.bind(this);
        mProgressBar.setVisibility(View.INVISIBLE); //Hide Progressbar by Default
        new FetchMovies().execute(); //New code
    }

    //AsyncTask
    public class FetchMovies extends AsyncTask<Void,Void,Void> {

        @Override
        protected Void doInBackground(Void... voids) {

            LatestMoviesURL = "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc8440f48408a213fb4d3600d8e696f0";
            MyFavoriteMoviesURL = "http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=cc8440f48408a213fb4d3600d8e696f0";
//https://api.themoviedb.org/3/movie/latest?api_key=cc8440f48408a213fb4d3600d8e696f0&language=en-US
            LatestMoviesList = new ArrayList<>();
            MyFavoriteMoviesList = new ArrayList<>();

            try {
                if(NetworkUtilities.networkStatus(MainPage.this)){
                    LatestMoviesList = NetworkUtilities.fetchData(LatestMoviesURL);
                    MyFavoriteMoviesList = NetworkUtilities.fetchData(MyFavoriteMoviesURL);
                }else{
                    Toast.makeText(MainPage.this,"No Internet Connection", Toast.LENGTH_LONG).show();
                }
            } catch (IOException e){
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            mProgressBar.setVisibility(View.VISIBLE);
        }

        @Override
        protected void onPostExecute(Void  s) {
            super.onPostExecute(s);
            mProgressBar.setVisibility(View.INVISIBLE);
        }
    }
}
