/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let ObjCount = 0;\nlet ObservedObj = [];\nlet net;\nconst classifier = knnClassifier.create();\nconst webcamElement = document.getElementById('webcam');\n\nasync function app() {\n  console.log('Loading mobilenet..');\n\n  // Load the model.\n  net = await mobilenet.load();\n  console.log('Successfully loaded model');\n\n  // Create an object from Tensorflow.js data API which could capture image \n  // from the web camera as Tensor.\n  const webcam = await tf.data.webcam(webcamElement);\n\n  // Reads an image from the webcam and associates it with a specific class\n  // index.\n  const addExample = async () => {\n    ObjCount++;\n    const name = document.getElementById(\"image-name\").value;\n    ObservedObj[ObjCount] = name;\n    // Capture an image from the web camera.\n    const img = await webcam.capture();\n\n    // Get the intermediate activation of MobileNet 'conv_preds' and pass that\n    // to the KNN classifier.\n    const activation = net.infer(img, true);\n\n    // Pass the intermediate activation to the classifier.\n    classifier.addExample(activation, ObjCount);\n    // document.getElementById(\"learned-list\").innerHTML = \n    //   {ObservedObj.map(each => {\n    //     <li key={each.index}>{each.name}</li>\n    //   })}\n    \n    // Dispose the tensor to release the memory.\n    img.dispose();\n  };\n\n  // When clicking a button, add an example for that class.\n  document.getElementById('add-name').addEventListener('click', () => addExample());\n\n  while (true) {\n    if (classifier.getNumClasses() > 0) {\n      const img = await webcam.capture();\n\n      // Get the activation from mobilenet from the webcam.\n      const activation = net.infer(img, 'conv_preds');\n      // Get the most likely class and confidence from the classifier module.\n      const result = await classifier.predictClass(activation);\n\n      document.getElementById('output').innerText = `\n        prediction: ${ObservedObj[result.label]}\\n\n        probability: ${result.confidences[result.label]}\n      `;\n\n      // Dispose the tensor to release the memory.\n      img.dispose();\n    }\n\n    await tf.nextFrame();\n  }\n}\napp();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });