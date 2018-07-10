package com.example.asmaaalrubia.asmaamovieapplication.utilities;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import com.example.asmaaalrubia.asmaamovieapplication.Movie;
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class NetworkUtilities {

        private static final String TAG = com.example.asmaaalrubia.asmaamovieapplication.utilities.NetworkUtilities.class.getSimpleName();

        public static ArrayList<Movie> fetchData(String url) throws IOException {
            ArrayList<Movie> movies = new ArrayList<Movie>();
            try {

                URL new_url = new URL(url); //create a url from a String
                HttpURLConnection connection = (HttpURLConnection) new_url.openConnection(); //Opening a http connection  to the remote object
                connection.connect();

                InputStream inputStream = connection.getInputStream(); //reading from the object
                String results = IOUtils.toString(inputStream);  //IOUtils to convert inputstream objects into Strings type
                parseJson(results,movies);
                inputStream.close();

            } catch (IOException e) {
                e.printStackTrace();
            }

            return movies;
        }

        public static void parseJson(String data, ArrayList<Movie> list){

            try {
                JSONObject mainObject = new JSONObject(data);
                Log.v(TAG,mainObject.toString());
                JSONArray resultsArray = mainObject.getJSONArray("results"); //Getting the results object
                for (int i = 0; i < resultsArray.length(); i++) {
                    JSONObject jsonObject = resultsArray.getJSONObject(i);
                    Movie movie = new Movie(); //New Movie object
                    movie.setID(jsonObject.getInt("id"));
                    movie.setMovieName(jsonObject.getString("title"));
                    movie.setMovieDescription(jsonObject.getString("overview"));
                    movie.setPoster(jsonObject.getString("poster_path"));

                    /*JSONArray genresList = jsonObject.getJSONArray("genres");
                    String genres = "";
                    for (int index=0; index<genresList.length(); index++){
                        genres = genres +' '+ genresList.getString(index);
                    }
                    movie.setGenres(genres);*/
                    //Adding a new movie object into ArrayList
                    list.add(movie);
                }
            } catch (JSONException e) {
                e.printStackTrace();
                Log.e(TAG, "Error occurred during JSON Parsing", e);
            }
        }

        public static Boolean networkStatus(Context context){
            ConnectivityManager manager = (ConnectivityManager)
                     context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = manager.getActiveNetworkInfo();
            if (networkInfo != null && networkInfo.isConnected()){
            return true;
            }
            return false;
        }

}

