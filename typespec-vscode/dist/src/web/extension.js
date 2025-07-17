"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/web/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);

// src/log/extension-log-listener.ts
var import_vscode = __toESM(require("vscode"));
function getPopupAction(loglevel) {
  switch (loglevel) {
    case "error":
      return import_vscode.default.window.showErrorMessage;
    case "warn":
      return import_vscode.default.window.showWarningMessage;
    case "debug":
    case "info":
      return import_vscode.default.window.showInformationMessage;
    default:
      return void 0;
  }
}
var ExtensionLogListener = class {
  constructor(outputChannel2) {
    this.outputChannel = outputChannel2;
  }
  Log(log) {
    const VIEW_DETAIL_IN_OUTPUT = "View details in Output";
    const { showOutput, showPopup, popupButtonText, onPopupButtonClicked } = log.options ?? {
      showOutput: false,
      showPopup: false
    };
    let popupAction;
    switch (log.level) {
      case "error":
        this.outputChannel?.error(log.message, ...log.details ?? []);
        popupAction = getPopupAction(log.level);
        break;
      case "trace":
        this.outputChannel?.trace(log.message, ...log.details ?? []);
        break;
      case "debug":
        this.outputChannel?.debug(log.message, ...log.details ?? []);
        popupAction = getPopupAction(log.level);
        break;
      case "info":
        this.outputChannel?.info(log.message, ...log.details ?? []);
        popupAction = getPopupAction(log.level);
        break;
      case "warn":
        this.outputChannel?.warn(log.message, ...log.details ?? []);
        popupAction = getPopupAction(log.level);
        break;
    }
    if (showOutput && this.outputChannel) {
      this.outputChannel.show(
        true
        /*preserveFocus*/
      );
    }
    if (showPopup && popupAction) {
      const buttonText = popupButtonText ?? VIEW_DETAIL_IN_OUTPUT;
      void popupAction(log.message, buttonText).then((value) => {
        if (value === buttonText) {
          if (onPopupButtonClicked) {
            onPopupButtonClicked();
          } else {
            this.outputChannel?.show(
              true
              /*preserveFocus*/
            );
          }
        }
      });
    }
  }
};

// src/log/logger.ts
var Logger = class {
  _listeners = /* @__PURE__ */ new Map();
  logInternal(item) {
    this._listeners.forEach((listener) => {
      listener.Log(item);
    });
  }
  registerLogListener(name, listener) {
    this._listeners.set(name, listener);
  }
  unregisterLogListener(name) {
    this._listeners.delete(name);
  }
  log(level, message, details, options) {
    this.logInternal({ message, level, details, options });
  }
  error(message, details, options) {
    this.logInternal({ message, level: "error", details, options });
  }
  warning(message, details, options) {
    this.logInternal({ message, level: "warn", details, options });
  }
  info(message, details, options) {
    this.logInternal({ message, level: "info", details, options });
  }
  debug(message, details, options) {
    this.logInternal({ message, level: "debug", details, options });
  }
  trace(message, details, options) {
    this.logInternal({ message, level: "trace", details, options });
  }
  async profile(actionName, action) {
    const start = Date.now();
    try {
      return await action();
    } finally {
      const end = Date.now();
      const elapsed = end - start;
      this.trace(`${actionName} took ${elapsed}ms`);
    }
  }
};
var logger = new Logger();
var logger_default = logger;

// src/log/typespec-log-output-channel.ts
var import_vscode2 = __toESM(require("vscode"));
var TRACE_PREFIX = /^\[Trace.*?\] /iu;
var DEBUG_PREFIX = /^\[Debug.*?\] /iu;
var INFO_PREFIX = /^\[Info.*?\] /iu;
var WARN_PREFIX = /^\[Warn.*?\] /iu;
var ERROR_PREFIX = /^\[Error.*?\] /iu;
var TypeSpecLogOutputChannel = class {
  delegate;
  constructor(name) {
    this.delegate = import_vscode2.default.window.createOutputChannel(name, { log: true });
  }
  get logLevel() {
    return this.delegate.logLevel;
  }
  get onDidChangeLogLevel() {
    return this.delegate.onDidChangeLogLevel;
  }
  trace(message, ...args) {
    this.delegate.trace(message, ...args);
  }
  debug(message, ...args) {
    this.delegate.debug(message, ...args);
  }
  info(message, ...args) {
    this.delegate.info(message, ...args);
  }
  warn(message, ...args) {
    this.delegate.warn(message, ...args);
  }
  error(error, ...args) {
    this.delegate.error(error, ...args);
  }
  get name() {
    return this.delegate.name;
  }
  replace(value) {
    this.delegate.replace(value);
  }
  clear() {
    this.delegate.clear();
  }
  show(column, preserveFocus) {
    this.delegate.show(column, preserveFocus);
  }
  hide() {
    this.delegate.hide();
  }
  dispose() {
    this.delegate.dispose();
  }
  append(value) {
    this.logToDelegate(value);
  }
  appendLine(value) {
    this.logToDelegate(value);
  }
  preLevel = "";
  logToDelegate(value) {
    if (TRACE_PREFIX.test(value)) {
      this.preLevel = "trace";
      this.delegate.trace(value.replace(TRACE_PREFIX, ""));
    } else if (DEBUG_PREFIX.test(value)) {
      this.preLevel = "debug";
      this.delegate.debug(value.replace(DEBUG_PREFIX, ""));
    } else if (INFO_PREFIX.test(value)) {
      this.preLevel = "info";
      this.delegate.info(value.replace(INFO_PREFIX, ""));
    } else if (WARN_PREFIX.test(value)) {
      this.preLevel = "warning";
      this.delegate.warn(value.replace(WARN_PREFIX, ""));
    } else if (ERROR_PREFIX.test(value)) {
      this.preLevel = "error";
      this.delegate.error(value.replace(ERROR_PREFIX, ""));
    } else {
      switch (this.preLevel) {
        case "trace":
          this.delegate.trace(value);
          break;
        case "debug":
          this.delegate.debug(value);
          break;
        case "info":
          this.delegate.info(value);
          break;
        case "warning":
          this.delegate.warn(value);
          break;
        case "error":
          this.delegate.error(value);
          break;
        default:
          this.delegate.debug(
            `Log Message with invalid log level (${this.preLevel}). Raw message: ${value}`
          );
      }
    }
  }
};

// src/web/extension.ts
var outputChannel = new TypeSpecLogOutputChannel("TypeSpec");
logger_default.registerLogListener("extension log", new ExtensionLogListener(outputChannel));
async function activate(context) {
  logger_default.info("Activated TypeSpec Web Extension.");
}
async function deactivate() {
}
//# sourceMappingURL=extension.js.map
