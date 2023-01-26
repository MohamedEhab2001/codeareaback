const slot_availabilty_count = () => {
  return `
  select distinct codearea.slot.appointment,codearea.slot.id as slot_id
  from codearea.slot_availablity
  inner join codearea.slot
  on codearea.slot_availablity.slot_id = codearea.slot.id
  where codearea.slot.appointment > now()+ interval '1 DAY';
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

module.exports = {
  slot_availabilty_count,
  Teacher_id,
  Delete_Availabilty,
  UpdateTokens,
};
