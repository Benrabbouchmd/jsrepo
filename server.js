const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.get("/get-cities", async (req, res) => {
  try {
    const { zipcode } = req.query;

    if (!zipcode) {
      return res
        .status(400)
        .json({ success: false, error: "Missing zipcode parameter" });
    }

    const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${zipcode}`;
    const response = await axios.get(apiUrl);

    const cities = response.data.map((city) => city.nom);

    res.json({ success: true, cities });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Une erreur s'est produite" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
