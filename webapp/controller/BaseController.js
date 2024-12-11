sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'infy/com/util/lifeSaver'
], function(Controller, lifeSaver,) {
    'use strict';
    return Controller.extend("infy.com.controller.BaseController", {
        formatter: lifeSaver,
    });
});