import { Component, OnInit } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import {  NavController } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage {
  options : GeolocationOptions;
  currentPos : Geoposition;
  places : Array<any> ;
  constructor(public navCtrl: NavController,private geolocation : Geolocation) { }
  getUserPosition(){
      this.options = {
          enableHighAccuracy : true
      };

      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

          this.currentPos = pos;      
          console.log(pos);

      },(err : PositionError)=>{
          console.log("error : " + err.message);
      });
  }
  ionViewDidEnter(){
    this.getUserPosition();
  }   
}
//   getRestaurants(latLng)
//   {
//       var service = new google.maps.places.PlacesService(this.map);
//       let request = {
//           location : latLng,
//           radius : 8047 ,
//           types: ["library"]
//       };
//       return new Promise((resolve,reject)=>{
//           service.nearbySearch(request,function(results,status){
//               if(status === google.maps.places.PlacesServiceStatus.OK)
//               {
//                   resolve(results);    
//               }else
//               {
//                   reject(status);
//               }

//           }); 
//       });

//   }
//   createMarker(place)
//   {
//       let marker = new google.maps.Marker({
//       map: this.map,
//       animation: google.maps.Animation.DROP,
//       position: place.geometry.location
//       });   
//   }  
//   addMap(lat,long){

//     let latLng = new google.maps.LatLng(lat, long);

//     let mapOptions = {
//     center: latLng,
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//     }

//     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

//     this.getRestaurants(latLng).then((results : Array<any>)=>{
//         this.places = results;
//         for(let i = 0 ;i < results.length ; i++)
//         {
//             this.createMarker(results[i]);
//         }
//     },(status)=>console.log(status));

//     this.addMarker();

// }
// }
