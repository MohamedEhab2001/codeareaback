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
	created_at TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);


/* slot */
CREATE TABLE codearea.slot(
	id SERIAL PRIMARY KEY,
	appointment TIMESTAMP with time zone,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/* slot_availablity*/
CREATE TABLE codearea.slot_availablity(
	slot_id integer not null,
	teacher_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);


/*class*/
CREATE TABLE codearea.class(
	id SERIAL PRIMARY KEY,
	teacher_id integer not null,
	feedback_id integer not null,
	slot_id integer not null,
	consignee_id integer not null,
	type varchar not null,
	meeting_url varchar not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);




/*COURSE*/
CREATE TABLE codearea.course(
	id SERIAL PRIMARY KEY,
	name varchar not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/*chapter*/
CREATE TABLE codearea.chapter(
	id SERIAL PRIMARY KEY,
	title varchar not null,
	number integer not null,
	course_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
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
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);


----------------------------------------------------------------------------------------------------------------

-- DEMO APPLICATION ALTER
ALTER TABLE codearea.demo_app           
    ADD CONSTRAINT fk_demo_slot FOREIGN KEY(slot_id) REFERENCES codearea.slot(id);
	
	
-- D

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
