// Renderer plugin can't be tested as of now
// Please move the logic to other classes and test them independently
// Let the plugin class delegate functionality to these classes
Plugin.extend({
    _type: 'org.ekstep.plugins.virtualReality',
    _isContainer: false,
    _render: true,
    _interval: null, 
    initPlugin: function(data) {
        //JSON.parse(data.config.__cdata);
        // jQuery('#gameArea').css({ left: '10%', top: '-10px', width: "80%", height: "90%", margin: "5% 0 0 0" });
        var mainDiv = $("#mainDiv").length ? $("#mainDiv").remove() : "<div id='mainDiv'></div>";
        jQuery('#gameArea').append(mainDiv);
        jQuery("#overlay .nav-next").css('display', 'none');
        jQuery("#overlay .nav-previous").css('display', 'none');
        jQuery(".icon").css('display', 'none');
        jQuery(".user").css('display', 'none');
        jQuery("#reload_id").css('display', 'none');


        var instance = this;

        var earth = EkstepRendererAPI.resolvePluginResource("org.ekstep.plugins.virtualReality", "1.0", "renderer/assets/earth.jpg");
        var stars = EkstepRendererAPI.resolvePluginResource("org.ekstep.plugins.virtualReality", "1.0", "renderer/assets/stars.jpg");
        var vrLoad = '<a-scene><a-camera position="0 0 3" user-height="0"></a-camera>'
        +'<a-sphere src="https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth_atmos_4096.jpg" radius="1.5" segments-height="53" animation="property: rotation; dir: normal; dur: 10000; easing: linear; loop: true; to: 0 360 0"></a-sphere>'
  		+'<a-sky segments-height="100" segments-width="100"  src="https://ucarecdn.com/ffc43b6b-dfe6-488e-961e-96e4dbc1e3e4/" color="#555" rotation="0 -90 0"></a-sky>'+
		+'</a-scene>';
        jQuery('#mainDiv').append(vrLoad);


    }
});
