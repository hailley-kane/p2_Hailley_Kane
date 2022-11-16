//clock, weather, news, phone notifs, health stats
var url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=eddZzgAdi8T7UNjFv1ShkEhw2nNoMtUn';
var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=lubbock&appid=4cfbb20b52ecef48cd8e0bdda2cac352&units=imperial';
let canvas;

var clockWidget;
var newsWidget;
var weatherWidget;
var calendarWidget;
var phoneWidget;
var healthWidget;

var news;
var weather;

let title0, title1;
let sect0, sect1;
let tag0, tag1;
let abstract0, abstract1;

function setup ()
{
  canvas = createCanvas( 900, 800 );
  canvas.class( "canvas" );
  createWidgets();
  news = loadJSON( url, gotData );
  weather = loadJSON( url2, getWeatherData );

}

function draw ()
{
  background( 220 );
  updateClock();
  updateNews();
  calendarDate();
  showWeather();

  showWidgets( clockWidget );
  showWidgets( newsWidget );
  showWidgets( weatherWidget );
  showWidgets( calendarWidget );
}

function createWidgets ()
{
  clockWidget = new Widget( 25, 25, 75, 50 );
  newsWidget = new Widget( 575, 150, 300, 400 );
  weatherWidget = new Widget( 775, 25, 100, 100 );
  calendarWidget = new Widget( 100, 25, 100, 50 );
}

function showWidgets ( widget )
{
  widget.over();
  widget.update();
  widget.show();
}

function updateClock ()//movable widget
{

  let hr = hour() % 12;
  let sec = second();
  let min = minute();

  if ( hr == 0 )
  {
    hr = 12;
  }

  clockWidget.addCenterText( hr + ":" + min + ":" + sec, 20 );
}

function calendarDate ()
{
  let m = month();
  let d = day();
  let yr = year();

  calendarWidget.addCenterText( m + "/" + d + "/" + yr, 15 );
}

function updateNews ()
{
  title0 = newsWidget.addBoldText( titles[0] + '...', 0, 0 );
  sect0 = newsWidget.addTextPos( sections[0], 0, 65, 10 );
  tag0 = newsWidget.addTextPos( tags[0], 0, 90, 8 );
  abstract0 = newsWidget.addTextPos( abstracts[0], 0, 125 );

  title1 = newsWidget.addBoldText( titles[1] + '...', 0, 200 );
  sect1 = newsWidget.addTextPos( sections[1], 0, 265, 10 );
  tag1 = newsWidget.addTextPos( tags[1], 0, 290, 8 );
  abstract1 = newsWidget.addTextPos( abstracts[1], 0, 340 );
}

function showWeather ()
{
  weatherWidget.addBoldText( city, 0, 0 );
  weatherWidget.addCenterText( temp + " F", 15 );
  weatherWidget.addTextPos( main, 30, 60, 10 );
}

function mousePressed ()
{
  clockWidget.pressed();
  newsWidget.pressed();
  weatherWidget.pressed();
  calendarWidget.pressed();
}

function mouseReleased ()
{
  clockWidget.released();
  newsWidget.released();
  weatherWidget.released();
  calendarWidget.released();
}

var titles = [];
var sections = [];
var tags = [];
var abstracts = [];

function gotData ( data )
{
  var articles = data.results;


  for ( var i = 0; i < articles.length; i++ )
  {
    titles[i] = str( articles[i].title ); //string attributes of article array
    sections[i] = str( articles[i].section );
    tags[i] = str( articles[i].adx_keywords );
    abstracts[i] = str( articles[i].abstract );
  }

}

var temp;
var main;
var city;
function getWeatherData ( data )
{
  temp = ( data.main.temp );
  main = ( data.weather[0].main );
  city = ( data.name );
}


//create embedded link for video
