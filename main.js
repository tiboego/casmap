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

    // Maptiler Basemap    
    const key = 'QYPSkgz7HcsVUEGCFvbN';

    const mapTiler = new ol.layer.Tile({ 
        source: new ol.source.TileJSON({
        url: `https://api.maptiler.com/maps/basic-v2/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: 'anonymous'
        }),
	visible: true,
        title: 'mapTiler'
      });

// OSM Basemap
    const openstreetmapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: 'OSMStandard'
    });

    // Baselayer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            mapTiler, openstreetmapStandard
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
	
	// Vector layers styling
	const lineStyle = new ol.style.Stroke({
		color: [150, 150, 150, 1]
	})
	const fillStyle = new ol.style.Fill({
		color: [218, 218, 218, 1]
	})
	const strokeStyle = new ol.style.Stroke({
		color: [250, 161, 161, 1],
		width: 1.0
	})
	const circleStyle = new ol.style.Circle({
		fill: new ol.style.Fill({
			color: [245, 200, 5, 1]
		}),
		radius: 4,
		stroke: strokeStyle
	})

	// Vector layer 1	
	const TestGeoJSON = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://casgis.azurewebsites.net/geoserver/dtu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dtu%3Allyn_bygning_dtu_4326&outputFormat=application%2Fjson',
			format: new ol.format.GeoJSON()
		}),
		visible: true,
		title: 'Testgeojson',
		style: new ol.style.Style({
			fill: fillStyle,
			stroke: strokeStyle,
			image: circleStyle
		})
	})
	// Vector layer 2	
	const TestGeoJSON2 = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://casgis.azurewebsites.net/geoserver/dtu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dtu%3Aldtu_afloebskomponent&outputFormat=application%2Fjson',
			format: new ol.format.GeoJSON()
		}),
		visible: false,
		title: 'Testgeojson2',
		style: new ol.style.Style({
			fill: fillStyle,
			stroke: strokeStyle,
			image: circleStyle
		})
	})	

	// Vector layer 3	
	const TestGeoJSON3 = new ol.layer.VectorImage({
		source: new ol.source.Vector({
			url: 'https://casgis.azurewebsites.net/geoserver/dtu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dtu%3Aldtu_afloebsledning&outputFormat=application%2Fjson',
			format: new ol.format.GeoJSON()
		}),
		visible: false,
		title: 'Testgeojson3',
		style: new ol.style.Style({
			fill: fillStyle,
			stroke: lineStyle,
			image: circleStyle
		})
	})	

    // Layer Group
    const LayerGroup = new ol.layer.Group({
        layers: [
            TestGeoJSON, TestGeoJSON2, TestGeoJSON3
        ]
    });

    map.addLayer(LayerGroup);
}
