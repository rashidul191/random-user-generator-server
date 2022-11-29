const express = require("express");
const userControllers = require("../../controllers/user.controllers");

const router = express.Router();

router
  .route("/all/")
  /**
   * @api {get} /user/all/ all users
   * @apiDescription Get all the users
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number {1- }}     [page = 1]    list page
   * @apiParam {Number {1-100}}   [limit = 10]  users per page
   *
   * @apiSuccess {Object []}      all the tools
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden Only admin can access the data
   *
   */
  .get(userControllers.getAllData)
  .post();

// router get random users for id
router.route("/random/:id").get(userControllers.getRandomUser);

// router post save user data
router.route("/save").post(userControllers.saveUserData);

// router patch update user data use id
router.route("/update/:id").patch(userControllers.updateUserData);

// router patch update multiple user data
router.route("/bulk-update/:id").patch(userControllers.updateMultipleUserData)

// router delete , delete user data use of id
router.route("/delete/:id").delete(userControllers.deleteUserData);

module.exports = router;
