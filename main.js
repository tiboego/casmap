window.onload = init;

function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: [1393877.0335512445, 7515863.043091829],
            zoom: 15,
            maxZoom: 22,
            minZoom:  6,
            // rotation: -0.30,
        }),
        target: 'js-map'
    });

    // OSM Basemap
    const openstreetmapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: 'OSMStandard'
    });

    // Maptiler Basemap    
    const key = 'QYPSkgz7HcsVUEGCFvbN';

    const mapTiler = new ol.layer.Tile({ 
        source: new ol.source.TileJSON({
        url: `https://api.maptiler.com/maps/basic-v2/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: 'anonymous',
        visible: true,
        title: 'mapTiler'
        })
      });

    

    // Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openstreetmapStandard, mapTiler
        ]
    });

    map.addLayer(baseLayerGroup);

}