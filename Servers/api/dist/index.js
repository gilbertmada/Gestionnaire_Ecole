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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var api_exports = {};
__export(api_exports, {
  default: () => api_default
});
module.exports = __toCommonJS(api_exports);
var import_express = __toESM(require("express"));
var import_mongoose2 = __toESM(require("mongoose"));
var import_express2 = require("express");

// entity/User.ts
var import_mongoose = __toESM(require("mongoose"));
var UserSchema = new import_mongoose.Schema({
  lastName: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false,
    default: "ADMIN"
  },
  nomRole: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  isArchive: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: import_mongoose.default.Types.ObjectId,
    required: false
  },
  updatedBy: {
    type: import_mongoose.default.Types.ObjectId
  },
  deletedBy: {
    type: import_mongoose.default.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date
  },
  categorie: {
    type: String,
    required: false
  },
  urlPlus: {
    type: String,
    required: false
  }
});
UserSchema.method("transform", function() {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
});
var User = import_mongoose.default.model("User", UserSchema);

// index.ts
var import_cors = __toESM(require("cors"));
var bodyParser = __toESM(require("body-parser"));
var app = (0, import_express.default)();
app.get("/", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  console.log("Hello world");
});
var mongoURI = "mongodb://localhost:27017/admin";
import_mongoose2.default.connect(mongoURI, {
  bufferCommands: false,
  autoCreate: true
}).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => console.log(err));
var port = 4001;
var routes = (0, import_express2.Router)();
app.use("/", routes.post("/us", async (req, res, next) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const newUser = new User({
    lastName: (_a = req.body) == null ? void 0 : _a.lastName,
    firstName: (_b = req.body) == null ? void 0 : _b.firstName,
    username: (_c = req.body) == null ? void 0 : _c.username,
    email: (_d = req.body) == null ? void 0 : _d.email,
    password: (_e = req.body) == null ? void 0 : _e.password,
    photo: (_f = req.body) == null ? void 0 : _f.photo,
    role: (_g = req.body) == null ? void 0 : _g.role,
    nomRole: (_h = req.body) == null ? void 0 : _h.nomRole,
    deleted: false,
    categorie: (_i = req.body) == null ? void 0 : _i.categorie
  });
  newUser.save((err, docs) => {
    if (!err)
      res.send(docs);
    else
      console.log("misy erreur oh....", err);
  });
  console.log("newUserjjkk.....", newUser);
}));
app.use((0, import_cors.default)());
app.use(bodyParser.json());
app.use(import_express.default.json({
  limit: "100mb"
}));
app.use(import_express.default.urlencoded({
  limit: "100mb",
  extended: true
}));
var server = app.listen(port || 3009, () => {
  console.log(`Server started on port ${port || 3009}!`);
});
var api_default = server;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
