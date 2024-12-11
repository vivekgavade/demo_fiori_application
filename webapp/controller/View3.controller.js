sap.ui.define([
    'infy/com/controller/BaseController',
    'sap/ui/core/routing/History'
], function (BaseController, History) {
    return BaseController.extend("infy.com.controller.View3", {
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("ironman").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            let suppId = oEvent.getParameter("arguments").suppId;
            let sPath = '/suppliers/' + suppId;
            this.getView().bindElement(sPath);
        },
        onBack: function(){
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("spiderman", {}, true);
			}
        },
    });
});