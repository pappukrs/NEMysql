const { Person } = require("../models/BiodataModel");

const { Country } = require("../models/BiodataModel");
const axios = require("axios");
//get list of person
exports.getAllPerson = async (req, res) => {
  try {
    const person = await Person.findAll();

    if (!person) {
      return res.status(404).json({ message: "Person list not exists" });
    }
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single person

exports.getPerson = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: "person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a new person

exports.createPerson = async (req, res) => {
  const { name, qualification, height, weight } = req.body;
  try {
    const getAge = await axios(`https://api.agify.io/?name=${name}`);
    const getGender = await axios(`https://api.genderize.io/?name=${name}`);
    const getCountry = await axios(`https://api.nationalize.io/?name=${name}`);
    // console.log(getAge, "getAge___");
    // console.log(getGender, "getGender___");
    // console.log(getCountry, "getCountry___");
    const age = getAge.data.age;
    const gender = getGender.data.gender;
    let country = getCountry.data.country;
    country = country
      .map((c) => ({
        country: c.country_id,
        probability: c.probability,
      }))
      .sort((a, b) => b.probability - a.probability);
    country = country.slice(0, 2);

    console.log(name, qualification, height, weight, age, gender, country);

    const person = await Person.create({
      name,
      qualification,
      height,
      weight,
      age,
      gender,
      country,
    });

    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update person

exports.updatePerson = async (req, res) => {
  const { id } = req.params;
  const { name, qualification, height, weight } = req.body;
  const person = await Person.findByPk(id);
  try {
    // console.log("person___", person.name);

    if (person.name.toUpperCase() === name.toUpperCase()) {
      await person.update({ name, qualification, height, weight });
      //   person.save();
      return res.status(201).json(person);
    } else {
      const getAge = await axios(`https://api.agify.io/?name=${name}`);
      const getGender = await axios(`https://api.genderize.io/?name=${name}`);
      const getCountry = await axios(
        `https://api.nationalize.io/?name=${name}`
      );

      const age = getAge.data.age;
      const gender = getGender.data.gender;
      let country = getCountry.data.country;
      country = country
        .map((c) => ({ country: c.country_id, probability: c.probability }))
        .sort((a, b) => b.probability - a.probability);
      country = country.slice(0, 2);
      person.update({
        name,
        qualification,
        height,
        weight,
        age,
        gender,
        country,
      });
      res.status(201).json(person);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete person

exports.deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    await Person.destroy({ where: { _id: id } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
