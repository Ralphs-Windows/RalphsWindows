/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global apiclient, idsala, Stomp */

var api=apiclient;
juegoApp=(function (){
    var stompClient;
    var idsala;
    var eq;
    var posx;
    var posy;
    var mirada=0;
    var dir;
    var num;
    var h=70;
    var w=55;
    var vh=51;
    var vw=82;
    var mapanew;
    function ventana(xp,yp,srcc,ctx){
        var img = new Image();
        img.src = srcc;
        img.onload = function () {
            ctx.drawImage(img,xp, yp,vh,vw);
        };
        
    }
    function map(mapa) {
        var vx=0;
        var vy=0;
        var canvas = document.getElementById("ventanas");
        var ctx = canvas.getContext("2d");
        for (var i = 0; i < mapa.length; i++) {
            vx=0;
            for (var j = 0; j < mapa[i].length; j++) {
                new ventana(vx,vy, "/img/ventana"+mapa[i][j].estado+"/"+mapa[i][j].num+".png",ctx);
                mapa[i][j].ubicacion.xpos=vx;
                mapa[i][j].ubicacion.ypos=vy;
                mapa[i][j].ubicacion.alto=82;
                mapa[i][j].ubicacion.ancho=51;
                vx+=Math.round(canvas.width/mapa[j].length);
            }
            vy+=Math.round(canvas.height/mapa.length);
        }
    }
    
    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS("/stompendpoint");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/topic/juego/mover."+idsala, function (data) {
                var felixs=JSON.parse(data.body);
                var canvas = document.getElementById("pjs");
                canvas.width=canvas.width;canvas.height=canvas.height;
                felixs.map(function (f){
                    new felix(f.ubicacion.xpos,f.ubicacion.ypos,w,h,"img/personajes/felix"+f.eq+f.dir+".png");
                });
                
            });
            stompClient.subscribe("/topic/juego/reparar."+idsala, function (data) {
                var ventanas=JSON.parse(data.body);
                var canvas = document.getElementById("ventanas");
                canvas.width=canvas.width;canvas.height=canvas.height;
                map(ventanas);
            });
            stompClient.subscribe("/topic/juego/informacion."+idsala+"/eq."+eq, function (data) {
                var info=JSON.parse(data.body);
                alert(info);
                
            });
             stompClient.subscribe("/topic/juego/estadojuego."+idsala, function (data) {
                var terminado=JSON.parse(data.body);
                if(terminado){
                    alert("fin del juego");
                }
            });
            felixinitial();
        });
        
    };
    
    function felix(xp,yp,h,w,srcc){
        var canvas = document.getElementById("pjs");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src =srcc;
        img.onload = function () {
            ctx.drawImage(img,xp,yp,h,w);
        };
    }
    function felixinitial() {
        var canvas = document.getElementById("pjs");
        if(eq==="1"){
            posx=0;dir="R";
            posy=canvas.height - h;
        }else if(eq==="2"){
            posx=canvas.width - w;dir="L";
            posy=canvas.height - h;
        }
        pos();
    }
    var pos=function () {
        if(mirada>3){mirada=0;}
        stompClient.send("/app/juego/mover."+idsala,{},JSON.stringify({"ubicacion":{"xpos":posx,"ypos":posy,"ancho":w,"alto":h},"eq":eq,"dir":dir+mirada,"num":num}));
    };
    var repare = function (){
        stompClient.send("/app/juego/reparar."+idsala,{},JSON.stringify({"ubicacion":{"xpos":posx,"ypos":posy,"ancho":w,"alto":h},"eq":eq,"dir":dir+mirada,"num":num}));
    };
    return{
        init: function () {
            eq=sessionStorage.getItem('eq');
            num=sessionStorage.getItem('num');
            idsala=sessionStorage.getItem('idroom');
            connectAndSubscribe();
            $(document).keydown(function (event) {
                var keypress=event.keyCode;
                /*repare*/
                if(keypress===77){
                    repare();
                }
                /*iz*/
                else if(keypress===37){
                    posx-=8;mirada+=1;dir="L";
                    pos();
                }
                /*up*/
                else if(keypress===38){
                    posy-=h;mirada=3;
                    pos();
                }
                /*der*/
                else if(keypress===39){
                    posx+=8;mirada+=1;dir="R";
                    pos();
                }
                /*down*/
                else if(keypress===40){
                    posy+=h;mirada=3;
                    pos();
                }
            });
            api.getMapa(idsala,function(mapa){mapanew=mapa;map(mapa.ventanas);}).then(function(){api.setMapa(idsala,mapanew);});
        }
    };
})();

