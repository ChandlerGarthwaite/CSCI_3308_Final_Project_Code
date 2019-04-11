create table "user"
(
  user_id           serial      not null
    constraint user_pkey
      primary key,
  first_name        varchar(20) not null,
  last_name         varchar(20) not null,
  email             varchar(50) not null,
  date_of_birth     integer     not null,
  major             varchar(50),
  school_year       varchar(20),
  hometown          varchar(20),
  course_list       text[],
  favorite_subjects text[],
  friends           integer[],
  study_status      boolean,
  study_group       integer,
  picture           text,
  user_name         varchar(20) not null,
  user_password     varchar(20) not null
);

create table locations
(
  location_id   serial not null
    constraint locations_pk
      primary key,
  name          varchar(50),
  active_groups integer[]
);

create table study_groups
(
  group_id    serial      not null
    constraint study_groups_pk
      primary key,
  members     integer[],
  subject     varchar(50) not null,
  location    integer     not null,
  start_time  time,
  end_time    time,
  description text
);
