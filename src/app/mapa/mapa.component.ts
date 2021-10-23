import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { escuelas } from 'src/assets/data/escuelas_list';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var mimapa = L.map('mapid').setView([-31.741975, -60.486567], 13);
    
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(mimapa);

    /*VAMOS A AGREGAR LOS PUNTOS AL MAPA*/
      
          // CREAMOS ICONO
          function createCustomIcon (_feature: any, latlng: L.LatLngExpression) {
            var myIconEsc = L.icon({
              iconUrl: '../../assets/img/esc_full_web.svg',
              iconSize: [30, 30], /*tamaño de lado por lado*/
              iconAnchor: [15, 20], /*posicion horizontal y vertical respectivamente: puede que al hacer zoom se vea desplazado, hay que tener cuidado.*/
              popupAnchor: [-3, -25],
              
              
          })
          return L.marker(latlng, { icon: myIconEsc })
        }
  
           
          // SE CREA UNA VARIABLE DE OPCIONES, QUE SE PASARÁ COMO SEGUNDO ARGUMENTO DESPUES.
         let myLayerOptions = {
          pointToLayer: createCustomIcon,
          onEachFeature: function (feature:any, layer:any) {
            layer.bindPopup('<h3>'+feature.properties.Nombre+'</h3><p>Dirección: '+feature.properties.Dirección+'</p>'+'<p>Gestión: '+feature.properties.Gestión+'</p>'+'<p>Descripción: '+feature.properties.Descripcion+'<p/>'+'<p>RRSS: <a href="'+feature.properties.RRSS+'">Visitar</a></p>'+'<p>Latitud: '+feature.properties.lat+' - Longitud: '+feature.properties.lng+'</p>');
          }
          }
        
  
          //--------- Creamos una variable y le asignamos el nombre del geojson importado.
          var newGeoJson: any = escuelas;
          L.geoJSON(newGeoJson, myLayerOptions).addTo(mimapa);

         /*Leyenda*/
              
        

       
  }

}
