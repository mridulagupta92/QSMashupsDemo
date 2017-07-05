/*
* Bootstrap-based responsive mashup
* @owner Enter you name here (xxx)
*/
/*
*    Fill in host and port for Qlik engine
*/
/*
function addEvents() {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="SalesToggle" and hide them
	
    tabcontent = document.getElementsByClassName("SalesToggle");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
	
	
}
*/
/* javascript for toggle buttons sales.html */
function openCity(evt, pkey) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="SalesToggle" and hide them
    tabcontent = document.getElementsByClassName("SalesToggle");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pkey).style.display = "block";
	if(pkey=="QV10"){
	 document.getElementById("QV07").style.border = "1px solid grey";
	 document.getElementById("QV07").style.borderRadius = "10px";
	 document.getElementById("QV07").style.boxShadow = "2px 2px 20px lightgrey";
	 
	 document.getElementById("QV08").style.border = "none";
	 document.getElementById("QV08").style.borderRadius = "none";
	 document.getElementById("QV08").style.boxShadow = "none";
	 
	 document.getElementById("QV08").style.border = "none";
	 document.getElementById("QV08").style.borderRadius = "none";
	 document.getElementById("QV08").style.boxShadow = "none";
	 
	 
	}
	else if(pkey=="QV11"){
	document.getElementById("QV07").style.border = "none";
	 document.getElementById("QV07").style.borderRadius = "none";
	 document.getElementById("QV07").style.boxShadow = "none";
	 
	 document.getElementById("QV08").style.border = "1px solid grey";
	 document.getElementById("QV08").style.borderRadius = "10px";
	 document.getElementById("QV08").style.boxShadow = "2px 2px 20px lightgrey";
	 
	 document.getElementById("QV09").style.border = "none";
	 document.getElementById("QV09").style.borderRadius = "none";
	 document.getElementById("QV09").style.boxShadow = "none";
	}
	else if(pkey=="QV12"){
	document.getElementById("QV07").style.border = "none";
	 document.getElementById("QV07").style.borderRadius = "none";
	 document.getElementById("QV07").style.boxShadow = "none";
	 
	document.getElementById("QV08").style.border = "none";
	 document.getElementById("QV08").style.borderRadius = "none";
	 document.getElementById("QV08").style.boxShadow = "none";
	 
	document.getElementById("QV09").style.border = "1px solid grey";
	 document.getElementById("QV09").style.borderRadius = "10px";
	 document.getElementById("QV09").style.boxShadow = "2px 2px 20px lightgrey";
	}
	else{
	document.getElementById("QV07").style.border = "none";
	 document.getElementById("QV07").style.borderRadius = "none";
	 document.getElementById("QV07").style.boxShadow = "none";
	 
	document.getElementById("QV08").style.border = "none";
	 document.getElementById("QV08").style.borderRadius = "none";
	 document.getElementById("QV08").style.boxShadow = "none";
	 
	document.getElementById("QV09").style.border = "none";
	 document.getElementById("QV09").style.borderRadius = "none";
	 document.getElementById("QV09").style.boxShadow = "none";
	
	}

	
    evt.currentTarget.className += " active";
	
	
}

var num=20;




/* Function for toggle */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function search() {
 
   var name = document.getElementById("searchForm").elements["searchItem"].value;
   var pattern = name.toLowerCase();
   var targetId = "";
 
   var divs = document.getElem&nbspentsByClassName("main");
   for (var i = 0; i < divs.length; i++) {
      var para = divs[i].getElementsByTagName("p");
      var index = para[0].innerText.toLowerCase().indexOf(pattern);
      if (index != -1) {
         targetId = divs[i].parentNode.id;
         document.getElementById(targetId).scrollIntoView();
         break;
      }
   }  
}
/* Enf of function for toggle */

