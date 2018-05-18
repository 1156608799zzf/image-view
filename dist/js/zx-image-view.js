(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "11c0be40f08dff1a60cd"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "zx-image-view";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/index.js")(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_css-loader@0.28.11@css-loader/index.js!./node_modules/_postcss-loader@2.1.5@postcss-loader/lib/index.js!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!./src/style/image-preview.styl":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.11@css-loader!./node_modules/_postcss-loader@2.1.5@postcss-loader/lib!./node_modules/_stylus-loader@3.0.2@stylus-loader!./src/style/image-preview.styl ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js */ \"./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".zx-image-preview-wrapper {\\n  position: fixed;\\n  z-index: 9999;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(0,0,0,0.6);\\n}\\n.zx-image-preview-wrapper ._cur {\\n  cursor: pointer;\\n}\\n.zx-image-preview-wrapper .zip-close {\\n  position: absolute;\\n  z-index: 2;\\n  top: 0;\\n  right: 0;\\n  width: 50px;\\n  height: 50px;\\n  -webkit-transform: rotate(45deg);\\n          transform: rotate(45deg);\\n  opacity: 0.6;\\n}\\n.zx-image-preview-wrapper .zip-close:before {\\n  position: absolute;\\n  top: 24px;\\n  left: 5px;\\n  width: 40px;\\n  height: 2px;\\n  background-color: #fff;\\n  content: '';\\n}\\n.zx-image-preview-wrapper .zip-close:after {\\n  position: absolute;\\n  top: 5px;\\n  left: 24px;\\n  height: 40px;\\n  width: 2px;\\n  background-color: #fff;\\n  content: '';\\n}\\n.zx-image-preview-wrapper .zip-close:hover {\\n  opacity: 0.8;\\n}\\n.zx-image-preview-wrapper .zip-tool-wrapper {\\n  position: absolute;\\n  z-index: 2;\\n  left: 50%;\\n  bottom: 40px;\\n  -webkit-transform: translateX(-50%);\\n          transform: translateX(-50%);\\n  height: 40px;\\n  background-color: rgba(255,255,255,0.5);\\n}\\n.zx-image-preview-wrapper .zip-tool-wrapper ._item {\\n  display: inline-block;\\n}\\n.zx-image-preview-wrapper .zip-totalbar-wrapper {\\n  position: absolute;\\n  z-index: 2;\\n  left: 50%;\\n  bottom: 30px;\\n  -webkit-transform: translateX(-50%);\\n          transform: translateX(-50%);\\n  height: 2px;\\n  width: 60%;\\n  text-align: center;\\n}\\n.zx-image-preview-wrapper .zip-totalbar-wrapper ._item {\\n  display: inline-block;\\n  max-width: 30px;\\n  height: 2px;\\n  opacity: 0.5;\\n  border-left: 1px solid transparent;\\n  border-right: 1px solid transparent;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n}\\n.zx-image-preview-wrapper .zip-totalbar-wrapper ._item:after {\\n  display: block;\\n  content: '';\\n  width: 100%;\\n  height: 2px;\\n  background-color: #fff;\\n}\\n.zx-image-preview-wrapper .zip-totalbar-wrapper ._item._item-active {\\n  opacity: 0.9;\\n}\\n.zx-image-preview-wrapper .zip-picture {\\n  position: absolute;\\n  margin: 0;\\n  padding: 0;\\n  cursor: move;\\n  -webkit-transition: all 0.3s ease;\\n  transition: all 0.3s ease;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/style/image-preview.styl?./node_modules/_css-loader@0.28.11@css-loader!./node_modules/_postcss-loader@2.1.5@postcss-loader/lib!./node_modules/_stylus-loader@3.0.2@stylus-loader");

/***/ }),

