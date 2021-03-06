/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.RalphWindows.services;

import edu.eci.arsw.RalphWindows.model.Jugador;
import edu.eci.arsw.RalphWindows.model.Mapa;
import edu.eci.arsw.RalphWindows.persistence.stub.RalphWindowsPersistence;
import edu.eci.arsw.RalphWindows.persistence.stub.RalphWindowsPersistenceException;
import java.util.concurrent.ConcurrentLinkedDeque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author laura
 */
@Service
public class RalphWindowsService {

    @Autowired
    RalphWindowsPersistence ralphpersistence = null;

    public Mapa getMapajuego(int juegonum) throws RalphWindowsPersistenceException {
        return ralphpersistence.getMapajuego(juegonum);
    }
    public void setMapajuego(int juegonum,Mapa mp) throws RalphWindowsPersistenceException {
        ralphpersistence.setMapajuego(juegonum,mp);
    }
    public ConcurrentLinkedDeque getEquipoFelix1(int juegonum) throws RalphWindowsPersistenceException {
        return ralphpersistence.getEquipoFelix1(juegonum);
    }

    public ConcurrentLinkedDeque getEquipoFelix2(int juegonum) throws RalphWindowsPersistenceException {
        return ralphpersistence.getEquipoFelix2(juegonum);
    }

    public void registrarJugadorFelix1(int juegonum, Jugador p) throws RalphWindowsPersistenceException {
        ralphpersistence.registrarJugadorEquipoFelix1(juegonum, p);
    }

    public void registrarJugadorFelix2(int juegonum, Jugador p) throws RalphWindowsPersistenceException {
        ralphpersistence.registrarJugadorEquipoFelix2(juegonum, p);
    }
    
    public int getSalaDisponible() throws RalphWindowsPersistenceException {
        return ralphpersistence.getSalaDisponible();
    }
    
    public void setSalaDisponible(int sala) throws RalphWindowsPersistenceException {
        ralphpersistence.setSalaDisponible(sala);

    }

}
