package com.example.asmaaalrubia.asmaamovieapplication;

import java.io.Serializable;
import java.util.ArrayList;

public class Movie implements Serializable {

    private int ID;
    private String MovieName;
    private String Poster;
    private String MovieDescription;
    // private ArrayList<String> Genres;
    private String Genres;


    public int getID() {
        return ID;
    }

    public void setID(int id) {
        this.ID = id;
    }

    public String getMovieName() {
        return MovieName;
    }

    public void setMovieName(String movieName) {
        MovieName = movieName;
    }

    public String getPoster() {
        return Poster;
    }

    public void setPoster(String poster) {
        Poster = poster;
    }

    public String getMovieDescription() {
        return MovieDescription;
    }

    public void setMovieDescription(String movieDescription) {
        MovieDescription = movieDescription;
    }
/*
    public ArrayList<String> getGenres() {
        return Genres;
    }

    public void setGenres(ArrayList<String> genres) {
        Genres = genres;
    }
*/
    public String getGenres() {
        return Genres;
    }

    public void setGenres(String genres) {
        Genres = genres;
    }
}
