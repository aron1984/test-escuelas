import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


import { escuelas } from 'src/assets/data/escuelas_list';
import { departamentos } from '../../assets/data/departamentos';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //********** 1° AÑADIMOS LOS MARCADORES ********** */

    
          /* CREAMOS ICONO*/
          function createCustomIcon (_feature: any, latlng: L.LatLngExpression) {
            var myIconEsc = L.icon({
              iconUrl: '../../assets/img/esc_full_web.svg',
              iconSize: [30, 30], 
              iconAnchor: [15, 20], 
              popupAnchor: [-3, -25],
              
                })
              return L.marker(latlng, { icon: myIconEsc });
          }
                         
          // SE CREA UNA VARIABLE DE OPCIONES, QUE SE PASARÁ COMO SEGUNDO ARGUMENTO DESPUES.
          let myLayerOptions = {
          
          pointToLayer: createCustomIcon,
          onEachFeature: function (feature:any, layer:any) {
      
            layer.bindPopup('<div class="infoPopUp"><h3>'+feature.properties.Nombre+'</h3><p>Dirección: '+feature.properties.Dirección+'</p><p>Teléfono: '+feature.properties.Teléfono+'</p>'+'<p>Gestión: '+feature.properties.Gestión+'</p>'+'<p>Descripción: '+feature.properties.Descripcion+'<p/>'+'<p>RRSS: <a href="'+feature.properties.RRSS+'">Visitar</a></p>'+'<p>Latitud: '+feature.properties.lat+' - Longitud: '+feature.properties.lng+'</p></div>');
          }
          }
        
      
          //--------- Creamos una variable y le asignamos el nombre del geojson importado.
          
          var newGeoJson: any = escuelas;
          var educacion = L.geoJSON(newGeoJson, myLayerOptions);/*.addTo(map);*/
      
          //--------- Agregamos los departamentos ----------//
          
          var departamentosGeoJson: any = departamentos;
          var deptos = L.geoJSON(departamentosGeoJson);/*.addTo(map);*/

          var lugares = L.layerGroup([educacion]);

          var lugares2 = L.layerGroup([deptos]);

          //********** 2° AÑADIMOS LOS MAPA BASE *********** */

          // ======= Light Map ======= //
          var light_map = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            });
            
            /*light_map.addTo(map);*/

            // ======= Dark Map ======= //

            var dark_map = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
            });

            //dark_map.addTo(map);

            //**********3° SETEAMOS EL MAP ************ */

            var map = L.map('map', {
              center: [-31.741975, -59.086567],
              zoom: 8,
              layers: [light_map, lugares]
            });

             /************4° AÑADIMOS BASEMAP Y OVERLAY ********* */

            var baseMaps = {
              "Claro": light_map,
              "Oscuro": dark_map
            };
              
            var overlayMaps = {
                "Escuelas": lugares,
                "Departamentos": lugares2
            };

            /************5° AÑADIMOS LAS CAPAS AL MAPA ******** */

            L.control.layers(baseMaps, overlayMaps).addTo(map);
    
    
       
   
    

    
          
    /*--------- Layer group --------------------------*/           
         
       
        
  }

}
