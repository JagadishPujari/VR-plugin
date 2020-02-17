/**
 *
 * Plugin to create exam student of the question set and add it to stage.
 * @class exam student
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Jagadish P <jagadish.pujari@tarento.com>
 */

// Register namespace
org.ekstep.examstudent = {};
org.ekstep.examstudent.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.examstudent",
  /**
   * Register events.
   * @memberof exam Student
   */
  initialize: function () {
    var instance = this;
    ecEditor.addEventListener(instance.manifest.id + ":addExamStudent", instance.addSummary, instance);
  },
  newInstance: function () {
    var instance = this;
    var _parent = this.parent;
    this.parent = undefined;
    /*istanbul ignore else*/
    if (!this.attributes.x) {
      this.attributes.x = 10;
      this.attributes.y = 3;
      this.attributes.w = 78;
      this.attributes.h = 94;
      this.percentToPixel(this.attributes);
    }
    var props = this.convertToFabric(this.attributes);
    delete props.widqdatath;
    delete props.height;
 
    // Add stage object
    var stageImage = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, 'assets/exam.jpg');
    instance.addMedia({
      id: "examImage",
      src: stageImage,
      assetId: "examImage",
      type: "image",
      preload: true
    });

    fabric.Image.fromURL(stageImage, function (img) {
      // var count = instance.config.total_items + '/' + instance.data.length;
      // var quizDetails = instance.getPropsForEditor(instance.config.title, count, instance.config.max_score);
      instance.editorObj = new fabric.Group([img]);
      instance.editorObj = img;
      instance.parent = _parent;
      instance.editorObj.scaleToWidth(props.w);
      instance.postInit();
    }, props);
  },
  addSummary: function(){
    ecEditor.dispatchEvent(this.manifest.id + ':create');
  }
});
//# sourceURL=examStudentEditorPlugin.js
