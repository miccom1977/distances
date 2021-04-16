var mapa;
var punkt;
function pokazMape()
{
if (GBrowserIsCompatible()) 
{
	mapa = new GMap2(document.getElementById("mapa"));
   punkt = new GLatLng(50.124749, 19.042480);
	mapa.setCenter(punkt,8);
	mapa.setUIToDefault();
	var znacznik = new GMarker(punkt);
	GEvent.addListener(znacznik, "mouseover", function() {
		znacznik.openInfoWindowHtml("Stąd Wyruszamy!");
	});
	mapa.addOverlay(znacznik);
}
}
function obliczOdleglosc()
{
var adres = document.getElementById("adres").value;     
var trasa = new GDirections(mapa);
GEvent.addListener(trasa, "load", function () {
	var dystans = trasa.getDistance().meters/1000;
	var wynik = document.getElementById("wynik");
	dni = document.getElementById("dni");
	var dni  = parseInt(dni.value);
	if( dystans < 30 )
	{
		koszt = dni * 2000;
	}
	else
	{
		if( dystans >= 30 && dystans < 100 )
		{
			koszt = (dystans*1.4) + (dni*2000);
		}
		else if( dystans >= 100 && dystans < 400 )
		{
			koszt = ( ( dystans * 1.4 ) + 100 ) + ( dni * 2000 );
		}
		else if( dystans >= 400 && dystans < 600 )
		{
			koszt = ( dystans * 1.6 ) + ( dni * 2000 );
		}
		else if( dystans >= 600 && dystans < 800 )
		{
			koszt = ( dystans * 2 ) + ( dni * 2000 );
		}
		else
		{
			koszt = ( dystans * 2.4 ) + ( dni * 2000 );
		}
	}
	wynik.innerHTML = "Musimy dojechać do sali przyjęć "+ Math.round(dystans) + "km, cena z dojazdem to: <strong>"+((Math.round((koszt)/100))*100)+"</strong> zł brutto";
	document.getElementById('adres').value='';
});  
trasa.load("from: "+punkt+" to: "+adres);
}
