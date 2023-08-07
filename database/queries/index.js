const slot_availabilty_count = () => {
  return `
  select distinct codearea.slot.appointment,codearea.slot.id as slot_id
  from codearea.slot_availablity
  inner join codearea.slot
  on codearea.slot_availablity.slot_id = codearea.slot.id
  where codearea.slot.appointment > now()+ interval '0 DAY';
`;
};

const Teacher_id = (slot_id) => {
  return `
  select slot_id,teacher_id from codearea.slot_availablity
  where created_at =(select min(created_at) from codearea.slot_availablity where slot_id = ${slot_id})
  and slot_id = ${slot_id}; 
  `;
};

const Delete_Availabilty = (slot_id, teacher_id) => {
  return `
  delete from codearea.slot_availablity where slot_id = ${slot_id} and teacher_id = ${teacher_id};
  `;
};

const UpdateTokens = (token, refresh_token) => {
  return `
  update codearea.zoom set token = ${token} , refresh_token = ${refresh_token} where id = 1;
  `;
};

const getDemoByNumber = (num) => {
  return `select codearea.demo_app.* from codearea.demo_app inner join codearea.demo_class on codearea.demo_class.demo_app_id = codearea.demo_app.id 
  where codearea.demo_class.number = '${num}';`;
};

const returnStudentIdFromEmailPhone = (email, phone) => {
  return `select codearea.student.id from codearea.student where codearea.student.parent_email = '${email}' AND codearea.student.parent_phone = '${phone}' FETCH FIRST 1 ROWS ONLY;`;
};
const UpdateLastPayment = (sid, pid) => {
  return `UPDATE codearea.operation SET status = 'end' WHERE codearea.operation.student_id = ${sid} AND codearea.operation.status = 'current' AND codearea.operation.id != ${pid};`;
};

const getStudentTeacherSchedule = (purchase_number) => {
  return ` 
      SELECT codearea.teacher_schedule.* from codearea.demo_class INNER join codearea.teacher on 
      codearea.demo_class.teacher_id = codearea.teacher.id 
      INNER join codearea.teacher_schedule on 
      codearea.teacher_schedule.teacher_id = codearea.teacher.id
      WHERE codearea.demo_class.number = '${purchase_number}' AND codearea.teacher_schedule.available = true;
  `;
};

const getStudentPaidChapter = (student_id) => {
  return `
    SELECT codearea.chapter.* From codearea.operation 
    inner join 
    codearea.operation_chapter on codearea.operation_chapter.operation_id = codearea.operation.id
    inner join
    codearea.chapter on codearea.operation_chapter.chapter_id = codearea.chapter.id
    where codearea.operation.status = 'current' and codearea.operation.student_id = ${student_id};
  `;
};

const getLastPaidClassId = (student_id) => {
  return `
  SELECT codearea.paid_class.id 
  FROM codearea.paid_class 
  WHERE codearea.paid_class.student_id = ${student_id} ORDER BY codearea.paid_class.id DESC LIMIT 1;
  `;
};

const getLastSubmittedPaidClassId = (student_id) => {
  return `
  SELECT codearea.paid_class.id 
  FROM codearea.paid_class 
  WHERE codearea.paid_class.lesson_id != NULL 
    AND codearea.paid_class.student_id = ${student_id}
  ORDER BY codearea.paid_class.id DESC 
  LIMIT 1;
  `;
};

const getPaidClassCountData = (student_id) => {
  return `
  SELECT
  (SELECT COUNT(id) FROM codearea.paid_class WHERE lesson_id IS NULL AND student_id = ${student_id}) AS remaining,
  (SELECT COUNT(id) FROM codearea.paid_class WHERE lesson_id IS NOT NULL AND student_id = ${student_id}) AS finished;
  `;
};

const getSelectedTeacherSchedule = (arr) => {
  return `
  
  SELECT * From codearea.teacher_schedule where codearea.teacher_schedule.id in (${[
    ...arr,
  ]});
  
  `;
};

const getUpComingClassesLimitedTo = (limit, id, timeZone) => {
  return `
  SELECT *
    FROM codearea.paid_class
    WHERE
    codearea.paid_class.appointment AT TIME ZONE ${timeZone} - CURRENT_TIMESTAMP AT TIME ZONE ${timeZone} > INTERVAL '-30 minutes' AND
    codearea.paid_class.student_id = ${id}
    ORDER BY codearea.paid_class.appointment LIMIT ${limit};
  `;
};

