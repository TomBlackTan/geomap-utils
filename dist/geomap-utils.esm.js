/*!
  * geomap-utils v0.1.0
  * (c) 2018 Esri China PS
  * @license MIT
  */
/**
 * 根据图层的title获取图层
 * @author  lee  20181209
 * @param {object} view  场景
 * @param {string} title  名称
 */
function getLayerByTitle(view, title) {
  var foundLayer = view.map.layers.find(function (lyr) {
    return lyr.title === title;
  });
  return foundLayer;
}
/**
 * @summary 根据图层的索引获取图层
 * @description 适用范围：二、三维
 * @author  lee  20181209
 * @param {*} view  场景
 * @param {*} index  图层索引
 */
function getLayerByIndex(view, index) {
  var foundLayer = view.map.layers.getItemAt(index);
  return foundLayer;
}
/**
 * @summary 根据图层的id获取图层
 * @author  lee  20181209
 * @param {*} view  场景
 * @param {*} id  图层id
 */
function getLayerById(view, index) {
  var foundLayer = view.map.findLayerById();
  return foundLayer;
}
/**
 * 根据图层名称，控制图层显隐藏
 * @author  lee  20181208
 * @param {*} view  场景
 * @param {*} title  名称
 * @param {*} visible 显示/隐藏  true or false
 */
function setLayerVisible(view, title, visible) {
  var foundLayer = getLayerByTitle(view, title);
  foundLayer.visible = visible;
}
/**
 * 根据要素的ObjectId高亮
 * @author  lee  20181208
 * @param {*} view  场景
 * @param {*} title  名称
 * @param {*} objectid 高亮要素的objectid
 */
function highlightByLayerObjid(view, title, objectid) {
  var foundLayer = getLayerByTitle(view, title);
  view.whenLayerView(foundLayer).then(function (view) {
    view.highlight(objectid * 1);
  });
}
/**
 * 根据条件过滤要素图层中符合条件的要素
 * @author  lee  20181209
 * @param {*} layer  图层
 * @param {*} queryWhere  查询条件
 */
function queryFeathersFromLayer(layer, queryWhere) {
  var queryString = layer.createQuery();
  queryString.where = queryWhere;
  return layer.queryFeatures(queryString);
}
/**
 * 根据图层,Graphic或Feature
 * @author  liugh  20181209
 * @param {*} view view
 * @param {*} layer 图层
 * @param {*} graphic  要高亮的要素
 * @param {*} isGoto 是否跳转
 */
function highlightByLayerGraphic(view, layer, graphic, isGoto) {
  var highlightSelect = null;
  view.whenLayerView(layer).then(function(layerView) {
    if (highlightSelect) { highlightSelect.remove(); }
    highlightSelect = layerView.highlight(graphic);
  });
  view.on("click", function (e) {
    if (highlightSelect) { highlightSelect.remove(); }
  });
  if (isGoto) {
    view.goTo(
      {
        target: graphic.geometry,
        tilt: 70
      },
      {
        duration: 2000,
        easing: "in-out-expo"
      }
    );
  }
}
var mapViewUtil = {getLayerByTitle: getLayerByTitle,getLayerByIndex: getLayerByIndex,getLayerById: getLayerById,setLayerVisible: setLayerVisible,highlightByLayerObjid: highlightByLayerObjid,queryFeathersFromLayer: queryFeathersFromLayer,queryFeathersFromLayer: queryFeathersFromLayer,highlightByLayerGraphic: highlightByLayerGraphic};

/**
 * 根据幻灯片的名称，切换到对应的视角
 * @author  lee 
 * @param {*} view  场景
 * @param {*} title  幻灯片的名称
 */
function gotoBySliderName(view, title) {
  var slides = view.map.presentation.slides.items;
  var options = {
    duration: 3000,
    maxDuration: 3000
  };
  // 飞行到视线分析 幻灯片
  slides.forEach(function (slide) {
    if (slide.title.text === title) {
      view.goTo(slide.viewpoint, options);
    }
  });
}

var sceneViewUtil = { gotoBySliderName: gotoBySliderName };

var viewUtil = {
  map2d: mapViewUtil,
  map3d: sceneViewUtil
};

var utils = {
  view: viewUtil
};

if (typeof window !== "undefined") {
  // running in browser
  // inject the utils into window
  window.agsUtils = utils;
}

var utils$1 = /*#__PURE__*/Object.freeze({
  default: utils
});

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var require$$0 = getCjsExportFromNamespace(utils$1);

var geomapUtils = require$$0;

export default geomapUtils;
