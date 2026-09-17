const {model} = require("mongoose");

const {HoldingSchema, HoldingsSchema} = require("../schemas/HoldingsSchema");

const HoldingsModel = new model("holding" , HoldingsSchema);

module.exports = {HoldingsModel};

