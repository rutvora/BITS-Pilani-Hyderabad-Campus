/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
	selector: 'app-travel',
	templateUrl: './travel.page.html',
	styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
	geocoder: any;
	GoogleAutocomplete: any;
	autocomplete: any;
	autocompleteItems: any;

	constructor(public zone: NgZone) {
		this.geocoder = new google.maps.Geocoder
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
	}

	ngOnInit() {
	}

	updateSearchResults() {
		if (this.autocomplete.input == '') {
			this.autocompleteItems = [];
			return;
		}
		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
			(predictions, status) => {
				this.autocompleteItems = [];
				this.zone.run(() => {
					predictions.forEach((prediction) => {
						this.autocompleteItems.push(prediction);
					});
				});
			});
	}

	selectSearchResult(item){
		this.autocompleteItems = [];
		this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
			if(status === 'OK' && results[0]){
				console.log(results[0].geometry.location.toString().replace(/\(|\)/g, ''));
			}
		})
	}
}
}


