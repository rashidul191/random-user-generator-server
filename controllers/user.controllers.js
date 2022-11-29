const users = require("../usersData.json");

const successStatus = (data) => {
  return {
    success: true,
    message: "success",
    data: data,
  };
};

// get all data router ("/user/all/")
module.exports.getAllData = (req, res) => {
  const { limit } = req.query;
  if (users.length < limit) {
    res.send({
      success: false,
      error: "sorry!!! your limit, out of data",
    });
  } else {
    res.status(200).send(successStatus(users.slice(0, limit)));
  }
};

// get random user ("/user/random/:id")
module.exports.getRandomUser = (req, res) => {
  const { id } = req.params;
  const findUserData = users.find((user) => user.id === id);
  if (!findUserData) {
    res.status(503).send({
      success: false,
      error: "sorry!!! data not found",
    });
  } else {
    res.status(200).send(successStatus(findUserData));
  }
};

// save user data post method ("/user/save/")
module.exports.saveUserData = (req, res) => {
  const newData = req.body;
  const { id, name, gender, contact, address, photoUrl } = newData;
  if (id && name && gender && contact && address && photoUrl) {
    users.push(newData);
    res.status(200).send(successStatus(users));
  } else {
    res.status(400).send({
      success: false,
      error: "Sorry!! missing your information, please try again",
    });
  }
};

// update user data patch method ("/user/update/:id")
module.exports.updateUserData = (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  const { name, gender, contact, address, photoUrl } = bodyData;
  const updateUserData = users.find((user) => user.id === id);
  if (!updateUserData) {
    res.status(400).send({
      success: false,
      error: "Sorry!! id is invalidate, please try again",
    });
  } else {
    updateUserData.name = name;
    updateUserData.gender = gender;
    updateUserData.contact = contact;
    updateUserData.address = address;
    updateUserData.photoUrl = photoUrl;
    res.status(200).send(successStatus(users));
  }
};

module.exports.updateMultipleUserData = (req, res) => {
  console.log("update multiple date");
  res.send("update multiple data");
};

// delete user data to use delete method ("/user/delete/:id")
module.exports.deleteUserData = (req, res) => {
  const { id } = req.params;
  const newUsersData = users.filter((user) => user.id != id);
  if (users.length === newUsersData.length) {
    res.status(400).send({
      success: false,
      error: "Sorry!! id is invalidate, please try again",
    });
  } else {
    res.status(200).send(successStatus(newUsersData));
  }
};
