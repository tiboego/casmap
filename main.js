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
        visible: true,
        title: 'OSMStandard'
    });

    // Maptiler Basemap    
    const key = 'QYPSkgz7HcsVUEGCFvbN';

    const mapTiler = new ol.layer.Tile({ 
        source: new ol.source.TileJSON({
        url: `https://api.maptiler.com/maps/basic-v2/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: 'anonymous'
        }),
		visible: false,
        title: 'mapTiler'
      });
    

    // Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openstreetmapStandard, mapTiler
        ]
    });

    map.addLayer(baseLayerGroup);

	// Layer Switcher
	const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
	for(let baseLayerElement of baseLayerElements){
		baseLayerElement.addEventListener('change', function(){
			let baseLayerElementValue = this.value;
			baseLayerGroup.getLayers().forEach(function(element, index, array){
				let baseLayerTitle = element.get('title');
				element.setVisible(baseLayerTitle === baseLayerElementValue);
		})
		})
	}
	
	// Vector layers
	// const TestGeoJSON = new ol.layer.VectorImage({
	// 	source: new ol.source.Vector({
	// 		url: './data/map.geojson',
	// 		format: new ol.format.GeoJSON()
	// 	}),
	// 	visible: true,
	// 	title: 'Testgeojson'
	// })
	//map.addLayer(TestGeoJSON);
	
		const casgeoGeoJSON = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'http://gisdata.cas.dtu.dk:8080/geoserver/dtu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dtu%3Allyn_parkering_sensade&outputFormat=application/json',
			format: new ol.format.GeoJSON()
		}),
		visible: true,
		title: 'CASTestgeojson'
	})
	map.addLayer(casgeoGeoJSON);
	
}