const getCurrentPlan = (id) => {
  return `
    SELECT codearea.plan.title from codearea.operation inner join
    codearea.plan on codearea.operation.plan = codearea.plan.id
    WHERE codearea.operation.status = 'current' AND codearea.operation.student_id = ${id};
  `;
};

const getTeacherName = (id) => {
  return `
    SELECT codearea.teacher.name from codearea.student inner join 
    codearea.teacher on codearea.student.teacher_id = codearea.teacher.id 
    where codearea.student.id = ${id};
  `;
};

const getRateDataSet = (id) => {
  return `
      SELECT
      DATE_TRUNC('week', codearea.paid_class.appointment) AS week_start,
      AVG(codearea.paid_class.assignment_rate) AS avg_assignment_rate,
      AVG(codearea.paid_class.st_focus_rate) AS avg_st_focus_rate
      FROM
      codearea.paid_class
      WHERE 
      codearea.paid_class.student_id = ${id}
      AND EXTRACT(MONTH FROM DATE_TRUNC('week', codearea.paid_class.appointment)) = EXTRACT(MONTH FROM CURRENT_DATE)
      GROUP BY
      week_start
      ORDER BY
      week_start ASC;
  `;
};

const checkIfThereIsPaid = (day, month, year, id, sort, limit) => {
  return `
        SELECT codearea.paid_class.id , codearea.paid_class.canceled FROM codearea.paid_class
        WHERE
        codearea.paid_class.student_id = ${id}
        AND EXTRACT(MONTH FROM appointment) = ${month}
        AND EXTRACT(DAY FROM appointment) = ${day}
        AND EXTRACT(YEAR FROM appointment) = ${year};`;
};

const SearchInClasses = (data) => {
  return `
  SELECT codearea.lesson.title as lesson_title, codearea.lesson.cover_url ,codearea.lesson.assignment_url, codearea.lesson.material_url,
  codearea.lesson.quiz_url, codearea.paid_class.appointment ,codearea.paid_class.st_focus_rate, codearea.paid_class.comment,
  codearea.paid_class.custom_assignment, codearea.paid_class.assignment_rate , codearea.paid_class.id , codearea.paid_class.meeting_url
  , codearea.paid_class.canceled
  FROM codearea.paid_class
  INNER JOIN codearea.lesson ON codearea.paid_class.lesson_id = codearea.lesson.id
  WHERE codearea.paid_class.student_id = ${data.id}
  ${data.canceled ? "AND codearea.paid_class.canceled = true" : ""}
  ${
    data.from && data.to
      ? `AND DATE(codearea.paid_class.appointment)  BETWEEN '${data.from}' AND '${data.to}'`
      : ""
  }
  ${data.sort ? `ORDER BY codearea.paid_class.appointment ${data.sort}` : ""}
  ${data.limit ? `LIMIT ${data.limit}` : ""}
  ;
  `;
};

const getStudentOperations = (id) => {
  return `
      SELECT string_agg(DISTINCT codearea.chapter.title, ', ') as chapterTitle , codearea.plan.title as planTitle , codearea.course.name as courseName , codearea.operation.type,
      codearea.operation.amount , codearea.operation.status , codearea.operation.end_date as endDate
      FROM codearea.operation_chapter
      inner join codearea.operation on codearea.operation_chapter.operation_id = codearea.operation.id
      inner join codearea.chapter on codearea.operation_chapter.chapter_id = codearea.chapter.id
      inner join codearea.plan on codearea.operation.plan = codearea.plan.id
      inner join codearea.course on codearea.chapter.course_id = codearea.course.id
      WHERE codearea.operation.student_id = ${id}
      GROUP BY codearea.plan.title, codearea.course.name, codearea.operation.type, codearea.operation.amount,
      codearea.operation.status, codearea.operation.end_date;
  `;
};

module.exports = {
  slot_availabilty_count,
  Teacher_id,
  Delete_Availabilty,
  UpdateTokens,
  getDemoByNumber,
  returnStudentIdFromEmailPhone,
  UpdateLastPayment,
  getStudentTeacherSchedule,
  getStudentPaidChapter,
  getLastPaidClassId,
  getLastSubmittedPaidClassId,
  getPaidClassCountData,
  getSelectedTeacherSchedule,
  getUpComingClassesLimitedTo,
  getCurrentPlan,
  getTeacherName,
  getRateDataSet,
  checkIfThereIsPaid,
  SearchInClasses,
  getStudentOperations,
};
