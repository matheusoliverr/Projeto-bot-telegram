DROP DATABASE IF EXISTS js_code_maker;
CREATE DATABASE js_code_maker;

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "key" text NOT NULL,
  "answer" text,
  "data_text" text,
  "validator" int NOT NULL,
  "user_insert" boolean NOT NULL,
  "element_count" boolean
);

CREATE TABLE "options" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL
);

CREATE TABLE "question_options" (
  "id" SERIAL PRIMARY KEY,
  "question_id" int,
  "option_id" int
);

CREATE TABLE user_data (
  "id" SERIAL PRIMARY KEY,
  "text" text[],
  "type" text NOT NULL
);

ALTER TABLE "question_options" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "question_options" ADD FOREIGN KEY ("option_id") REFERENCES "options" ("id");

INSERT INTO "questions" (
  "key",
  "answer",
  "validator",
  "user_insert"
) VALUES ('iniciar', 'Podemos começar com as variáveis. Digite uma das opções: ', 1, false), 
  ('var', 'Agora vamos declarar o tipo de variável que vamos utilizar: ', 2, false),
  ('array', 'Qual será o conteúdo do nosso array?', 2, false),
  ('objeto', 'Quantas propriedades nosso objeto receberá?', 2, true)


INSERT INTO "options" (
  "title"
) VALUES ('var'), 
  ('array'),
  ('objeto'),
  ('const'),
  ('let')


INSERT INTO "question_options" (
  "question_id",
  "option_id"
) VALUES (1, 1), 
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (3, 1),
  (3, 2)
