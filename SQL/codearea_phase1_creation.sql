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


/*class*/
CREATE TABLE codearea.class(
	id SERIAL PRIMARY KEY,
	teacher_id integer not null,
	slot_id integer not null,
	consignee_id integer not null,
	type varchar not null,
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
	unique (slot_id,consignee_id),
	unique (slot_id,teacher_id) 
);





/*COURSE*/
CREATE TABLE codearea.course(
	id SERIAL PRIMARY KEY,
	name varchar not null,
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
	email varchar not null,
	private_email varchar not null,
	address varchar not null,
	password varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);


/*teacher*/

/*visits*/

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
schedule_id integer not null,
	

created_at  TIMESTAMP with time zone default now() not null,
updated_at  TIMESTAMP with time zone default now() not null
);


/*operation*/
/*
types:
each number refers to operation type:
0=>refund
1=>buy
*/

create table codearea.operation(
id serial primary key,
title varchar not null,
type integer not null,
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

/*teacher students*/ 
CREATE TABLE codearea.teacher_student(
	teacher_id integer not null,
	student_id integer not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);

/*schedule*/
create table codearea.schedule(
id serial primary key,
	day integer not null,
	time varchar not null,
	created_at  TIMESTAMP with time zone default now() not null,
	updated_at  TIMESTAMP with time zone default now() not null
);
----------------------------------------------------------------------------------------------------------

-- DEMO APPLICATION ALTER
ALTER TABLE codearea.demo_app           
    ADD CONSTRAINT fk_demo_slot FOREIGN KEY(slot_id) REFERENCES codearea.slot(id);
	
	
	
-- slot_availablity alter
Alter Table codearea.slot_availablity
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id),
	Add constraint fk_slot_id foreign key(slot_id) references codearea.slot(id) on delete cascade;
	
-- class alter
Alter Table codearea.class
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id),
	Add constraint fk_slot_id foreign key(slot_id) references codearea.slot(id),
	Add constraint fk_lesson_id foreign key(lesson_id) references codearea.lesson(id);

-- chapter alter
alter table codearea.chapter
	Add constraint fk_course_id foreign key(course_id) references codearea.course(id)  on delete cascade;
	
-- student alter
alter table codearea.student
	add constraint fk_schedule_id foreign key (schedule_id) references codearea.schedule(id) on delete cascade,
	Add constraint fk_teacher_id foreign key(teacher_id) references codearea.teacher(id) ;
	
-- lesson alter
alter table codearea.lesson
	Add constraint fk_chapter_id foreign key(chapter_id) references codearea.chapter(id)  on delete cascade;
	
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
