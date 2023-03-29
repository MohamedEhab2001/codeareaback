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
module.exports = {
  slot_availabilty_count,
  Teacher_id,
  Delete_Availabilty,
  UpdateTokens,
  getDemoByNumber,
  returnStudentIdFromEmailPhone,
  UpdateLastPayment
};
