package edu.eci.arsw.RalphWindows.controller;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import edu.eci.arsw.RalphWindows.model.Felix;
import edu.eci.arsw.RalphWindows.services.RalphWindowsService;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Laura RB
 */
@Controller
public class RalphSTOMPMessagesHandlerController{

    @Autowired
    SimpMessagingTemplate msgt;
    @Autowired
    RalphWindowsService services;
    
    ConcurrentHashMap<String,ConcurrentLinkedQueue<String>> idrooms=new ConcurrentHashMap<>();
    @MessageMapping("/mover.{idsala}")
    public void mover(@DestinationVariable String idsala,Felix f) throws Exception {
        msgt.convertAndSend("/topic/juego/mover."+idsala,f);
    }
    
    @MessageMapping("/room.{id}")
    public void getSalas(@DestinationVariable String id,String name) throws Exception {
        System.err.println("nuevo usuario suscrito a la sala "+ id);
        if (!idrooms.containsKey(id)) {
            idrooms.put(id, new ConcurrentLinkedQueue<>());
        }
        idrooms.get(id).add(name);
        synchronized(msgt){
            msgt.convertAndSend("/topic/room."+id,idrooms.get(id));
            if (idrooms.get(id).size()== 2) {
                msgt.convertAndSend("/topic/newpartida."+id, idrooms.get(id));
                idrooms.remove(id);
            }
        }
    }
}