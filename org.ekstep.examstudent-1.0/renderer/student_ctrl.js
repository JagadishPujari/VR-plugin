var examStartTemplate = examStartTemplate || {};

examStartTemplate.Role = "admin";
 
examStartTemplate.usersList = [];
examStartTemplate.showTemplate = function(){
  if(examStartTemplate.Role == "student"){
    template = examStartTemplate.getStudentTemplate();
  } else if(examStartTemplate.Role == "admin"){
    template = examStartTemplate.getAdminTemplate();
  }
  return template;
}


//===================Admin panel ==============
examStartTemplate.getAdminTemplate = function(){
  var adminTemplateHTML = '<div class="popup" id="assess-summary"style="z-index: 9999999;top:0%;background-color: #fff4f4;">\
  <p class="load_list">Exam attending student names</p>\
  <div class="stud_table"></div>\
  <div class="buttons">\
  <button class="start_btn" onclick="examStartTemplate.startExam()">START EXAM</button>\
  </div>\
  </div>';
  examStartTemplate.createUserTable();
  return _.template(adminTemplateHTML);
}

examStartTemplate.createUserTable = function(){
  var userTable = '<table class="box"><tr><th>Student name</th></tr>';
  var data = '';
  for(var i=0; i<examStartTemplate.usersList.length>0; i++){
    data = data + '<tr><td>'+examStartTemplate.usersList[i].name+'</td></tr>'
  } 
  $(".stud_table").html('');
  $(".stud_table").append(userTable + data + '</tabel>');
  // return userTable + data + '</tabel>';
}

examStartTemplate.startExam = function (studData){
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8383/createGame',
    processData: true,
    data: {},
    dataType: 'json',
    data: studData,
    success: function (data) {
      //if(data.length > 0){
        clearInterval(examStartTemplate.studnInterval);
        EventBus.dispatch("actionNavigateNext", "next");
      //}
    },
    error: function(request, status, error) {
      console.log("Error while creating user")
    }
  });
}
$(".load_list").ready(function() {
  $(function() {
    examStartTemplate.studnInterval = setInterval(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8383/users',
      processData: true,
      data: {},
      dataType: 'json',
      success: function (data) {
        examStartTemplate.createUserTable();
        examStartTemplate.usersList = data;
      }
      });
       
    }, 2000);
  });
});

// $(function() {
//   examStartTemplate.adminIinterval = setInterval(function() {
//     $.ajax({
//     type: 'GET',
//     url: 'http://localhost:8383/users',
//     processData: true,
//     data: {},
//     dataType: 'json',
//     success: function (data) {
//         if(data.length > 0){
//         clearInterval(examStartTemplate.studIinterval);
//         // EventBus.dispatch("actionNavigateNext", "next");
//         }
        
//     }
//     });
    
//     }, 2000);
// }



//=================Student panel started===========

examStartTemplate.getStudentTemplate = function () {
  var studentTemplateHTML = '<div class="popup" id="assess-summary"style="z-index: 9999999;top:0%;background-color: #fff4f4;">\
  <div class="enterPage"><p>Student dashboard</p>\
  <label>Enter name: <input type="text" id="student-name"/></label>\
  <label class="errorMsg" style="display:none;color:red">Please enter name</label>\
  <button onclick="examStartTemplate.instructionPage()">Next</button>\
  </div>\
  <div class="instructionPage" style="display:none;">\
  <p> Exam will start soon.. Once starting the exam you will redirect directly to questions page</p>\
  <img src="assets/icons/loader.gif" width="100%" height="100%">\
  </div>\
  </div>';
  return _.template(studentTemplateHTML);
}

examStartTemplate.instructionPage = function () {
  var studName = $("#student-name").val()
  if(studName.length <= 0){
    $(".errorMsg").css('display','block');
  }else{
    $(".errorMsg").css('display','none');
    //Create user info
    var data = {name:studName};
    examStartTemplate.createUser(data); 
  }
}

examStartTemplate.createUser = function (studData){
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8383/create.user',
    processData: true,
    data: {},
    dataType: 'json',
    data: studData,
    success: function (data) {
      $(".enterPage").css('display','none');
      $(".instructionPage").css('display','block');
      examStartTemplate.checkGameReady();
    },
    error: function(request, status, error) {
      console.log("Error while creating user")
    }
  });
}


examStartTemplate.checkGameReady = function(){
  $(function() {
    examStartTemplate.interval = setInterval(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8383/getGame',
      processData: true,
      data: {},
      dataType: 'json',
      success: function (data) {
        if(data.length > 0){
          clearInterval(examStartTemplate.interval);
          EventBus.dispatch("actionNavigateNext", "next");
        }
        
      }
      });
       
    }, 2000);
  });
}


//# sourceURL=examStudentTemplateRenderer.js