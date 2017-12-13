// Renderer plugin can't be tested as of now
// Please move the logic to other classes and test them independently
// Let the plugin class delegate functionality to these classes
Plugin.question = {};

/* istanbul ignore next */
Plugin.question.RendererPlugin = Plugin.extend({
    _type: 'org.ekstep.plugins.question',
    _isContainer: false,
    _render: true,
    initPlugin: function() {

    }
});
