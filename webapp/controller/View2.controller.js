sap.ui.define([
    'infy/com/controller/BaseController',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/routing/History'
], function (BaseController, Fragment, Filter, FilterOperator, MessageBox, MessageToast, History) {
    'use strict';
    return BaseController.extend("infy.com.controller.View2", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("superman").attachMatched(this.herculis, this);
        },
        //Route Matched Handler Function...
        herculis: function (oEvent) {
            let fruitId = oEvent.getParameter("arguments").fruitId;
            let sPath = '/fruits/' + fruitId;
            this.getView().bindElement(sPath);
        },
        onBack: function () {
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("spiderman", {}, true);
			}
        },
        onSave: function () {
            let oResourceModel = this.getView().getModel("i18n");
            let oBundle = oResourceModel.getResourceBundle();
            let msgSuccess = oBundle.getText('msgSuccess', ["789654"]);
            let msgError = oBundle.getText('msgError');

            MessageBox.confirm("Do you want to save", {
                title: "Confirm",
                onClose: function (msg) {
                    if (msg === "OK") {
                        MessageToast.show(msgSuccess);
                    } else {
                        MessageToast.show(msgError);
                    }
                }
            });

        },
        onCancel: function () {
            MessageToast.show("No order placed....!!!")
        },

        oPopupSupplier: null,
        oCityPopup: null,
        oField: null,
        onFilter: function () {
            let that = this;
            if (!this.oPopupSupplier) {
                Fragment.load({
                    name: "infy.com.fragments.popup",
                    id: 'supplier',
                    controller: this
                }).then(function (oFragment) {
                    that.oPopupSupplier = oFragment;
                    that.oPopupSupplier.setTitle("Supplier");
                    //Grant the access to the fragment from the View to the Model
                    that.getView().addDependent(that.oPopupSupplier);
                    //4th binding syntax for aggregation binding
                    that.oPopupSupplier.bindAggregation("items", {
                        path: '/suppliers',
                        template: new sap.m.ObjectListItem({
                            title: '{name}',
                            intro: '{sinceWhen}',
                            number: '{contactNo}'
                        })
                    });
                    that.oPopupSupplier.open();
                });
            } else {
                this.oPopupSupplier.open();
            }
        },
        onF4Help: function (oEvent) {
            //This is being used in onConfirmPopup get get the source Field 
            this.oField = oEvent.getSource();

            let that = this;
            if (!this.oCityPopup) {
                Fragment.load({
                    name: "infy.com.fragments.popup",
                    id: 'city',
                    controller: this
                }).then(function (oFragment) {
                    that.oCityPopup = oFragment;
                    that.oCityPopup.setTitle("Cities");
                    that.oCityPopup.setMultiSelect(false);
                    //Grant the access to the fragment from the View to the Model
                    that.getView().addDependent(that.oCityPopup);
                    //4th binding syntax for aggregation binding
                    that.oCityPopup.bindAggregation("items", {
                        path: '/cities',
                        template: new sap.m.ObjectListItem({
                            title: '{name}',
                            intro: '{famousFor}',
                            number: '{otherName}'
                        })
                    });
                    that.oCityPopup.open();
                });
            } else {
                this.oCityPopup.open();
            }
        },
        onConfirmPopup: function (oEvent) {
            let sId = oEvent.getSource().getId();
            if (sId.indexOf("city") != -1) {
                let oSelectedItemObject = oEvent.getParameter("selectedItem");
                let sText = oSelectedItemObject.getTitle();
                this.oField.setValue(sText);
            }else{
                //User Selects Multiple Suppliers, Set them on the UI
                let aItems = oEvent.getParameter("selectedItems");
                let aFilter = [];
                for (let i = 0; i < aItems.length; i++) {
                    const element = aItems[i];
                    let sTitle = element.getTitle();
                    let oFilter = new Filter("name", FilterOperator.EQ, sTitle);
                    aFilter.push(oFilter);    
                }
                let oFinalFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
                this.getView().byId("idTable").getBinding("items").filter(oFinalFilter);
            }
        },
        onSearchDialog: function (oEvent) {
            let sValue = oEvent.getParameter("value");
            let oFilter = new Filter("name", FilterOperator.Contains, sValue);
            let oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter(oFilter);
        },
        onItemPressSupp: function(oEvent){
            let sPath = oEvent.getParameter("listItem").getBindingContextPath();
            let supplierId = sPath.split("/").pop();
            this.oRouter.navTo("ironman", {
                suppId: supplierId
            });
        },
    });
});