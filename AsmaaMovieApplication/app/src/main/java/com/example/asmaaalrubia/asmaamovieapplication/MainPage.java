package com.example.asmaaalrubia.asmaamovieapplication;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import com.example.asmaaalrubia.asmaamovieapplication.utilities.NetworkUtilities;
import java.io.IOException;
import java.util.ArrayList;
import butterknife.BindView;

public class MainPage extends AppCompatActivity {

    private static final String TAG = MainPage.class.getSimpleName();

    String myAPIkey = "cc8440f48408a213fb4d3600d8e696f0";

  //  public static final String LatestMoviesURL = "https://api.themoviedb.org/3/movie/latest?api_key=cc8440f48408a213fb4d3600d8e696f0&language=en-US";
  // public static final String LatestMoviesURL = "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cc8440f48408a213fb4d3600d8e696f0";
    @BindView(R.id.recycled_movie_grid)
    RecyclerView movie_grid_recyclerView;

    String LatestMoviesURL;

   // String MyFavoriteMoviesURL;

    ArrayList<Movie> LatestMoviesList;
  //  ArrayList<Movie> MyFavoriteMoviesList;

    private MovieAdapter adapter;

    private String moviesSortedBy = FetchMovies.LATEST;


    // GridView gridView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_page);

        LinearLayoutManager layoutManager = new LinearLayoutManager(MainPage.this);
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);

     //   movie_grid_recyclerView.setLayoutManager(new LinearLayoutManager(this));

        movie_grid_recyclerView.setLayoutManager(layoutManager);

        adapter = new MovieAdapter(new ArrayList<Movie>());
        movie_grid_recyclerView.setAdapter(adapter);

      //  gridView = findViewById(R.id.movies_grid);
      //  LatestMoviesList = new ArrayList<>();
        //adapter = new MovieAdapter(this,R.layout.layout_grid_item, LatestMoviesList);

      //  gridView.setOnItemClickListener({});

        if(NetworkUtilities.networkStatus(MainPage.this)){
            new FetchMovies().execute();
        }else{
            AlertDialog.Builder dialog = new AlertDialog.Builder(MainPage.this);
            dialog.setTitle(getString(R.string.title_network_alert));
            dialog.setMessage(getString(R.string.message_network_alert));
            dialog.setCancelable(false);
            dialog.show();
        }
    }
    @Override
    protected void onStart() {
        super.onStart();

    }

    @Override
    protected void onResume(){
        super.onResume();

    }
    //AsyncTask
    public class FetchMovies extends AsyncTask<Void,Void,Void> {

        public final static String LATEST = "latest";
        public final static String FAVORITES = "favorites";

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected Void doInBackground(Void... voids) {

            LatestMoviesURL = "https://api.themoviedb.org/3/movie/popular?api_key="+myAPIkey+"&language=en-US";
            LatestMoviesList = new ArrayList<>();

            try{
                if(NetworkUtilities.networkStatus(MainPage.this)){
                    LatestMoviesList = NetworkUtilities.fetchData(LatestMoviesURL);
                }else{
                    AlertDialog.Builder dialog = new AlertDialog.Builder(MainPage.this);
                    dialog.setTitle(getString(R.string.title_network_alert));
                    dialog.setMessage(getString(R.string.message_network_alert));
                    dialog.setCancelable(false);
                    dialog.show();                }            }
            catch (IOException e){
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void  s) {
            super.onPostExecute(s);
            adapter = new MovieAdapter(new ArrayList<Movie>());
            adapter.AddGridData(LatestMoviesList);
            movie_grid_recyclerView.setAdapter(adapter);
        }
    }
}
