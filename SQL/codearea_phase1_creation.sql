/* demo application*/
CREATE TABLE codearea.demo_app(
	id SERIAL PRIMARY KEY,
	country varchar NOT NULL,
	st_name varchar NOT NULL,
	st_age real NOT NULL,
	st_gender varchar NOT NULL,
	parent_email varchar NOT NULL,
	parent_phone varchar NOT NULL,
	slot_id integer NOT NULL,
	created_at TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);
Alter table codearea.demo_app add column ref_id integer references codearea.referal_person(id);

/* slot */
CREATE TABLE codearea.slot(
	id SERIAL PRIMARY KEY,
	appointment TIMESTAMP with time zone,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


/* slot */
CREATE TABLE codearea.referal_person(
	id SERIAL PRIMARY KEY,
	name varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);





Alter table codearea.referal_person add column phone varchar not null;
Alter table codearea.referal_person add column email varchar not null;

insert into codearea.referal_person(name , phone , email) values('Mohamed Ehab' , '01027708044' , 'mohamedehab567t@gmail.com');
select * from codearea.referal_person;

/*slot*/

/* slot_availablity*/
CREATE TABLE codearea.slot_availablity(
	slot_id integer not null,
	teacher_id integer not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null,
	primary key (slot_id,teacher_id)
);

/*slot availablity*/


/*demo class*/
create table codearea.demo_class(
id serial PRIMARY key,
	teacher_id integer not null,
	demo_app_id integer not null,
	slot_id integer not null,
	teacher_duration real not null,
	student_duration real not null,
	teacher_join_time TIMESTAMP with time zone,
	student_join_time TIMESTAMP with time zone,
	st_focus_rate integer,
	comment varchar ,
	meeting_url varchar not null,
	lesson_id integer ,
	feedback_submitted BOOLEAN default false not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null,
	unique(teacher_id,slot_id),
	unique(demo_app_id,slot_id)
	
);
/*paid class*/
CREATE TABLE codearea.paid_class(
	id SERIAL PRIMARY KEY,
	teacher_id integer not null,
	slot_id integer not null,
	student_id integer not null,
	teacher_duration real not null,
	student_duration real not null,
	teacher_join_time TIMESTAMP with time zone,
	student_join_time TIMESTAMP with time zone,
	lesson_id integer ,
	st_focus_rate integer,
	comment varchar ,
	custom_assignment bool,
	assignment varchar, 
	assignment_rate integer,
	meeting_url varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null,
	unique (slot_id,student_id),
	unique (slot_id,teacher_id) 
);


/*COURSE*/
CREATE TABLE codearea.course(
	id SERIAL PRIMARY KEY,
	name varchar not null,
	plan_id integer not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);

/*chapter*/
CREATE TABLE codearea.chapter(
	id SERIAL PRIMARY KEY,
	title varchar not null,
	number integer not null,
	course_id integer not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


/*lesson*/
CREATE TABLE codearea.lesson(
	id SERIAL PRIMARY KEY,
	title varchar not null,
	number integer not null,
	chapter_id integer not null,
	material_url varchar not null,
	assignment_url varchar,
	quiz_id integer,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


/*teacher*/
CREATE TABLE codearea.teacher(
	id SERIAL PRIMARY KEY,
	name varchar not null,
	gender VARCHAR not null,
	email varchar not null,
	private_email varchar not null,
	address varchar not null,
	password varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


/*teacher*/

/*visits*/
select * from codearea.teacher_schedule;

SELECT codearea.teacher_schedule.* from codearea.demo_class INNER join codearea.teacher on 
codearea.demo_class.teacher_id = codearea.teacher.id 
INNER join codearea.teacher_schedule on 
codearea.teacher_schedule.teacher_id = codearea.teacher.id
WHERE codearea.demo_class.number = 'X9n35b4Ju43ykqw';

select * from codearea.demo_class;

create table codearea.visitors(
ip varchar primary key,
currency_code varchar not null,
calling_code varchar not null,
country_code varchar not null,
region_name varchar not null,
city varchar not null,
language_code varchar not null,
timezone_id varchar not null,
device_type varchar not null,
os_name varchar not null,
is_attacker bool not null,
is_vpn bool not null,
is_threat bool not null,

created_at  TIMESTAMP with time zone default now() not null,
updated_at  TIMESTAMP with time zone default now() not null
);


/*student*/
create table codearea.student(
id serial primary key,
name varchar not null,
email varchar not null,	
parent_name varchar not null,
parent_email varchar not null,
parent_phone varchar not null,
birthday varchar not null,
teacher_id integer,
password varchar not null,
	

created_at  TIMESTAMP with time zone default now() not null,
updated_at  TIMESTAMP with time zone default now() not null
);

truncate table student
/*operation*/
/*
types:
each number refers to operation type:
0=>refund
1=>buy
*/

/*
status:
0
1
2
3
*/

create table codearea.operation(
id serial primary key,
comment varchar not null,
type integer not null,
status integer not null,
amount real not null,
student_id integer not null,
created_at  TIMESTAMP with time zone default now() not null,
updated_at  TIMESTAMP with time zone default now() not null
);

/*operation chapter*/
create table codearea.operation_chapter(
operation_id integer not null,
chapter_id integer not null,
created_at  TIMESTAMP with time zone default now() not null,
updated_at  TIMESTAMP with time zone default now() not null
);

/*teacher penalties*/
create table codearea.teacher_penalties(
	teacher_id integer not null,
	amount integer not null,
	reason varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


/*schedule*/
create table codearea.student_schedule(
id serial primary key,
	student_id integer not null,
	day integer not null,
	time varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


create table codearea.teacher_schedule(
id serial primary key,
	teacher_id integer not null,
	available boolean default TRUE not null,
	day integer not null,
	time varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);

SELECT * from codearea.visitors;

SELECT codearea.teacher_schedule.* from codearea.student_schedule inner join codearea.teacher_schedule
on codearea.student_schedule.teacher_schedule_id = codearea.teacher_schedule.id
where codearea.student_schedule.student_id = 40;


  SELECT codearea.paid_class.id 
  FROM codearea.paid_class 
  WHERE codearea.paid_class.lesson_id != NULL 
    AND codearea.paid_class.student_id = 40
  ORDER BY codearea.paid_class.id DESC 
  LIMIT 1;
  
SELECT CASE date_part('dow', codearea.paid_class.appointment::DATE)
         WHEN 0 THEN 'Sunday'
         WHEN 1 THEN 'Monday'
         WHEN 2 THEN 'Tuesday'
         WHEN 3 THEN 'Wednesday'
         WHEN 4 THEN 'Thursday'
         WHEN 5 THEN 'Friday'
         WHEN 6 THEN 'Saturday'
       END , codearea.paid_class.meeting_url
FROM codearea.paid_class
ORDER BY codearea.paid_class.appointment;


SELECT *
FROM codearea.paid_class
WHERE codearea.paid_class.appointment AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Cairo' >=
CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Cairo' AND codearea.paid_class.student_id = 40
ORDER BY codearea.paid_class.appointment LIMIT 4;

-- Query 1
SELECT codearea.plan.title from codearea.operation inner join
codearea.plan on codearea.operation.plan = codearea.plan.id
WHERE codearea.operation.status = 'current' AND codearea.operation.student_id = 40;


SELECT codearea.plan.title from codearea.operation inner join
codearea.plan on codearea.operation.plan = codearea.plan.id
WHERE codearea.operation.status = 'current' AND codearea.operation.student_id = 40;

SELECT codearea.teacher.name from codearea.student inner join 
codearea.teacher on codearea.student.teacher_id = codearea.teacher.id 
where codearea.student.id = 40;

SELECT DISTINCT date_trunc('day', codearea.paid_class.appointment) AS appointment_date
FROM codearea.paid_class
ORDER BY appointment_date;

SELECT * FROM codearea.paid_class
WHERE
  codearea.paid_class.student_id = 43
  AND EXTRACT(MONTH FROM appointment) = 07
  AND EXTRACT(DAY FROM appointment) = 18
  AND EXTRACT(YEAR FROM appointment) = 2024;



SELECT *  FROM codearea.student;
SELECT *  FROM codearea.student_schedule where codearea.student_schedule.student_id = 74;


SELECT * from codearea.teacher_schedule ts where ts.teacher_id = 2;
SELECT * from codearea.teacher;
-------------------------------------------------
SELECT * from codearea.student;
SELECT * from codearea.operation;
SELECT * from codearea.operation_chapter;
insert into codearea.operation_chapter(operation_id , chapter_id) values (56 , 4);
insert into codearea.operation_chapter(operation_id , chapter_id) values (56 , 5);
insert into codearea.operation_chapter(operation_id , chapter_id) values (56 , 6);
SELECT * from codearea.plan;
SELECT * from codearea.chapter;
SELECT * from codearea.lesson l where l.chapter_id = 4;
SELECT * from codearea.course;
SELECT * from codearea.plan;
-- mena and salma password changed
SELECT * from codearea.student ORDER BY codearea.student.id DESC;

SELECT * from codearea.demo_app;
SELECT * from codearea.demo_app where DATE(created_at) = CURRENT_DATE  ORDER BY codearea.demo_app.id DESC ;
SELECT * from codearea.demo_class cl where cl.number = '4W9b06AI6hDYZqJ';
SELECT * from codearea.slot ORDER BY codearea.slot.id DESC;
SELECT * from codearea.slot where DATE(created_at) = CURRENT_DATE  ORDER BY codearea.slot.id ASC
SELECT * from codearea.slot_availablity where DATE(created_at) = CURRENT_DATE  ORDER BY codearea.slot_availablity.slot_id ASC;
SELECT * from codearea.visitors;

INSERT INTO codearea.plan (title) VALUES ('STEP BY STEP'), ('CONFIDENT') , ('CUSTOM PATH');


SELECT * from codearea.paid_class where student_id = 43 order by appointment DESC;





-- DELETE WARNING
delete from codearea.paid_class where student_id = 74 and date(appointment) > current_date;


insert into codearea.slot(appointment) values('2024-07-20T11:00:00.098Z');
insert into codearea.slot(appointment) values('2024-07-20T12:00:42.098Z');
insert into codearea.slot(appointment) values('2024-07-20T13:00:42.098Z');
insert into codearea.slot(appointment) values('2024-07-20T14:00:42.098Z');
insert into codearea.slot(appointment) values('2024-07-20T15:00:42.098Z');
insert into codearea.slot(appointment) values('2024-07-20T16:00:42.098Z');
insert into codearea.slot(appointment) values('2024-07-20T17:00:42.098Z');



select * from codearea.zoom;

DO $$
DECLARE
    slot_id INTEGER := 872;
    teacher_id INTEGER := 5;
BEGIN
    WHILE slot_id <= 878 LOOP
        INSERT INTO codearea.slot_availablity(slot_id, teacher_id, created_at, updated_at)
        VALUES (slot_id, teacher_id, NOW(), NOW());
        slot_id := slot_id + 1;
    END LOOP;
END $$;
		


SELECT * from codearea.visitors where DATE(created_at) = '2023-10-28' AND language_code = 'ar';

SELECT COUNT(*) from codearea.paid_class pd where DATE(appointment) < CURRENT_DATE AND pd.student_id = 43
and pd.lesson_id is null;

      SELECT
      DATE_TRUNC('day', codearea.paid_class.appointment) AS week_start,
      AVG(codearea.paid_class.assignment_rate) AS avg_assignment_rate,
      AVG(codearea.paid_class.st_focus_rate) AS avg_st_focus_rate
      FROM
      codearea.paid_class
      WHERE 
      codearea.paid_class.student_id = 74
      AND EXTRACT(MONTH FROM DATE_TRUNC('month', codearea.paid_class.appointment)) = EXTRACT(MONTH FROM CURRENT_DATE)
      GROUP BY
      week_start
      ORDER BY
      week_start ASC;
  
  
SELECT
  (SELECT COUNT(id) FROM codearea.paid_class WHERE lesson_id IS NULL AND student_id = 40) AS remaining,
  (SELECT COUNT(id) FROM codearea.paid_class WHERE lesson_id IS NOT NULL AND student_id = 40) AS finished;


SELECT codearea.lesson.title as lesson_title , codearea.lesson.assignment_url 
, codearea.lesson.material_url , codearea.lesson.quiz_url , codearea.paid_class.st_focus_rate ,
 codearea.paid_class.comment , codearea.paid_class.custom_assignment ,
 codearea.paid_class.assignment_rate , codearea.paid_class.meeting_url
FROM codearea.paid_class inner join codearea.lesson on 
codearea.paid_class.lesson_id = codearea.lesson.id 
WHERE codearea.paid_class.student_id = 40;

SELECT codearea.lesson.title as lesson_title, codearea.lesson.assignment_url, codearea.lesson.material_url,
       codearea.lesson.quiz_url, codearea.paid_class.appointment ,codearea.paid_class.st_focus_rate, codearea.paid_class.comment,
       codearea.paid_class.custom_assignment, codearea.paid_class.assignment_rate, codearea.paid_class.meeting_url
FROM codearea.paid_class
INNER JOIN codearea.lesson ON codearea.paid_class.lesson_id = codearea.lesson.id
WHERE codearea.paid_class.student_id = 40;

SELECT DATE(codearea.paid_class.appointment) from codearea.paid_class 
WHERE codearea.paid_class.appointment BETWEEN '2023-08-01' AND '2023-08-31';

select * from codearea.course;


SELECT codearea.chapter.title as chapter_title , codearea.plan.title as plan_title , codearea.course.name as course_name , codearea.operation.type,
codearea.operation.amount , codearea.operation.status , codearea.operation.end_date
FROM codearea.operation_chapter
inner join codearea.operation on codearea.operation_chapter.operation_id = codearea.operation.id
inner join codearea.chapter on codearea.operation_chapter.chapter_id = codearea.chapter.id
inner join codearea.plan on codearea.operation.plan = codearea.plan.id
inner join codearea.course on codearea.chapter.course_id = codearea.course.id
WHERE codearea.operation.student_id = 40;

SELECT string_agg(DISTINCT codearea.chapter.title, ', ') AS chapter_titles,
       codearea.plan.title AS plan_title,
       codearea.course.name AS course_name,
       codearea.operation.type,
       codearea.operation.amount,
       codearea.operation.status,
       codearea.operation.end_date
FROM codearea.operation_chapter
INNER JOIN codearea.operation ON codearea.operation_chapter.operation_id = codearea.operation.id
INNER JOIN codearea.chapter ON codearea.operation_chapter.chapter_id = codearea.chapter.id
INNER JOIN codearea.plan ON codearea.operation.plan = codearea.plan.id
INNER JOIN codearea.course ON codearea.chapter.course_id = codearea.course.id
WHERE codearea.operation.student_id = 40
GROUP BY codearea.plan.title, codearea.course.name, codearea.operation.type, codearea.operation.amount,
codearea.operation.status, codearea.operation.end_date;

/*plan*/
create table codearea.plan(
id serial primary key,
	title varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);

/*zoom*/
CREATE TABLE codearea.zoom(
	token varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);

select * from codearea.lesson;

----------------------------------------------------------------------------------------------------------
alter table codearea.demo_app
drop column number


ALTER table codearea.demo_class
ADD COLUMN number varchar NOT null;

-- DEMO APPLICATION ALTER
ALTER TABLE codearea.demo_app           
    ADD CONSTRAINT fk_demo_slot FOREIGN KEY(slot_id) REFERENCES codearea.slot(id);
	
	
	
-- slot_availablity alter
Alter Table codearea.slot_availablity
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id),
	Add constraint fk_slot_id foreign key(slot_id) references codearea.slot(id) on delete cascade;
	
--demo class alter
Alter Table codearea.demo_class
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id),
	Add constraint fk_slot_id foreign key(slot_id) references codearea.slot(id),
	add CONSTRAINT fk_demo_app_id foreign key(demo_app_id) references codearea.demo_app(id),
	Add constraint fk_lesson_id foreign key(lesson_id) references codearea.lesson(id);

--paid class alter
Alter Table codearea.paid_class
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id),
	Add constraint fk_slot_id foreign key(slot_id) references codearea.slot(id),
	add CONSTRAINT fk_student_id foreign key(student_id) references codearea.student(id),
	Add constraint fk_lesson_id foreign key(lesson_id) references codearea.lesson(id);
	
-- chapter alter
alter table codearea.chapter
	Add constraint fk_course_id foreign key(course_id) references codearea.course(id)  on delete cascade;

-- course alter
alter table codearea.course
	add constraint fk_plan_id foreign key (plan_id) REFERENCES codearea.plan(id) on delete cascade;
	


-- student alter
alter table codearea.student
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id) ;
	
-- lesson alter
alter table codearea.lesson
	Add constraint fk_chapter_id foreign key(chapter_id) references codearea.chapter(id)  on delete cascade;
-- alter student schedule
alter table codearea.student_schedule
add constraint fk_student_id FOREIGN key (student_id) REFERENCES codearea.student(id) ;
-- alter teacher schedule
alter table codearea.teacher_schedule
add constraint fk_teacher_id FOREIGN key (teacher_id) REFERENCES codearea.teacher(id) ;


----------------------------------------------------------------------------------------------------------------


/* quiz system start*/

/*quiz*/
CREATE TABLE codearea.quiz(
	id SERIAL PRIMARY KEY,
	title varchar not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE codearea.quiz_questions(
	quiz_id integer not null,
	question_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE codearea.questions(
	id serial primary key,
	title varchar not null,
	right_answer_id integer not null,
	question_id integer not null,
	point integer not null,
	image_url varchar,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE codearea.answer(
	id serial primary key,
	title varchar not null,
	image_url varchar,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE codearea.question_answers(
	question_id integer not null,
	answer_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE codearea.quiz_result(
	id SERIAL PRIMARY KEY,
	student_id integer not null,
	quiz_id integer not null,
	mark integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE codearea.student_answers(
	student_id integer not null,
	quiz_id integer not null,
	answer_id integer not null,
	question_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);
CREATE TABLE codearea.rooms(
	id serial primary key not null,
	meeting_id varchar not null,
	title varchar not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

INSERT INTO codearea.rooms(meeting_id , title) VALUES
('bb45ab78-0030-45e1-a1b1-be63bd4324b5','paid 1'),
('9981e566-da15-4c43-8e89-6ffd8ee8ec87','paid 2');


ALTER TABLE codearea.student ADD COLUMN room_id integer REFERENCES codearea.rooms(id);
ALTER TABLE codearea.paid_class ADD COLUMN session_id varchar;

UPDATE codearea.student set room_id = 1 where codearea.student.paid = true;

SELECT rm.meeting_id from codearea.student st inner join 
codearea.rooms rm on rm.id = st.room_id
where st.id = 44
;

/* quiz system end*/
SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Cairo';


  SELECT codearea.paid_class.appointment AT TIME ZONE 'Africa/Cairo'
    FROM codearea.paid_class where codearea.paid_class.student_id = 70 ORDER BY DATE(codearea.paid_class.appointment);
	
	
  SELECT *
    FROM codearea.paid_class
    WHERE codearea.paid_class.appointment AT TIME ZONE 'Africa/Cairo' >=
    CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Cairo' AND codearea.paid_class.student_id = 70
    ORDER BY codearea.paid_class.appointment LIMIT 4;
	
	
	
	SELECT st.name , thsc.day , thsc.time,
	(SELECT COUNT(id) from codearea.paid_class pd where pd.lesson_id is not null  and pd.student_id = 85) as sessionsDone,
	(SELECT COUNT(id) from codearea.paid_class pd where pd.lesson_id is null and date(appointment) < current_date
	 and pd.student_id = 85) as sessionsAbsent
	FROM codearea.student st
	inner join codearea.teacher th on th.id = st.teacher_id
	inner join codearea.student_schedule stsc ON stsc.student_id = st.id
	inner join codearea.teacher_schedule thsc ON thsc.id = stsc.teacher_schedule_id
	where th.id = 6;

	SELECT th.name , th.email, 
	(SELECT COUNT(id) from codearea.paid_class pd where pd.lesson_id is not null and pd.teacher_id = 6) as paidDone,
	(SELECT COUNT(id) from codearea.demo_class pd where pd.teacher_id = 6) as demoDone
	from codearea.teacher th 
	where th.id = 6;
	
	
	select sl.*,
		(select EXISTS(select * from codearea.demo_app da inner join
				   codearea.demo_class dc on dc.demo_app_id = da.id where da.slot_id = sl.id and dc.teacher_id = 6 )) as has_demo,
	   (select EXISTS(select * from codearea.slot_availablity sa where sa.slot_id = sl.id and teacher_id = 6 )) as booked_as_demo
	from codearea.slot sl
	 where sl.appointment > now();



select * 