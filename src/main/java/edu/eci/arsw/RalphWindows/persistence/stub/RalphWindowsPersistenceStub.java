/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.RalphWindows.persistence.stub;

import edu.eci.arsw.RalphWindows.model.Jugador;
import edu.eci.arsw.RalphWindows.model.Mapa;
import edu.eci.arsw.RalphWindows.model.SalaJuego;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;
import org.springframework.stereotype.Service;

/**
 *
 * @author laura
 */
@Service
public class RalphWindowsPersistenceStub implements RalphWindowsPersistence {

    private final ConcurrentHashMap<Integer, SalaJuego> DatosSalas;
    private int sala = 0;

    public RalphWindowsPersistenceStub() {
        DatosSalas = new ConcurrentHashMap<>();
        DatosSalas.put(0, new SalaJuego());
    }

    @Override
    public Mapa getMapajuego(int juegonum) throws RalphWindowsPersistenceException {
        return DatosSalas.get(juegonum).getMapaJuego();
    }
    
    @Override
    public void setMapajuego(int juegonum, Mapa m) {
        DatosSalas.get(juegonum).setMapaJuego(m);
    }
    
    @Override
    public void registrarJugadorEquipoFelix1(int juegonum, Jugador p) throws RalphWindowsPersistenceException {
        DatosSalas.get(juegonum).getEquipo1().add(p);

    }

    @Override
    public void registrarJugadorEquipoFelix2(int juegonum, Jugador p) throws RalphWindowsPersistenceException {
        DatosSalas.get(juegonum).getEquipo2().add(p);
    }

    @Override
    public ConcurrentLinkedDeque getEquipoFelix1(int juegonum) throws RalphWindowsPersistenceException {
        return DatosSalas.get(juegonum).getEquipo1();
    }

    @Override
    public ConcurrentLinkedDeque getEquipoFelix2(int juegonum) throws RalphWindowsPersistenceException {
        return DatosSalas.get(juegonum).getEquipo2();

    }

    @Override
    public int getSalaDisponible() throws RalphWindowsPersistenceException {
        return sala;
    }

    @Override
    public void setSalaDisponible(int sala) throws RalphWindowsPersistenceException {
        DatosSalas.put(sala, new SalaJuego());
        this.sala = sala;
    }

    @Override
    public SalaJuego getSalas(int id) throws RalphWindowsPersistenceException {
        return DatosSalas.get(id);
    }
}