/***/ "./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js":
/*!*********************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js":
/*!*************************************************************************!*\
  !*** ./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target) {\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertInto + \" \" + options.insertAt.before);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js":
/*!********************************************************************!*\
  !*** ./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/js/dom.js":
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Created by zx1984 5/16/2018\n * https://github.com/zx1984\n */\nvar d = document;\nexports.default = {\n  /**\n   * 创建dom节点\n   * @param vnode 虚拟dom节点配置对象\n   * @returns {*}\n   */\n  create: function create(vnode) {\n    var _this = this;\n\n    if (typeof vnode === 'string') return d.createTextNode(vnode);\n    var tag = vnode.tag;\n    var attrs = vnode.attrs || {};\n    var children = vnode.child || [];\n    if (!tag) return null;\n    var $el = d.createElement(tag);\n    // attrs\n    for (var attrName in attrs) {\n      if (attrs.hasOwnProperty(attrName)) {\n        $el.setAttribute(attrName, attrs[attrName]);\n      }\n    }\n    // children\n    children.forEach(function (item) {\n      $el.appendChild(_this.create(item));\n    });\n    return $el;\n  },\n\n  /**\n   * 选择满足条件的dom节点\n   * @param selector\n   * @param context\n   * @returns {Element}\n   */\n  query: function query(selector) {\n    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;\n\n    return context.querySelector(selector);\n  },\n\n  /**\n   * 选择满足条件的所有dom节点\n   * @param selector\n   * @param context\n   * @returns {NodeList}\n   */\n  queryAll: function queryAll(selector) {\n    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d;\n\n    return context.querySelectorAll(selector);\n  },\n\n  /**\n   * 添加dom元素至body内\n   * @param $el\n   * @returns {boolean}\n   */\n  appendToBody: function appendToBody($el) {\n    var $body = this.query('body');\n    if ($body) {\n      $body.appendChild($el);\n      return true;\n    }\n    return false;\n  }\n};\n\n//# sourceURL=webpack:///./src/js/dom.js?");

/***/ }),

