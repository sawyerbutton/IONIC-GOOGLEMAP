import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation} from "@ionic-native/geolocation";

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  public map:any;
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  public loadMap(){
    this.geolocation.getCurrentPosition().then((data)=>{
      let latLng = new google.maps.LatLng(data.coords.latitude,data.coords.longitude );
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    },(err)=>{
      console.log(err);
    })
  }

  public addMarker(){
    let marker = new google.maps.Marker({
      map:this.map,
      animation:google.maps.Animation.DROP,
      position:this.map.getCenter()
    });
    let content = "<h4>Your Location!</h4>";
    this.addInfoWindow(marker,content);
  }

  public addInfoWindow(marker,content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