var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
                host: window.location.hostname,
                prefix: prefix,
                port: window.location.port,
                isSecure: window.location.protocol === "https:"
};
//to avoid errors in workbench: you can remove this when you have added an app
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

                $( "#closePopup" ).click( function () {
                                $( '#popup' ).hide();
                } );
                if ( $( 'ul#qbmlist li' ).length === 0 ) {
                                $( '#qbmlist' ).append( "<li><a>No bookmarks available</a></li>" );
                }
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
																				$('#QV06 .dropdown button').html('Select Brand  <span class="caret"></span>'); 
																				$('#QV05 .dropdown button').html('Select Territory <span class="caret"></span>'); 
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
    
  
                $('#QV05').on( "click", "[data-select]", function g() {  
     var value = $(this).data('select');  
     app.field("Territory Name").selectValues([value], false, false);  
     $('#QV05 .dropdown button').html(value + ' <span class="caret"></span>');  
  });  
  
  
  $('#QV06').on( "click", "[data-select]", function s() {  
     var value = $(this).data('select');  
     app.field("Brand Name").selectValues([value], false, false);  
     $('#QV06 .dropdown button').html(value + ' <span class="caret"></span>');  
  });
  
  
  
  
  
  
  //////////////////////////////custom current selection/////////
  app.getList("CurrentSelections", function(reply) {
 
	selectionslist ="";
 
	var mySelectedFields = reply.qSelectionObject.qSelections;
 
	console.log(mySelectedFields);
 
//loop through selected fields
	var mySelectedFields_arrayLength = mySelectedFields.length;
	for (var i = 0; i < mySelectedFields_arrayLength; i++) {
 
		var text = "  " + mySelectedFields[i].qField + ": ";
 
	    //console.log(mySelectedFields[i].qField);
 
 				
				if(mySelectedFields[i].qLocked==true) {
					var labeltype = 'label label-warning'
				} else {
					var labeltype = 'label-success';
				}
				
 
				console.log(mySelectedFields[i].qLocked);
 
	    	//loop through selected field values
			var currentFieldValues = mySelectedFields[i].qSelectedFieldSelectionInfo
 
 
			var currentFieldValues_arrayLength = currentFieldValues.length;
 
			for (var y = 0; y < currentFieldValues_arrayLength; y++) {
 
			    //console.log(currentFieldValues[y].qName);
 
				//text += currentFieldValues[y].qName + " ";
 
 
 
 
 				text += "<b>" + currentFieldValues[y].qName + " </b>";
				//text += "<span class='label " + labeltype + "'>" + currentFieldValues[y].qName + "</span> ";
				//put the field names into a variable
 
				//console.log(text);
			}
 
		if(i==0) {
			selectionslist = text;
		} else {
			selectionslist += text;
		}
 
		//add the complete string for this field to an array.
 
 
 
	}
 
console.log(selectionslist);
$("#myselections").html(selectionslist);
//$("#myselections").innerHtml="<i>"+selectionslist+"</i>";
 
 
 
 
     });
	 ///////////////////////////////////end custom current selection////////
	 
				}

                  //////////////////////////////////////////////////////////////////////////////////////
                  //////////////////////////////////////////////////////////////////////////////////////
                  //////////////////////////////////////////////////////////////////////////////////////
                
            

	//function showData(reply, app){}

                function Geo(reply, app){
                $('#QV05 .dropdown ul').empty()  
     $.each(reply.qListObject.qDataPages[0].qMatrix, function g(key, value) {  
          if (typeof value[0].qText !== 'undefined') {  
               $('#QV05 .dropdown ul').append('<li><a data-select="'+ value[0].qText+'" href="#">'+ value[0].qText+'</a></li>');  
          }  
     });  
                }
                
  
  
                function ShowData(reply, app){                
                $('#QV06 .dropdown ul').empty()  
     $.each(reply.qListObject.qDataPages[0].qMatrix, function s(key, value) {  
          if (typeof value[0].qText !== 'undefined') {  
               $('#QV06 .dropdown ul').append('<li><a data-select="'+ value[0].qText+'" href="#">'+ value[0].qText+'</a></li>');  
          }  
     });  
                }
  
  
  
  
                  //////////////////////////////////////////////////////////////////////////////////////
                  //////////////////////////////////////////////////////////////////////////////////////
                  ///////////////////////////////////////////////////////////////////////////////////////

  
  
  
                //open apps -- inserted here --
                var app = qlik.openApp('LUC LT Dashboard – Field Pub Mashups.qvf', config);

                //get objects -- inserted here --
				app.getObject('QV04','WaWJCq');
				app.getObject('QV03','wSyWPVK');
				app.getObject('QV02','mKdfcQ');
				app.getObject('QV01','CpXut');
				
				app.getObject('QV01','qcjmX');		//Sales Chart
				app.getObject('QV02','QNkwm');		//Growth Chart
				app.getObject('QV12','wtYHs');		//PTP Chart
	
				app.getObject('QV09','Nce');		//PTP
				app.getObject('QV08','mEWajWm'); 	//Growth
				app.getObject('QV07','bSZZ'); 		//Sales
				
				app.getObject('QV12','wtYHs');		//PTP Chart
				app.getObject('QV11','EUcSmLL');		//Growth Chart
				app.getObject('QV10','qcjmX');		//Sales Chart
	           app.getObject('QV14','rYwtxA');                               //Narratives
                app.getObject('QV13','cc02ec84-1690-4146-98ff-23200020e490');                              //Coorelation Chart



                
                
        	    //get objects -- inserted here --
                //create cubes and lists -- inserted here --
                app.createList({
                                "qFrequencyMode": "V",
                                "qDef": {
                                                                "qFieldDefs": [
                                                                                                "Brand Name"
                                                                ]
                                },
                                "qExpressions": [],
                                "qInitialDataFetch": [
                                                                {
                                                                                                "qHeight": 20,
                                                                                                "qWidth": 1
                                                                }
                                ],
                                "qLibraryId": "fc8c57a7-a4c9-4249-8977-dcec22ef4584"
                },ShowData);
                
                
               
	app.createList({
		"qFrequencyMode": "V",
		"qDef": {
				"qFieldDefs": [
						"Territory Name"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		"qLibraryId": "5fcdf9f4-38e1-4bf7-aef5-4d43e7f28f1b"
	},Geo);
if ( app ) {
		new AppUi( app );
	}

} );