/***/ "./src/js/img-controls.js":
/*!********************************!*\
  !*** ./src/js/img-controls.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _util = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\nvar _util2 = _interopRequireDefault(_util);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar MIN_SIZE = 60; /**\n                    * Create by zx1984\n                    * 2018/5/16 0016.\n                    * https://github.com/zx1984\n                    */\nexports.default = {\n  /**\n   * 缩放\n   */\n  scale: function scale($img, e) {\n    var wheelDelta = e.wheelDelta || -e.detail;\n    if (wheelDelta > 0) {\n      // 放大\n      this._scaleHandler($img, e, true);\n    } else {\n      // 缩小\n      this._scaleHandler($img, e);\n    }\n  },\n\n\n  // @param isEnlarge 是否放大\n  _scaleHandler: function _scaleHandler($img, e, isEnlarge) {\n    var naturalWidth = $img.naturalWidth;\n    // let naturalHeight = $img.naturalHeight\n    var imgWidth = $img.width;\n    var imgHeight = $img.height;\n    var iw = void 0,\n        ih = void 0;\n    if (isEnlarge) {\n      iw = imgWidth * 1.4;\n      // 最大放大2倍\n      if (iw >= naturalWidth * 3) return;\n    } else {\n      // 图片实际尺寸小于最小限制尺寸\n      if (naturalWidth < MIN_SIZE) return;\n      iw = imgWidth * 0.6;\n      if (iw <= MIN_SIZE) return;\n    }\n    ih = iw * imgHeight / imgWidth;\n    $img.style.width = iw + 'px';\n    $img.style.height = ih + 'px';\n    // 图片增加的宽度、高度\n    var addW = iw - imgWidth;\n    var addH = ih - imgHeight;\n    var css = _util2.default.getStyleValue($img);\n    $img.style.top = _util2.default.int(_util2.default.toNumber(css.top) - addH / 2) + 'px';\n    $img.style.left = _util2.default.int(_util2.default.toNumber(css.left) - addW / 2) + 'px';\n  },\n\n\n  // 旋转\n  rotate: function rotate($img, angle) {\n    // console.error(angle)\n    $img.style.transform = 'rotate(' + angle + 'deg)';\n    // console.log(this.$img)\n    this._initImagePosition($img, angle);\n  },\n\n\n  // 移动\n  move: function move($img, e) {},\n\n\n  // 设置图片显示尺寸及位置\n  _initImagePosition: function _initImagePosition($img, angle) {\n    // 是否旋转\n    var isRotate = _util2.default.int(angle / 90) % 2;\n    var imgWidth = void 0,\n        imgHeight = void 0,\n        iw = void 0,\n        ih = void 0,\n        winRatio = void 0,\n        imgRatio = void 0;\n    // 屏幕尺寸\n    var winWidth = window.innerWidth;\n    var winHeight = window.innerHeight;\n    winRatio = winWidth / winHeight;\n    // 图片原始尺寸\n    imgWidth = $img.naturalWidth;\n    imgHeight = $img.naturalHeight;\n    imgRatio = imgWidth / imgHeight;\n\n    if (isRotate) {\n      imgRatio = imgHeight / imgWidth;\n      if (imgRatio > winRatio) {\n        ih = imgHeight > winWidth * 0.9 ? winWidth * 0.9 : imgHeight;\n        iw = ih * imgWidth / imgHeight;\n        $img.style.width = iw + 'px';\n        $img.style.height = ih + 'px';\n        // $img.style.top = (winHeight - ih) / 2 + 'px'\n      } else {\n        iw = imgWidth > winHeight * 0.9 ? winHeight * 0.9 : imgWidth;\n        ih = iw * imgHeight / imgWidth;\n        $img.style.width = iw + 'px';\n        $img.style.height = ih + 'px';\n      }\n      // $img.style.top = (winHeight - ih) / 2 + 'px'\n      // $img.style.left = (winWidth - iw) / 2 + 'px'\n    } else {\n      if (imgRatio > winRatio) {\n        iw = imgWidth > winWidth * 0.9 ? winWidth * 0.9 : imgWidth;\n        ih = iw * imgHeight / imgWidth;\n        $img.style.width = iw + 'px';\n        $img.style.height = ih + 'px';\n        // $img.style.top = (winHeight - ih) / 2 + 'px'\n      } else {\n        ih = imgHeight > winHeight * 0.9 ? winHeight * 0.9 : imgHeight;\n        iw = ih * imgWidth / imgHeight;\n        $img.style.width = iw + 'px';\n        $img.style.height = ih + 'px';\n      }\n    }\n    $img.style.top = (winHeight - ih) / 2 + 'px';\n    $img.style.left = (winWidth - iw) / 2 + 'px';\n    // console.log(winWidth, winHeight)\n    // console.log(iw, ih)\n    // console.log(imgRatio, winRatio)\n  }\n};\n\n//# sourceURL=webpack:///./src/js/img-controls.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ZxImageView = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Create by zx1984\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018/5/16 0016.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/zx1984\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n\n__webpack_require__(/*! ../style/image-preview.styl */ \"./src/style/image-preview.styl\");\n\nvar _util = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n\nvar _util2 = _interopRequireDefault(_util);\n\nvar _dom = __webpack_require__(/*! ./dom */ \"./src/js/dom.js\");\n\nvar _dom2 = _interopRequireDefault(_dom);\n\nvar _imgControls = __webpack_require__(/*! ./img-controls */ \"./src/js/img-controls.js\");\n\nvar _imgControls2 = _interopRequireDefault(_imgControls);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// 默认配置\nvar __DEFAULT = {\n  // 显示上一张箭头\n  showPrev: true,\n  // 显示下一张箭头\n  showNext: true,\n  // 缩放\n  scale: true,\n  // 旋转\n  rotate: true,\n  // 移动\n  move: true,\n  // 按键配置\n  keys: {\n    prev: 'left',\n    next: 'right',\n    // [放大，缩小]\n    scale: 'wheel',\n    // [Clockwise 顺时针, anticlockwise 逆时针]\n    rotate: ['up', 'down'],\n    close: 'esc'\n  }\n};\n\nvar log = console.log;\n\nvar Z_INDEX = 9999;\n\nvar ZxImageView = function () {\n  function ZxImageView(opts, itemSelector) {\n    _classCallCheck(this, ZxImageView);\n\n    // preview是否显示\n    this.isPreview = false;\n    // 预览容器\n    this.$container = _dom2.default.create({\n      tag: 'div',\n      attrs: {\n        class: 'zx-image-preview-wrapper',\n        style: 'display:none'\n      }\n    });\n    // 关闭按钮\n    this.$close = _dom2.default.create({\n      tag: 'div',\n      attrs: {\n        class: 'zip-close _cur'\n      }\n    });\n    // 预览图片\n    this.$img = _dom2.default.create({\n      tag: 'img',\n      attrs: {\n        class: 'zip-picture'\n      }\n    });\n    // 工具栏\n    this.$tool = _dom2.default.create({\n      tag: 'div',\n      attrs: {\n        class: 'zip-tool-wrapper'\n      },\n      child: [\n        // {\n        //   tag: 'span',\n        //   attrs: {\n        //     class: '_item _rotate-hook'\n        //   },\n        //   child: ['旋转']\n        // }\n      ]\n    });\n    // 数量栏\n    this.$totalBar = _dom2.default.create({\n      tag: 'div',\n      attrs: {\n        class: 'zip-totalbar-wrapper'\n      }\n    });\n    this.$container.appendChild(this.$close);\n    this.$container.appendChild(this.$img);\n    this.$container.appendChild(this.$tool);\n    this.$container.appendChild(this.$totalBar);\n    // 是否添加到body\n    this.isAppendToBody = _dom2.default.appendToBody(this.$container);\n    // 图片元素数据\n    this.$images = [];\n    // 缩略图容器\n    this.$thumbContailner = null;\n    this.index = 0;\n    // 事件处理器\n    this._eventHandler();\n    this.thumbSelector = 'img';\n    // 初始化参数处理\n    if (opts) {\n      // dom元素\n      if (_util2.default.isHTMLElement(opts)) {\n        this.init(opts, itemSelector);\n      } else if (typeof opts === 'string') {\n        // 缩略图标识\n        this.thumbSelector = opts;\n      }\n    }\n  }\n\n  // 初始化\n\n\n  _createClass(ZxImageView, [{\n    key: 'init',\n    value: function init($itemContainer, selector) {\n      if (!this.isAppendToBody) {\n        this.isAppendToBody = _dom2.default.appendToBody(this.$container);\n      }\n      if (!_util2.default.isHTMLElement($itemContainer)) {\n        throw new Error('init\\u53C2\\u6570' + $itemContainer + '\\u975Ehtml\\u5143\\u7D20');\n      }\n      this._thumbBindEvent($itemContainer);\n      if (typeof selector === 'string') {\n        this.thumbSelector = selector;\n      }\n      // 获取图片元素\n      var $images = $itemContainer.querySelectorAll(this.thumbSelector);\n      this._reset$Images($images);\n    }\n\n    // 重置图片thumb列表数据\n\n  }, {\n    key: '_reset$Images',\n    value: function _reset$Images($images) {\n      var _this2 = this;\n\n      if ($images) {\n        var html = '';\n        this.$images = _util2.default.slice($images);\n        var len = this.$images.length;\n        this.$images.forEach(function (item, index) {\n          html += '<i style=\"width:' + Math.floor(1 / len * 100) + '%\" data-index=\"' + index + '\" class=\"_item' + (_this2.index === index ? ' _item-active' : '') + '\"></i>';\n        });\n        this.$totalBar.innerHTML = html;\n      }\n    }\n\n    // 更新数据\n\n  }, {\n    key: 'update',\n    value: function update($images) {\n      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n      if ($images instanceof NodeList) {\n        this._reset$Images($images);\n      }\n    }\n  }, {\n    key: 'push',\n    value: function push($images) {\n      if ($images instanceof NodeList) {\n        var $newArr = this.$images.concat(_util2.default.slice($images));\n        this._reset$Images($newArr);\n      }\n    }\n\n    // 销毁对象\n\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      var $body = document.querySelector('body');\n      try {\n        $body.removeChild(this.$container);\n        this.$container = null;\n      } catch (e) {}\n    }\n\n    // 缩略图事件绑定\n\n  }, {\n    key: '_thumbBindEvent',\n    value: function _thumbBindEvent($itemContainer) {\n      var _this3 = this;\n\n      // 缩略图容器\n      if (this.$thumbContailner && $itemContainer !== this.$thumbContailner) {\n        this.$thumbContailner.removeEventListener('click', function (e) {\n          _this3._thumbClickHandler(e);\n        });\n      }\n      this.$thumbContailner = $itemContainer;\n      this.$thumbContailner.addEventListener('click', function (e) {\n        _this3._thumbClickHandler(e);\n      });\n    }\n\n    // 缩略图容器事件处理\n\n  }, {\n    key: '_thumbClickHandler',\n    value: function _thumbClickHandler(e) {\n      var $img = e.target;\n      var isItem = this.$images.some(function (item) {\n        return item === $img;\n      });\n      if (!isItem) return;\n      this.show();\n      this._resetCurrent$img($img);\n      this._getThumbIndex($img);\n      this._changeTotalBarClass();\n    }\n\n    // 获取当前图片index\n\n  }, {\n    key: '_getThumbIndex',\n    value: function _getThumbIndex($img) {\n      var index = this.$images.indexOf($img);\n      this.index = index !== -1 ? index : 0;\n      // console.error('this.index: ' + this.index)\n    }\n\n    // 重置当前图片\n\n  }, {\n    key: '_resetCurrent$img',\n    value: function _resetCurrent$img($img) {\n      $img = $img || this.$images[this.index];\n      this.$img.src = $img.src;\n      var angle = _util2.default.int($img.getAttribute('rotate-angle'));\n      log('index.js _resetCurrent$img() angle: ' + angle);\n      // 根据缩略图设置的旋转角度，重置预览图片的旋转角度\n      this.$img.setAttribute('rotate-angle', angle);\n      _imgControls2.default.rotate(this.$img, angle);\n    }\n  }, {\n    key: '_eventHandler',\n    value: function _eventHandler() {\n      var _this4 = this;\n\n      // 鼠标在图片上按下\n      var isMousedownOnImage = false;\n      // 关闭\n      this.$close.addEventListener('click', function (e) {\n        e.stopPropagation();\n        _this4.hide();\n      });\n\n      // 点击图片\n      this.$img.addEventListener('click', function (e) {\n        e.stopPropagation();\n      });\n\n      // 拖动图片\n      // this.$img.addEventListener('drag', e => {\n      //   e.preventDefault()\n      //   e.stopPropagation()\n      // })\n      //\n      // // 拖动图片\n      // this.$img.addEventListener('dragend', e => {\n      //   isMousedownOnImage = false\n      //   e.preventDefault()\n      //   e.stopPropagation()\n      // })\n\n      // 点击preview容器\n      this.$container.addEventListener('click', function (e) {\n        _this4.hide();\n      });\n\n      // 工具栏点击事件\n      this.$tool.addEventListener('click', function (e) {\n        e.stopPropagation();\n        var $el = e.target;\n        var isToolItem = $el.classList.contains('_item');\n        if (!isToolItem) return;\n        // 旋转\n        if ($el.classList.contains('_rotate-hook')) {\n          _this4.rotate();\n        }\n        log($el.className);\n      });\n\n      // 点击统计栏\n      this.$totalBar.addEventListener('mouseover', function (e) {\n        _this4._handleClickTotalBar(e);\n      });\n\n      // 点击统计栏\n      this.$totalBar.addEventListener('click', function (e) {\n        e.stopPropagation();\n        // this._handleClickTotalBar(e)\n      });\n\n      // 键盘事件\n      window.addEventListener('keyup', function (e) {\n        isMousedownOnImage = false;\n        if (!_this4.isPreview) return;\n        // 阻止方向键移动元素或滚动条\n        e.preventDefault();\n        var keyCode = e.keyCode;\n        // log(keyCode, e.key, e.code, e.which)\n        // log(e)\n        switch (keyCode) {\n          // prev\n          case 37:\n            _this4.prev();\n            break;\n          // next\n          case 39:\n            _this4.next();\n            break;\n          // rotate up\n          case 38:\n            _this4.rotate();\n            break;\n          // rotate down\n          case 40:\n            _this4.rotate(true);\n            break;\n          case 27:\n            _this4.hide();\n            break;\n        }\n        // e.preventDefault()\n      });\n\n      // 鼠标滚动事件\n      window.addEventListener('mousewheel', wheelHandler);\n      // 火狐鼠标滚动事件\n      window.addEventListener('DOMMouseScroll', wheelHandler);\n\n      var _this = this;\n\n      function wheelHandler(e) {\n        if (!_this.isPreview) return;\n        // log(e)\n        var $el = e.target;\n        if ($el !== _this.$img) return;\n        _imgControls2.default.scale($el, e);\n      }\n\n      /* 拖动 *************************************** */\n      // 鼠标按下位置图片左上角位置\n      var moveBeforePostion = {};\n      // 图片位置\n      var mouseDownImgPosition = {};\n      // 开始\n      this.$img.addEventListener('mousedown', function (e) {\n        // log(e.type)\n        // 防止触发浏览器图片拖动行为\n        e.preventDefault();\n        isMousedownOnImage = true;\n        // log(isMousedownOnImage)\n        moveBeforePostion.x = e.clientX - _this4.$img.offsetLeft;\n        moveBeforePostion.y = e.clientY - _this4.$img.offsetTop;\n      });\n\n      var l = void 0,\n          t = void 0;\n      // 拖动\n      document.addEventListener('mousemove', function (e) {\n        if (!isMousedownOnImage) return;\n        e.preventDefault();\n        log(e.type);\n        var $img = _this4.$img;\n\n        l = e.clientX - moveBeforePostion.x;\n        t = e.clientY - moveBeforePostion.y;\n\n        $img.style.left = l + 'px';\n        $img.style.top = t + 'px';\n      });\n\n      // 释放鼠标\n      document.addEventListener('mouseup', function (e) {\n        isMousedownOnImage = false;\n      });\n    }\n\n    // 点击或鼠标滑过统计栏处理\n\n  }, {\n    key: '_handleClickTotalBar',\n    value: function _handleClickTotalBar(e) {\n      if (this.$images.length <= 1) return;\n      // e.stopPropagation()\n      var $el = e.target;\n      var isToolItem = $el.classList.contains('_item');\n      if (!isToolItem) return;\n      var index = $el.getAttribute('data-index') >>> 0;\n      // 当前点击index和this.index相同\n      if (this.index === index) return;\n      this.index = index;\n      this._changeTotalBarClass($el);\n      this._resetCurrent$img();\n    }\n\n    // 修改统计栏item样式\n\n  }, {\n    key: '_changeTotalBarClass',\n    value: function _changeTotalBarClass($el) {\n      $el = $el || this.$totalBar.querySelectorAll('._item')[this.index];\n      this.$totalBar.querySelector('._item-active').classList.remove('_item-active');\n      $el.classList.add('_item-active');\n    }\n\n    // 隐藏图片预览\n\n  }, {\n    key: 'hide',\n    value: function hide() {\n      if (this.$container) {\n        this.$container.style.display = 'none';\n        this.isPreview = false;\n      }\n    }\n\n    // 显示图片预览\n\n  }, {\n    key: 'show',\n    value: function show() {\n      if (this.$container) {\n        var zIndex = _util2.default.getMaxZindex();\n        if (zIndex > Z_INDEX) {\n          this.$container.style.zIndex = zIndex;\n        }\n        this.$container.style.display = 'block';\n        this.isPreview = true;\n      }\n    }\n  }, {\n    key: 'prev',\n    value: function prev() {\n      this._switchImage('prev');\n    }\n  }, {\n    key: 'next',\n    value: function next() {\n      this._switchImage('next');\n    }\n\n    /**\n     * 旋转\n     * @param isAnticlockwise 是否逆时针\n     */\n\n  }, {\n    key: 'rotate',\n    value: function rotate(isAnticlockwise) {\n      var deg = isAnticlockwise ? -90 : 90;\n      var angle = _util2.default.int(this.$img.getAttribute('rotate-angle')) + deg;\n      this.$img.setAttribute('rotate-angle', angle);\n      _imgControls2.default.rotate(this.$img, angle);\n    }\n\n    // 切换\n\n  }, {\n    key: '_switchImage',\n    value: function _switchImage(type) {\n      var maxIndex = this.$images.length - 1;\n      if (maxIndex <= 0) return;\n      switch (type) {\n        case 'prev':\n          if (+this.index === 0) {\n            this.index = maxIndex;\n          } else {\n            this.index--;\n          }\n          break;\n        case 'next':\n          if (+this.index >= maxIndex) {\n            this.index = 0;\n          } else {\n            this.index++;\n          }\n          break;\n      }\n      var $img = this.$images[this.index];\n      this.$img.src = $img.src;\n      var angle = _util2.default.int($img.getAttribute('rotate-angle'));\n      // 根据缩略图设置的旋转角度，重置预览图片的旋转角度\n      this.$img.setAttribute('rotate-angle', angle);\n      _imgControls2.default.rotate(this.$img, angle);\n      this._changeTotalBarClass();\n    }\n  }]);\n\n  return ZxImageView;\n}();\n\nexports.ZxImageView = ZxImageView;\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Create by zx1984\n * 2018/5/16 0016.\n * https://github.com/zx1984\n */\nexports.default = {\n  /**\n   * 判断是否为HTML元素对象\n   * @param $el\n   * @returns {*|boolean}\n   */\n  isHTMLElement: function isHTMLElement($el) {\n    return $el && $el instanceof HTMLElement;\n  },\n\n  /**\n   * 转为为整型\n   * @param n\n   * @returns {*}\n   */\n  int: function int(n) {\n    var m = parseInt(n);\n    return isNaN(m) ? 0 : m;\n  },\n\n  /**\n   * 转为数字\n   * @param n\n   * @returns {*}\n   */\n  toNumber: function toNumber(n) {\n    var m = parseFloat(n);\n    return isNaN(m) ? 0 : m;\n  },\n\n  /**\n   * 获取el样式属性值\n   * @param el 必须\n   * @param attr 可选参数，指定的某一个样式属性名\n   * @returns {*}\n   */\n  getStyleValue: function getStyleValue(el, attr) {\n    if (!this.isHTMLElement(el)) return null;\n    var css = getComputedStyle(el, null);\n    var result = null;\n    if (attr) {\n      try {\n        result = css[this.toHumpStr(attr)];\n      } catch (e) {}\n    } else {\n      result = css;\n    }\n    return result;\n  },\n  getMaxZindex: function getMaxZindex() {\n    var els = document.getElementsByTagName('*');\n    var el = void 0,\n        css = void 0,\n        zindex = void 0;\n    var arr = [];\n    for (var i = 0; i < els.length; i++) {\n      el = els[i];\n      if (el.nodeType !== 1) continue;\n      css = this.getStyleValue(el);\n      if (css.position !== 'static') {\n        zindex = this.toNumber(css.zIndex);\n        if (zindex > 0) arr.push(zindex);\n      }\n    }\n    return Math.max.apply(null, arr) >>> 0;\n  },\n\n  /**\n   * 将字符串转换为驼峰写法\n   * 比如：z-index => zIndex\n   * @param attr\n   * @param spacer\n   * @returns {*}\n   */\n  toHumpStr: function toHumpStr(attr) {\n    var spacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';\n\n    if (typeof attr !== 'string') {\n      attr = attr.toString();\n    }\n    var arr = attr.split(spacer);\n    var len = arr.length;\n    if (len <= 1) return attr;\n    // 不考虑有前缀的属性-webkit-flex\n    var str = arr[0];\n    for (var i = 1; i < len; i++) {\n      str += arr[i].toUpperCase()[0] + arr[i].substr(1);\n    }\n    return str;\n  },\n  slice: function slice(arr) {\n    return Array.prototype.slice.call(arr);\n  }\n};\n\n//# sourceURL=webpack:///./src/js/util.js?");

/***/ }),

/***/ "./src/style/image-preview.styl":
/*!**************************************!*\
  !*** ./src/style/image-preview.styl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/_css-loader@0.28.11@css-loader!../../node_modules/_postcss-loader@2.1.5@postcss-loader/lib!../../node_modules/_stylus-loader@3.0.2@stylus-loader!./image-preview.styl */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js!./node_modules/_postcss-loader@2.1.5@postcss-loader/lib/index.js!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!./src/style/image-preview.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js */ \"./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/_css-loader@0.28.11@css-loader!../../node_modules/_postcss-loader@2.1.5@postcss-loader/lib!../../node_modules/_stylus-loader@3.0.2@stylus-loader!./image-preview.styl */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js!./node_modules/_postcss-loader@2.1.5@postcss-loader/lib/index.js!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!./src/style/image-preview.styl\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/_css-loader@0.28.11@css-loader!../../node_modules/_postcss-loader@2.1.5@postcss-loader/lib!../../node_modules/_stylus-loader@3.0.2@stylus-loader!./image-preview.styl */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js!./node_modules/_postcss-loader@2.1.5@postcss-loader/lib/index.js!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js!./src/style/image-preview.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t})(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/style/image-preview.styl?");

/***/ })

/******/ });
});