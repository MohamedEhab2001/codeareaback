/* demo application*/
CREATE TABLE first.demo_app(
	id SERIAL PRIMARY KEY,
	country varchar NOT NULL,
	st_name varchar NOT NULL,
	st_age real NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	slot_id integer NOT NULL,
	created_at TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);


/* slot */
CREATE TABLE first.slot(
	id SERIAL PRIMARY KEY,
	appointment TIMESTAMP with time zone,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/* slot_availablity*/
CREATE TABLE first.slot_availablity(
	slot_id integer not null,
	teacher_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/*slot teacher*/
CREATE TABLE first.slot_teacher(
	teacher_id integer not null,
	slot_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/*class*/
CREATE TABLE first.class(
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
CREATE TABLE first.course(
	id SERIAL PRIMARY KEY,
	name varchar not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/*chapter*/
CREATE TABLE first.chapter(
	id SERIAL PRIMARY KEY,
	title varchar not null,
	number integer not null,
	course_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);


/*lesson*/
CREATE TABLE first.lesson(
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





/* quiz system start*/

/*quiz*/
CREATE TABLE first.quiz(
	id SERIAL PRIMARY KEY,
	title varchar not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE first.quiz_questions(
	quiz_id integer not null,
	question_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE first.questions(
	id serial primary key,
	title varchar not null,
	right_answer_id integer not null,
	question_id integer not null,
	point integer not null,
	image_url varchar,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE first.answer(
	id serial primary key,
	title varchar not null,
	image_url varchar,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE first.question_answers(
	question_id integer not null,
	answer_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE first.quiz_result(
	id SERIAL PRIMARY KEY,
	student_id integer not null,
	quiz_id integer not null,
	mark integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

CREATE TABLE first.student_answers(
	student_id integer not null,
	quiz_id integer not null,
	answer_id integer not null,
	question_id integer not null,
	created_at  TIMESTAMP with time zone,
	updated_at  TIMESTAMP with time zone
);

/* quiz system end*/
