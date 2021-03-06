/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.RalphWindows.model;

import java.awt.Rectangle;


/*
 */
public class Ubicacion{
    private int xpos, ypos, ancho, alto;
    private Rectangle rectangulo;

    public Ubicacion(int x, int y, int width, int height) {
        xpos = y;
        ypos = x;
        ancho = width;
        alto = height;
        rectangulo=new Rectangle(x,y,width,height);
    }
    public Ubicacion(){}
    
    public boolean colision(int x, int y, int width, int height) {
        Rectangle temp = new Rectangle(x,y,width,height);
        boolean tmp = rectangulo.intersects(temp);
        return tmp;
    }
    /**
     * obtener posicion en x
     * @return 
     */
    public int getXpos() {
        return xpos;
    }
    /**
     * cambiar posicion en x
     * @param xpos
     */
    public void setXpos(int xpos) {
        this.xpos = xpos;
        rectangulo=new Rectangle(xpos,ypos,ancho,alto);
    }
   /**
     * obtener posicion en y
     * @return 
     */
    public int getYpos() {
        return ypos;
    }
    /**
     * cambiar posicion en y
     * @param ypos
     */
    public void setYpos(int ypos) {
        this.ypos = ypos;
        rectangulo=new Rectangle(xpos,this.ypos,ancho,alto);
    }
    /**
     * obtener  ancho
     * @return 
     */
    public int getAncho() {
        return ancho;
    }
    /**
     * cambiar el ancho
     * @param ancho
     */
    public void setAncho(int ancho) {
        this.ancho = ancho;
        rectangulo=new Rectangle(xpos,ypos,this.ancho,alto);
    }
    /**
     * cambiar el alto
     * @return 
     */
    public int getAlto() {
        return alto;
    }
    
    /**
     * cambiar el alto
     * @param alto
     */
    public void setAlto(int alto) {
        this.alto = alto;
        rectangulo=new Rectangle(xpos,ypos,ancho,this.alto);
    }
    
    /*obtener string de la clase
     */
    @Override
    public String toString(){
        return "{"+xpos+","+ypos+","+alto+","+ancho+"}";
    }
}
