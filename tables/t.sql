create table "users"
(
  user_id serial primary key,
  first_name varchar(20) not null,
  last_name  varchar(20) not null,
  email      varchar(50) not null,
  username   varchar(20) not null,
  password   varchar(20) not null,
  date_of_birth date not null,
  major             varchar(50),
  school_year       varchar(20),
  hometown          varchar(20),
  course_list       text[],
  favorite_subjects text[],
  friends           integer[],
  study_status      boolean,
  study_group       integer,
  picture           text
);

create table "users"
(
  user_id serial primary key,
  first_name varchar(20),
  last_name  varchar(20),
  username   varchar(20),
  password   varchar(20),
  email      varchar(50),
  study_status boolean,
  major      varchar(50),
  grade      varchar(20),
  hometown   varchar(20),
  study_group int
);
