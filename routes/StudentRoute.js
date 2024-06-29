const router = require("express").Router();
const {
  GetStudentIdFromParentEmail,
  SavePaymentData,
  CloseLastPayment,
  updateStudentPaidStatus,
  loginUser,
  StudentById,
  CheckStudentSchedule,
  getStudentTeacherSlots,
  addOperationChapter,
  CreateClasses,
  addStudentSchedule,
  checkStudentScheduleLength,
  createNextMeetingUrl,
  getTeacherSchedule,
  modifyNumberOfClasess,
  prepareAddingStudentSchedule,
  prepareDataNeededForClassCreation,
  AssignTeacherToStudent,
  getClassesData,
  CreateNextClassIfNeeded,
  sendClasses,
  refreshToken,
  getReteData,
  getClassesFRData,
  cancelPaidClass,
  ReSchedulePaidClass,
  removeStudentSchedule,
  searchPaidClasses,
  studentOperations,
  updateStudent,
  submitFeedback,
  TommorowClasses,

} = require("../controllers/StudentController");
const {
  changeTeacherSlotAvailability,
} = require("../controllers/TeacherController");
const { create } = require("../controllers/meetController");
const { CheckEmail, CheckPassword } = require("../middlewares/Login");

router.route("/zoomTest").get(create);

router
  .route("/action_schedule")
  .post(
    prepareAddingStudentSchedule,
    CheckStudentSchedule,
    checkStudentScheduleLength,
    addStudentSchedule,
    prepareDataNeededForClassCreation,
    modifyNumberOfClasess,
    getTeacherSchedule,
    CreateClasses,
    create,
    createNextMeetingUrl,
    AssignTeacherToStudent,
    changeTeacherSlotAvailability
  );

router
  .route("/action_schedule")
  .post(
    removeStudentSchedule,
    prepareDataNeededForClassCreation,
    modifyNumberOfClasess,
    getTeacherSchedule,
    CreateClasses,
    create,
    createNextMeetingUrl,
    AssignTeacherToStudent,
    changeTeacherSlotAvailability
  );

router
  .route("/paid_class")
  .get(getClassesData, CreateNextClassIfNeeded, create, sendClasses);

router.route("/paid_class/search").get(searchPaidClasses);
router.route("/operation/:id").get(studentOperations);

router.route("/classes_data/:id").get(getClassesFRData);
router.route("/rates/:id").get(getReteData);
router.route("/refresh/:id").post(refreshToken, loginUser);
router.route("/cancel_paid/:id").put(cancelPaidClass);
router.route("/reschedule_paid/:id").put(ReSchedulePaidClass);

router
  .route("/payment")
  .post(
    GetStudentIdFromParentEmail,
    SavePaymentData,
    addOperationChapter,
    CloseLastPayment,
    updateStudentPaidStatus
  );

router.route("/login").post(CheckEmail, CheckPassword, loginUser);
router.route("/schedule/:id").get(CheckStudentSchedule);
router.route("/teacher/schedule").get(getStudentTeacherSlots);
router.route("/submit/class_feedback").put(submitFeedback);
router.route("/tommorow/classes").get(TommorowClasses);
router.route("/:id").get(StudentById).put(updateStudent);

module.exports = router;
