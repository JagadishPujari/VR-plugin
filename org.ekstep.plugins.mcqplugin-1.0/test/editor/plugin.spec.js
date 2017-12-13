describe("EditorPlugin", function() {
    describe("newInstance", function() {
        var plugin;

        beforeEach(function() {
            plugin = new org.ekstep.plugins.mcqplugin.EditorPlugin({}, {}, {});
        });

        it("should ?", function() {
            plugin.newInstance();

            expect(true).toBe(true);
        });
    });
});
