sap.ui.define([
    'sap/ui/core/UIComponent'
],
function (UIComponent) {
    return UIComponent.extend("infy.com.Component", {
        metadata: {
            manifest: "json"
        },
        init: function(){
            UIComponent.prototype.init.apply(this);

            //Get the router Object from the Base class
            var oRouter = this.getRouter();
            //call Initialize - it will look manifest json for configuration
            oRouter.initialize();

            //OR you can just do chaining like below
            //this.getRouter().initialize();

        },

        destroy: function(){

        }
    });
});