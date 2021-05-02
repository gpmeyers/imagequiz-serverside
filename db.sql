create table imagequiz.flowers(
	id bigserial primary key,
	name text not null,
	picture text not null
);

create table imagequiz.questions(
	id bigserial primary key,
	flowerid integer references imagequiz.flowers(id),
	choice1 text not null,
	choice2 text not null,
	choice3 text not null,
	answer text not null
);

create table imagequiz.quizzes(
	id bigserial primary key,
	quiznumber integer not null,
	questionid integer references imagequiz.questions(id)
);

create table imagequiz.customers(
	id bigserial primary key,
	name text,
	email text,
	password text
);

create table imagequiz.scores(
	id bigserial primary key,
	customerid integer references imagequiz.customers(id),
	quizid integer references imagequiz.quizzes(id),
	score integer not null
);