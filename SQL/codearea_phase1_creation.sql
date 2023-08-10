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


/* slot */
CREATE TABLE codearea.slot(
	id SERIAL PRIMARY KEY,
	appointment TIMESTAMP with time zone,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


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

SELECT codearea.paid_class.id , codearea.paid_class.canceled FROM codearea.paid_class
WHERE
  codearea.paid_class.student_id = 40
  AND EXTRACT(MONTH FROM appointment) = 7 
  AND EXTRACT(DAY FROM appointment) = 10
  AND EXTRACT(YEAR FROM appointment) = 2022;



SELECT *  FROM codearea.student;
SELECT *  FROM codearea.student_schedule where codearea.student_schedule.student_id = 74;;
SELECT * FROM  codearea.paid_class where codearea.paid_class.student_id = 74;

SELECT * from codearea.teacher_schedule where teacher_id = 2;
SELECT * from codearea.teacher;
-------------------------------------------------
SELECT * from codearea.student;
SELECT * from codearea.operation;
SELECT * from codearea.operation_chapter;
insert into codearea.operation_chapter(operation_id , chapter_id) values (46 , 3)
SELECT * from codearea.plan;
SELECT * from codearea.chapter;
SELECT * from codearea.lesson;
SELECT * from codearea.course;
SELECT * from codearea.plan;
-- mena and salma password changed
SELECT * from codearea.student ORDER BY codearea.student.id ASC;
SELECT * from codearea.demo_app;
SELECT * from codearea.demo_app where DATE(created_at) = CURRENT_DATE  ORDER BY codearea.demo_app.id ASC ;
SELECT * from codearea.demo_class;
SELECT * from codearea.slot ORDER BY codearea.slot.id ASC;
SELECT * from codearea.slot where DATE(created_at) = CURRENT_DATE  ORDER BY codearea.slot.id ASC
SELECT * from codearea.slot_availablity where DATE(created_at) = CURRENT_DATE  ORDER BY codearea.slot_availablity.slot_id ASC;
SELECT * from codearea.visitors;

INSERT INTO codearea.plan (title) VALUES ('STEP BY STEP'), ('CONFIDENT') , ('CUSTOM PATH');


insert into codearea.slot(appointment) values('2023-08-09T11:00:00.098Z');
insert into codearea.slot(appointment) values('2023-08-09T12:00:42.098Z');
insert into codearea.slot(appointment) values('2023-08-09T13:00:42.098Z');
insert into codearea.slot(appointment) values('2023-08-09T15:00:42.098Z');
insert into codearea.slot(appointment) values('2023-08-09T16:00:42.098Z');
insert into codearea.slot(appointment) values('2023-08-09T17:00:42.098Z');
insert into codearea.slot(appointment) values('2023-08-09T14:00:42.098Z');


select * from codearea.zoom;

DO $$
DECLARE
    slot_id INTEGER := 303;
    teacher_id INTEGER := 1;
BEGIN
    WHILE slot_id <= 309 LOOP
        INSERT INTO codearea.slot_availablity(slot_id, teacher_id, created_at, updated_at)
        VALUES (slot_id, teacher_id, NOW(), NOW());
        slot_id := slot_id + 1;
    END LOOP;
END $$;
		


SELECT * from codearea.visitors where DATE(created_at) = CURRENT_DATE AND calling_code = '20';

      SELECT
      DATE_TRUNC('week', codearea.paid_class.appointment) AS week_start,
      AVG(codearea.paid_class.assignment_rate) AS avg_assignment_rate,
      AVG(codearea.paid_class.st_focus_rate) AS avg_st_focus_rate
      FROM
      codearea.paid_class
      WHERE 
      codearea.paid_class.student_id = 74
      AND EXTRACT(MONTH FROM DATE_TRUNC('week', codearea.paid_class.appointment)) = EXTRACT(MONTH FROM CURRENT_DATE)
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

/* quiz system end*/
SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Cairo';


  SELECT codearea.paid_class.appointment AT TIME ZONE 'Africa/Cairo'
    FROM codearea.paid_class where codearea.paid_class.student_id = 70 ORDER BY DATE(codearea.paid_class.appointment);
	
	
  SELECT *
    FROM codearea.paid_class
    WHERE codearea.paid_class.appointment AT TIME ZONE 'Africa/Cairo' >=
    CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Cairo' AND codearea.paid_class.student_id = 70
    ORDER BY codearea.paid_class.appointment LIMIT 4;
