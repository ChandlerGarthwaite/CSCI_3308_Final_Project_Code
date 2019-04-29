

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

create table locations
(
  location_id   serial primary key,
  name          varchar(50),
  groups integer[]
);

INSERT INTO locations(name) VALUES ('Benson Library'), ('CASE Building'),('Engineering Library'),('Gemmill Library'), ('KoelBel Library'), ('Norlin Library'), ('Wise Law Library');

create table groups
(
  group_id serial primary key,
  members int[],
  subject varchar(50),
  location int
);

INSERT INTO groups(members,subject, location) VALUES('{23}','MATH', '6');
INSERT INTO groups(members,subject, location) VALUES('{2}','Sciences', '6');
INSERT INTO groups(members,subject, location) VALUES('{1}','MATH', '1');

UPDATE groups SET members = members || '{31}' WHERE group_id = 1;
UPDATE groups SET members = array_remove(members, '31') WHERE group_id = 1;

UPDATE locations SET groups = groups || '{3}' WHERE location_id = 1;
UPDATE locations SET groups = groups || '{1,2}' WHERE location_id = 6;
