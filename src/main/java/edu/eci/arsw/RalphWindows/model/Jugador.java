/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.RalphWindows.model;

/**
 *
 * @author laura
 */
public class Jugador {
    String username;
    /**
     * 
     * @param nombre 
     */
    public Jugador(String nombre){
        this.username=nombre;
    }
    /**
     * 
     */
    public Jugador(){
        username="";
    }
    /**
     * 
     * @return 
     */
    public String getUsername() {
        return username;
    }
    /**
     * 
     * @param nombre
     */
    public void setUsername (String nombre){
        username=nombre;
    }
    
}
