"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var AccountPage_module_css_1 = require("@/app/styles/AccountPage.module.css");
function ModelUpload(_a) {
    var setModelURL = _a.setModelURL, setModelFormat = _a.setModelFormat, setShowModelPreview = _a.setShowModelPreview;
    function handleModelUpload(e) {
        var model = e.target.files[0];
        if (model) {
            var format = model.name.split('.').pop().toLowerCase();
            var url = URL.createObjectURL(model);
            setModelFormat(format);
            console.log(format);
            setModelURL(url);
            setShowModelPreview(true);
        }
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("input", { onChange: function (e) { return handleModelUpload(e); }, id: "model-upload", type: "file" }),
        react_1["default"].createElement("label", { htmlFor: "model-upload", id: AccountPage_module_css_1["default"]["custom-model-input"] },
            react_1["default"].createElement("div", { style: {
                    fontSize: "48px"
                } },
                react_1["default"].createElement(image_1["default"], { src: "/img/add_model.svg", width: 32, height: 32, alt: "" })),
            react_1["default"].createElement("div", null, "\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C"))));
}
exports["default"] = ModelUpload;
