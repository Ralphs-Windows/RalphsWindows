/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global apiclient, idsala, Stomp */

var api=apiclient;
juegoApp=(function (){
    var vx=10;
    var vy=0;
    var stompClient;
    var idsala;
    var eq;
    var posx;
    var posy;
    var h=55;
    var w=70;
    var mirada=0;
    var updatem=[];
    function ventana(tupla,val){
        var canvas = document.getElementById("ventanas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "/img/ventana"+tupla.estado+"/"+Math.floor((Math.random()*3))+".png";
        img.onload = function () {
            tupla.ubicacion.xpos=vx;
            tupla.ubicacion.ypos=vy;
            tupla.ubicacion.ancho=img.width;
            tupla.ubicacion.alto=img.height;
            ctx.drawImage(img,vx, vy);
            vx+=canvas.width/5;
            if(val){
                vy+=img.height;
                vx=0;
            }
        };
        return tupla;
    }
    function map(mapa) {
        for (var i = 0; i < mapa.length; i++) {
            for (var j = 0; j < mapa[i].length; j++) {
                ventana(mapa[i][j], j === mapa[i].length - 1);
            }
        }
    }
    function mapinitial(mapa) {
        for (var i = 0; i < mapa.length; i++) {
            var lista= [];
            for (var j = 0; j < mapa[i].length; j++) {
                lista[j]=ventana(mapa[i][j], j === mapa[i].length - 1);
            }
            updatem[i]=lista;
        }
        
    }
    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS("/stompendpoint");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic/juego/mover."+idsala, function (data) {
                var a=JSON.parse(data.body);
                var canvas = document.getElementById("pjs");
                canvas.width=canvas.width;canvas.height=canvas.height;
                felix(a.ubicacion,a.eq,a.dir);
                
            });
            stompClient.subscribe("/topic/juego/reparar."+idsala, function (data) {
                var ventanas=JSON.parse(data.body);
                var canvas = document.getElementById("ventanas");
                canvas.width=canvas.width;canvas.height=canvas.height;
                map(ventanas);
            });
            stompClient.subscribe("/topic/juego/."+idsala, function (data) {
                map(JSON.parse(data.body));
            });
            
        });
    };
    function felix(ubicacion,eq,mirada){
        var canvas = document.getElementById("pjs");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        if (eq === "1") {
            img.src = "/img/personajes/felix1"+mirada+".png";
        } else if(eq==="2") {
            img.src = "/img/personajes/felix"+mirada+".png";
        }
        img.onload = function () {
            ctx.drawImage(img,ubicacion.xpos,ubicacion.ypos,ubicacion.alto,ubicacion.ancho);
        };
    }
    function felixinitial() {
        var canvas = document.getElementById("pjs");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        var img2 = new Image();
        img.src = "/img/personajes/felix1R" + mirada + ".png";
        img2.src = "/img/personajes/felixL" + mirada + ".png";
        img.onload = function () {
            ctx.drawImage(img, 0, canvas.height - w, h, w);
        };
        img2.onload = function () {
            ctx.drawImage(img2, canvas.width - h, canvas.height - w, h, w);
        };
    }
    return{
        init:function(){
            eq=sessionStorage.getItem('eq');
            idsala=sessionStorage.getItem('idroom');
            $(document).keydown(function (event) {
                var keypress=event.keyCode;
                /*repare*/
                if(keypress===77){
                    
                }
                /*der*/
                else if(keypress===37){
                    posx+=10;mirada+=1;
                    stompClient.send("/topic/juego/mover."+idsala,{},JSON.stringify({"ubicacion":{"xpos":posx,"ypos":posy,"ancho":w,"alto":h},"eq":eq,"dir":"R"+mirada}));
                }
                /*up*/
                else if(keypress===38){
                    posy-=10;mirada=0;
                    stompClient.send("/topic/juego/mover."+idsala,{},JSON.stringify({"ubicacion":{"xpos":posx,"ypos":posy,"ancho":w,"alto":h},"eq":eq,"dir":"R"+mirada}));
                }
                /*iz*/
                else if(keypress===39){
                    posx-=10;mirada-=1;
                    stompClient.send("/topic/juego/mover."+idsala,{},JSON.stringify({"ubicacion":{"xpos":posx,"ypos":posy,"ancho":w,"alto":h},"eq":eq,"dir":"L"+mirada}));
                }
                /*down*/
                else if(keypress===40){
                    posy+=10;mirada=0;
                    stompClient.send("/topic/juego/mover."+idsala,{},JSON.stringify({"ubicacion":{"xpos":posx,"ypos":posy,"ancho":w,"alto":h},"eq":eq,"dir":"R"+mirada}));
                }
            });
            api.getMapa(idsala,mapinitial).then(function(){api.setMapa(idsala,updatem);});
            felixinitial();
            connectAndSubscribe();
        }
    };
})();
