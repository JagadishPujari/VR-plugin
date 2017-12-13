Plugin.extend({
    _type: 'org.ekstep.plugins.quizappquestion',
    _isContainer: false,
    _render: true,
    _interval: null, 
    initPlugin: function(data) {
        //JSON.parse(data.config.__cdata);
        jQuery('#gameArea').css({ left: '10%', top: '-10px', width: "80%", height: "90%", margin: "5% 0 0 0" });
        var mainDiv = $("#mainDiv").length ? $("#mainDiv").remove() : "<div id='mainDiv'></div>";
        jQuery('#gameArea').append(mainDiv);
        jQuery("#overlay .nav-next").css('display', 'none');
        jQuery("#overlay .nav-previous").css('display', 'none');
        var instance = this;
        this.addContent();



    },
    getUserInfo: function(gameId) {
        var user;
        $.ajax({
            type: "get",
            url: "https://localhost:7819/assess/" + gameId,
            async: false,
            crossDomain: true,
            success: function(res) {
                console.log("User info", res);
                user = res;
                localStorage.setItem("userInfo", gameId);
            },
            error: function(request, status, error) {}
        });
        return user;
    },
    checkUserReady: function(gameId) {
        var instance = this;
        var result;
        $.ajax({
            type: "get",
            url: "https://localhost:7819/isReady/" + gameId,
            async: false,
            crossDomain: true,
            success: function(res) {
                result = res;
                if (res === true) {
                    console.log("Opponent is ready");
                    //instance.checkUserReady(gameId);
                } else {
                    console.log("Oppomnent is not ready");
                }
            },
            error: function(request, status, error) {}
        });
        return result;
    },
    connect: function(data1) {
        var gameId;
        var instance = this;
        $.ajax({
            type: "post",
            url: "https://localhost:7819/connect",
            async: false,
            crossDomain: true,
            data: data1,
            success: function(res) {
                console.log("Game connected");
                gameId = res;

                //instance.checkUserReady(gameId);
                $(function() {
                    var interval = setInterval(function() {
                        var check = instance.checkUserReady(gameId);
                        console.log("Stop if true", check);
                        if (check) {
                            console.log("Stop interval");
                            clearInterval(interval);
                            $('#submit').removeClass('button_loader').attr("value", "\u2713");
                            $('#submit').prop('disabled', true);
                            //call api to get user info
                            var userInfo = instance.getUserInfo(gameId);
                            var userInfo = "<h2>" + userInfo.users[0].userId + " V/s " + userInfo.users[1].userId + "</h2><br>";
                            jQuery('#startGame').append(userInfo);
                            var load = '<div id = "myDiv"><img id = "myImage" style="width:90px;" src="https://images.gr-assets.com/hostedimages/1380912207ra/3201190.gif"></div><br>';
                            jQuery('#startGame').append(load);

                            $("#wait").hide();
                            $("#startBtn").show();
                            $("#startGame").show();
                            $("#bodyDiv").hide();
                        } else {
                            console.log("Dont stop interval");
                        }
                    }, 2000);
                });
                setTimeout(function() {
                    $("#myDiv").hide();
                    if (instance._stage.params.next) {
                        jQuery("#overlay .nav-next").css('display', 'block');
                        //jQuery("#overlay .nav-previous").css('display', 'block');
                        OverlayManager.skipAndNavigateNext();
                    } else {
                        EkstepRendererAPI.dispatchEvent('renderer:content:end');
                    }
                }, 3000);

            },
            error: function(request, status, error) {
                console.log("Game not connected");
                //instance.checkUserReady();
            }
        });
    },
    addContent: function() {
        var instance = this;
        var header = "<div id='headDiv' style='background: #0093dd;color:white;'></div>";
        jQuery('#mainDiv').append(header);
        var logo = EkstepRendererAPI.resolvePluginResource("org.ekstep.plugins.quizappquestion", "1.0", "renderer/assets/logo.png");
        $('#headDiv').prepend("<img src=" + logo + " width='47px'>");
        var $headerDiv = jQuery('<h5>', { id: 'header', text: "Quiz Up " }).addClass("headerSection");
        jQuery('#headDiv').append($headerDiv);

        var bodyDiv = "<div id='bodyDiv'></div>";
        jQuery('#mainDiv').append(bodyDiv);

        var text = "<span>Enter name  </span><input = 'text' id='textbox'/><br/>";
        jQuery('#bodyDiv').append(text);
        var error = "<span id='err' style='color:red;margin-left:53px;display:none'>Please enter name</span>"
        jQuery('#bodyDiv').append(error);
        //var btn = "<br><button id='btn' style='margin-top:25px;color: #fff!important;background-color: #4CAF50!important;background-color: #4CAF50;border: none;color: white;padding: 8px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;'>OK</button>";
        var btn = '<br><input id="submit" class="button" type="submit" value="Submit" />';
        jQuery('#bodyDiv').append(btn);
        var btn = '<br><span id="wait" style="display:none;color:#f47070;">Waiting for opponent to connect</span>';
        jQuery('#bodyDiv').append(btn);
        var startGame = "<div id='startGame' style='display:none;'></div>"
        jQuery('#mainDiv').append(startGame);
        // var startBtn = "<button id='startBtn' style='color: #fff!important;background-color: #4CAF50!important;background-color: #4CAF50;border: none;color: white;padding: 8px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;'>Start game</button>"
        // jQuery('#startGame').append(startBtn);

        $('#submit').click(function() {

            var textData = $("#textbox").val();
            if (textData.length > 0) {
                $("#err").hide();
                localStorage.setItem("userId", textData);
                //Server call for opponent is ready or not
                $(this).addClass('button_loader').attr("value", "");
                $("#wait").show();
                var data = {};
                data.contentId = EkstepRendererAPI.getGlobalConfig().contentId;
                data.deviceId = EkstepRendererAPI.getGlobalConfig().did == undefined ? Math.random() : EkstepRendererAPI.getGlobalConfig().did
                data.userId = textData;
                console.log("Final data", data);
                instance.connect(data)

            } else {
                $("#err").show();
            }

        });
        $('#startBtn').click(function() {
            if (instance._stage.params.next) {
                OverlayManager.skipAndNavigateNext();
            } else {
                EkstepRendererAPI.dispatchEvent('renderer:content:end');
            }
        });
    }
});