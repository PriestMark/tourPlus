// console.log('clent side run');

// console.log(locations);

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwbWFya21pY2hhZWwiLCJhIjoiY2t6eXBsc2ZiMDJuODNkbzR3aDEwOGNqMyJ9.6xc9xpgXGPgsoCF3qhJOyQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapmarkmichael/ckzypxk2b009y14ngoy78d2mu',
    scrollZoom: false
    //   center: [-118, 34],
    //   zoom: 9,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 150,
      left: 100,
      bottom: 90,
      right: 100
    }
  });
};
