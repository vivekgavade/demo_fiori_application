sap.ui.define([
    'infy/com/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("infy.com.controller.View1",{
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("superman").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            let fruitId = oEvent.getParameter("arguments").fruitId;
            let sPath = '/fruits/' + fruitId;
            let oList = this.getView().byId("idMyList");
            let aItem = oList.getItems();
            for (let i = 0; i < aItem.length; i++) {
                const element = aItem[i];
                if(element.getBindingContextPath() === sPath){
                    var oListItem = element;
                    break;
                }
            }
            //Get list control object in which selection needs to be done...
            oList.setSelectedItem(oListItem);   
        },
        // onNext: function(myFruitId){
        //     this.oRouter.navTo("superman",{
        //         fruitId: myFruitId
        //     });
        // },
        onItemSelect: function (oEvent) {
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var myId = sPath.split("/")[sPath.split("/").length - 1];
            //OR we can also use...
            // var myId = sPath.split("/").pop();

            this.oRouter.navTo("superman", {
                fruitId: myId
            });
            // this.onNext(myId);
        },
        onItemsDelete: function(){
            let oList = this.getView().byId("idMyList");
            let aSelectedItems = oList.getSelectedItems();
            aSelectedItems.forEach(element => {
                oList.removeItem(element);
            });
        },
        // onItemDelete: function(oEvent){
        //     let itemToBeDeleted = oEvent.getParameter("listItem");
        //     let oList = oEvent.getSource();
        //     oList.removeItem(itemToBeDeleted);
        // },
        onSearch: function (oEvent) {
            var sVal = oEvent.getParameter("query");
            if(!sVal){
                sVal = oEvent.getParameter("newValue");
            }
            var oFilter1 = new Filter("name", FilterOperator.Contains, sVal);
            var oFilter2 = new Filter("type", FilterOperator.Contains, sVal);
            var aFilter = [oFilter1, oFilter2];
            var oFilter = new Filter({
                filters : aFilter,
                and : false
            })
            this.getView().byId("idMyList").getBinding("items").filter(oFilter);
        }
    }); 
});