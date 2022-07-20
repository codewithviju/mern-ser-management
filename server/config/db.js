const express = require("express");

const mongoose = require("mongoose");

const connectToMongo = async () => {
  const isconnected = await mongoose.connect("mongodb://localhost:27017/vijay");
  if (isconnected) {
    console.log(`connected`);
  }
};

module.exports = connectToMongo;
