import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild('myMap') myMap;


  constructor() { }

  ngOnInit() {
    setTimeout(async () => {
      await this.cargarMapa();
      await this.pintarUbicacionActual();
    }, 200);

  }

  ngAfterViewInit() {

  }

  getCurrentLocation: () => Promise<Position> = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position);
      }, positionError => {
        reject(positionError);
      });
    });
  }

  pintarUbicacionActual: () => Promise<void> = async () => {
    try {
      var currentLoc = await this.getCurrentLocation();
      console.info(currentLoc);
    } catch (error) {
      console.error(error);
    }
  }

  cargarMapa() {
    var mapa = document.getElementById('myMap');
    var map = new Microsoft.Maps.Map(mapa, {
      credentials: 'AmCGuxbB5024rje8eYxV5934ktMcR6_YqIGBQ8qJETu15KBzSskcYGCQBlsmgLrm',
      center: new Microsoft.Maps.Location(14.6232399, -90.51997659999999),
      // center: mapLocation,
      mapTypeId: Microsoft.Maps.MapTypeId.aerial,
      zoom: 15
    });
    
    //Add your post map load code here.
    var center = map.getCenter();
    var Events = Microsoft.Maps.Events;
    var Location = Microsoft.Maps.Location;
    var Pushpin = Microsoft.Maps.Pushpin;
    var pins = [
      new Pushpin(new Location(14.6232399, -90.51997659999999), {
        color: '#0f0',
        draggable: true,
        icon: "./assets/logo/puntero.png",
        anchor: new Microsoft.Maps.Point(12, .9)
      }),
    ];

    map.entities.push(pins);
    // Binding the events for the green pin
    Events.addHandler(pins[0], 'drag', function () {
      console.log('se esta arrastrando');
    });
    Events.addHandler(pins[0], 'dragend', function () {
      console.log('Se termino se mover');
      console.log(pins[0].getLocation());
    });
    Events.addHandler(pins[0], 'dragstart', function () {
      console.log('se inicia a mover');
    });

    var polygon = new Microsoft.Maps.Polygon(
      //  {
      //   visible:false
      // },

      [
        //Latitud, Longitud
        new Microsoft.Maps.Location(14.607973, -90.527319),
        new Microsoft.Maps.Location(14.621428, -90.507578),
        new Microsoft.Maps.Location(14.604485, -90.501742),
        new Microsoft.Maps.Location(14.604000, -90.560000),
        new Microsoft.Maps.Location(14.618207, -90.525245),
        new Microsoft.Maps.Location(14.6232399, -90.51997659999999)
      ],
      {
        visible: true
      },
    );
    map.entities.push(polygon);
  }


}
