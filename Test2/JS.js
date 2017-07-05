/*
 * Bootstrap-based responsive mashup
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
//to avoid errors in dev-hub: you can remove this when you have added an app
var app;
require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {

	var control = false;
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		if ( !control ) {
			control = true;
			$( '#popup' ).delay( 1000 ).fadeIn( 1000 ).delay( 11000 ).fadeOut( 1000 );
		}
	} );
	$( "body" ).css( "overflow: hidden;" );
	function AppUi ( app ) {
		var me = this;
		this.app = app;
		app.global.isPersonalMode( function ( reply ) {
			me.isPersonalMode = reply.qReturn;
		} );
		app.getAppLayout( function ( layout ) {
			$( "#title" ).html( layout.qTitle );
			$( "#title" ).attr( "title", "Last reload:" + layout.qLastReloadTime.replace( /T/, ' ' ).replace( /Z/, ' ' ) );
			//TODO: bootstrap tooltip ??
		} );
		app.getList( 'SelectionObject', function ( reply ) {
			$( "[data-qcmd='back']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qBackCount < 1 );
			$( "[data-qcmd='forward']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qForwardCount < 1 );
		} );
		app.getList( "BookmarkList", function ( reply ) {
			var str = "";
			reply.qBookmarkList.qItems.forEach( function ( value ) {
				if ( value.qData.title ) {
					str += '<li><a data-id="' + value.qInfo.qId + '">' + value.qData.title + '</a></li>';
				}
			} );
			str += '<li><a data-cmd="create">Create</a></li>';
			$( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function () {
				var id = $( this ).data( 'id' );
				if ( id ) {
					app.bookmark.apply( id );
				} else {
					var cmd = $( this ).data( 'cmd' );
					if ( cmd === "create" ) {
						$( '#createBmModal' ).modal();
					}
				}
			} );
		} );
		$( "[data-qcmd]" ).on( 'click', function () {
			var $element = $( this );
			switch ( $element.data( 'qcmd' ) ) {
				//app level commands
				case 'clearAll':
					app.clearAll();
					break;
				case 'back':
					app.back();
					break;
				case 'forward':
					app.forward();
					break;
				case 'lockAll':
					app.lockAll();
					break;
				case 'unlockAll':
					app.unlockAll();
					break;
				case 'createBm':
					var title = $( "#bmtitle" ).val(), desc = $( "#bmdesc" ).val();
					app.bookmark.create( title, desc );
					$( '#createBmModal' ).modal( 'hide' );
					break;
			}
		} );
	}

	//callbacks -- inserted here --
	function Insights(reply, app){
		console.log(reply);
		}

	//UserName:
	function User(reply, app1){
	
		console.log(" "+JSON.stringify(reply.qListObject.qDataPages[0].qMatrix[0][0].qText));
		document.getElementById("UserName").innerHTML+=""+(JSON.stringify(reply.qListObject.qDataPages[0].qMatrix[0][0].qText).replace('"','')).replace('"','')+" ";
	}
	
	//Territory
	function Territory(reply, app1){
	
		console.log(" "+JSON.stringify(reply.qListObject.qDataPages[0].qMatrix[0][0].qText));
		document.getElementById("Territory").innerHTML+=""+(JSON.stringify(reply.qListObject.qDataPages[0].qMatrix[0][0].qText).replace('"','')).replace('"','').trim()+" ";
	}
	
	function TRxVolume(reply, app1){
	
	}
	function MyList(reply, app1){
	}

 
	//open apps -- inserted here --
	var app1 = qlik.openApp('Personlized Analytics.qvf', config);
    var testgeo;
	
	//get objects -- inserted here --
	app1.getObject('QV01','kCqwms');
	app1.getObject('QV02','VyVrpJk');
	app1.getObject('QV03','bpawZy');
	app1.getObject('QV04','JctU');
	
	
	//create cubes and lists -- inserted here --
	app1.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 20,
			"qWidth": 2
		}
	],
	"qDimensions": [
		{
			"qDef": {
				"qFieldDefs": [
					"Month"
				]
			},
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}
		}
	],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "SUM(TRxVol)"
			},
			"qLabel": "SUM(TRxVol)",
			"qLibraryId": null,
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "P",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
	},TRxVolume);
	app1.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"Month"
				]
		},
		"qExpressions": [
				{
						"qDef": {
								"qDef": "Sum(TRxVol)"
						},
						"qLabel": "Sum(TRxVol)",
						"qLibraryId": null
				}
		],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 2
				}
		],
		"qLibraryId": null
	},TRxVolume);
//User:
	app1.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"User"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		"qLibraryId": null
	},User);

//Territory:
app1.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"Territory"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		"qLibraryId": null
	},Territory);
	app1.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 200,
			"qWidth": 4
		}
	],
	"qDimensions": [
		{
			"qDef": {
				"qFieldDefs": [
					"KPI"
				]
			},
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}
		},
		{
			"qDef": {
				"qFieldDefs": [
					"Priority"
				]
			},
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}
		}
	],
	"qMeasures": [],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
	},Insights);
//TerritoryEnds
if ( app ) {
		new AppUi( app );
	}

} );
