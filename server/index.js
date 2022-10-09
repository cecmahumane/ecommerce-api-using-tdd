require("dotenv").config();
const express = require("express");
const app = require("./api");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
