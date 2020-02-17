/**
 * Plugin to create repo instance and to register repo instance
 * @extends EkstepRenderer.Plugin
 * @author Jagadish P <jagadish.pujari@tarento.com>
 */
org.ekstep.examStudentRenderer = Plugin.extend({ // eslint-disable-line no-undef
  _type: 'org.ekstep.examstudent',
  _isContainer: true,
  _render: true,
  _qsSummary: {},
  _totalAttempted: 0,
  _totalNonAttempted: 0,
  _totalQuestions:0,
  initPlugin: function(data) {
    var instance = this;
    var gameElement = examStartTemplate.showTemplate();
    // summaryTemplate.pluginInstance = instance;
    $("#gameArea").append(gameElement);
  }
  
});


//# sourceURL=examStudentRenderer.js
