import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('d8e37b42-d15f-4cf0-a468-c9a1ee08b7c1', '1Meda.Hessel@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_fghij', 'banned', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('ab4b2ec1-678a-48f8-8341-734a6d4d1a1a', '8Stella.Armstrong67@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_67890', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('f211260f-b4bd-40b8-be1f-25e4aa03f6c6', '15Corbin26@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_67890', 'banned', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('108be0d3-df07-4082-8e3f-b540da493dcc', '22Samson.Rowe@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_klmno', 'banned', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('5c49a0d7-5748-40eb-9661-51cfdc0a513a', '36Loraine_Feest91@gmail.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=38', 'cus_12345', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', '43Hermann_McLaughlin75@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_klmno', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('cfa96446-354a-41ae-a792-c528860dc797', '50Eula98@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_fghij', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('086581f3-4855-49fd-98f6-6b248844d6a5', '57Idell.Leuschke@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_klmno', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('a3834cb9-f715-4a55-8ca9-4c755e62fab7', '64Estel.Walker-Lindgren@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=66', 'cus_67890', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('80517499-844d-4b13-bd9f-eb0bc7b64378', 'New Message from John Doe', 'Reminder The hiking trip is this weekend. Make sure to pack your essentials', 'Alice Johnson', '74Enos66@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=75', 'https://i.imgur.com/YfJQV5z.png?id=76', 'cfa96446-354a-41ae-a792-c528860dc797');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('9c094a10-f88c-4e90-b2f7-0509d372939d', 'Event Reminder Hiking Trip', 'You have received a new message from John Doe. Check it out now', 'Charlie Brown', '81Lizeth.Welch0@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=82', 'https://i.imgur.com/YfJQV5z.png?id=83', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('72fe3c70-07b3-4bbf-be01-a26e9b5b027f', 'Event Reminder Hiking Trip', 'Join the group chat to discuss weekend plans with your neighbors.', 'Charlie Brown', '88Kelton.Fay26@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('725ec902-8c53-4658-9d68-859c3b9c30f4', 'Upcoming Event Meet and Greet', 'Join the group chat to discuss weekend plans with your neighbors.', 'Bob Smith', '95Karine.Gorczany@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=96', 'https://i.imgur.com/YfJQV5z.png?id=97', '108be0d3-df07-4082-8e3f-b540da493dcc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a4b84068-796c-4d7f-bae7-059abab06857', 'New Group Created in Your Area', 'Dont miss out on the upcoming meet and greet event. Click to RSVP', 'Diana Prince', '102Cindy_Johnston@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=103', 'https://i.imgur.com/YfJQV5z.png?id=104', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a4357452-bec5-4738-9d68-1848f67d9267', 'Group Chat Weekend Plans', 'A new group has been created in your area. Join now to connect with likeminded people', 'Eve Adams', '109Delphine_Dickinson45@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=110', 'https://i.imgur.com/YfJQV5z.png?id=111', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('e81ba782-62e7-4f0b-865f-d0747833d079', 'New Group Created in Your Area', 'A new group has been created in your area. Join now to connect with likeminded people', 'Charlie Brown', '116Jonatan67@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=117', 'https://i.imgur.com/YfJQV5z.png?id=118', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f1584cd2-033c-4f1c-89d5-dbf19c03bfe4', 'Group Chat Weekend Plans', 'Dont miss out on the upcoming meet and greet event. Click to RSVP', 'Eve Adams', '123Kelsi_Hansen@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=124', 'https://i.imgur.com/YfJQV5z.png?id=125', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('6b6bac31-74ff-41a3-a3f2-8b35ced23591', 'New Message from John Doe', 'Reminder The hiking trip is this weekend. Make sure to pack your essentials', 'Diana Prince', '130Katelyn44@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=131', 'https://i.imgur.com/YfJQV5z.png?id=132', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('77f95602-d3b6-4d40-89d7-3cd674a59170', 'Group Chat Weekend Plans', 'Reminder The hiking trip is this weekend. Make sure to pack your essentials', 'Eve Adams', '137Eliza_Gottlieb37@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=138', 'https://i.imgur.com/YfJQV5z.png?id=139', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1');

INSERT INTO "post_data" ("id", "content", "userId") VALUES ('17069554-444f-4484-a439-41020a303dcd', 'Yoga in the park this Saturday morning. Join us', '108be0d3-df07-4082-8e3f-b540da493dcc');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('6e9fa209-e98b-40d9-95e5-e9d3dceb1b78', 'Looking for hiking buddies in the area', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('0784fd16-14ef-44c1-8f85-506941043d2e', 'Yoga in the park this Saturday morning. Join us', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('06c60c59-eda7-4b57-9fc2-3160de1d4957', 'Yoga in the park this Saturday morning. Join us', '086581f3-4855-49fd-98f6-6b248844d6a5');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('688140bf-0b2a-48d0-a30e-94558dc2e8ac', 'Yoga in the park this Saturday morning. Join us', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('12b481ae-3c58-4abc-9ef3-75f84d60459e', 'Yoga in the park this Saturday morning. Join us', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('38f2488c-7af9-4afe-b711-07c6d21fb707', 'Anyone interested in a book club meetup this weekend', '086581f3-4855-49fd-98f6-6b248844d6a5');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('5a3ca692-0ee4-4869-b5bc-e6c77d3fc2d0', 'Looking for hiking buddies in the area', '108be0d3-df07-4082-8e3f-b540da493dcc');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('a1568956-44ea-4d86-8c46-475692bcb344', 'Game night at my place this Friday. Whos in', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6');
INSERT INTO "post_data" ("id", "content", "userId") VALUES ('335ba738-c337-42af-bc8e-7c4a2f8a0525', 'Lets organize a local farmers market visit.', 'cfa96446-354a-41ae-a792-c528860dc797');

INSERT INTO "like" ("id", "userId", "postId") VALUES ('16070b56-eb60-42fa-98ea-66a0b9bbb11a', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7', '6e9fa209-e98b-40d9-95e5-e9d3dceb1b78');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('c4249440-bb51-4a5f-b527-4feeb4dcac69', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6', '5a3ca692-0ee4-4869-b5bc-e6c77d3fc2d0');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('c046cf60-ee01-4821-8bb4-188efa750161', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '6e9fa209-e98b-40d9-95e5-e9d3dceb1b78');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('8791a38b-e420-4b87-bcbb-2b5635d29a2a', 'cfa96446-354a-41ae-a792-c528860dc797', '17069554-444f-4484-a439-41020a303dcd');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('cee4552f-d565-4344-8e1b-a24c2a324501', '5c49a0d7-5748-40eb-9661-51cfdc0a513a', '17069554-444f-4484-a439-41020a303dcd');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('15e34398-0ee4-4577-82b6-53f71ef52567', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '12b481ae-3c58-4abc-9ef3-75f84d60459e');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('29f411c4-ab52-4fad-afe6-3d1734e51fcd', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1', '5a3ca692-0ee4-4869-b5bc-e6c77d3fc2d0');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('cc73e558-0b12-4c2c-9ecb-708252bf0b54', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7', '688140bf-0b2a-48d0-a30e-94558dc2e8ac');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('95ef88fb-d40f-4ab8-a403-d4e924ce5e69', '108be0d3-df07-4082-8e3f-b540da493dcc', '0784fd16-14ef-44c1-8f85-506941043d2e');
INSERT INTO "like" ("id", "userId", "postId") VALUES ('806ac658-4d7c-44ad-bf45-a2b017869908', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6', '335ba738-c337-42af-bc8e-7c4a2f8a0525');

INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('698634dc-850b-4ebf-9b90-7c26091f52c1', 'Looking for book recommendations.', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', '38f2488c-7af9-4afe-b711-07c6d21fb707');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('e3c25ff5-079c-4378-9512-c3f0956c94c9', 'Anyone interested in hiking this weekend', 'cfa96446-354a-41ae-a792-c528860dc797', '0784fd16-14ef-44c1-8f85-506941043d2e');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('17de5e33-4a2d-4e64-b4fc-a025da50e9ff', 'Excited to join this community', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1', '688140bf-0b2a-48d0-a30e-94558dc2e8ac');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('b3f1e9d0-6a5a-47af-804e-a798c73e71fa', 'Anyone interested in hiking this weekend', '5c49a0d7-5748-40eb-9661-51cfdc0a513a', '688140bf-0b2a-48d0-a30e-94558dc2e8ac');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('1efce4e3-8ebc-4fb3-be7d-4e17d250b182', 'Excited to join this community', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6', '06c60c59-eda7-4b57-9fc2-3160de1d4957');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('0eed78e2-42e0-4f92-b5b2-0247e0c5a0a9', 'Looking for book recommendations.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '5a3ca692-0ee4-4869-b5bc-e6c77d3fc2d0');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('f648dba9-f1da-4907-b565-ea162fe28f1a', 'This is such a great idea', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '0784fd16-14ef-44c1-8f85-506941043d2e');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('fcd29610-113f-473c-bdfa-6b11d6c7dba1', 'Excited to join this community', '108be0d3-df07-4082-8e3f-b540da493dcc', '0784fd16-14ef-44c1-8f85-506941043d2e');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('b47e1d3c-5802-487f-9af4-22b52b4d289e', 'Looking for book recommendations.', 'f211260f-b4bd-40b8-be1f-25e4aa03f6c6', '12b481ae-3c58-4abc-9ef3-75f84d60459e');
INSERT INTO "comment" ("id", "content", "userId", "postId") VALUES ('c2111e97-31d6-4f2c-95f0-ffe4d668f159', 'This is such a great idea', '5c49a0d7-5748-40eb-9661-51cfdc0a513a', '5a3ca692-0ee4-4869-b5bc-e6c77d3fc2d0');

INSERT INTO "group" ("id", "name", "description") VALUES ('164fa44f-cc72-4c3d-a350-51fb7ba57328', 'Music Maniacs', 'A group for people who love discussing the latest in technology.');
INSERT INTO "group" ("id", "name", "description") VALUES ('66448338-d1c9-4de7-8ae0-372817320f45', 'Foodies United', 'A group for food lovers to share recipes and restaurant recommendations.');
INSERT INTO "group" ("id", "name", "description") VALUES ('4e63e135-5ed9-4648-8b0f-91e8bb7731b7', 'Music Maniacs', 'For those who live and breathe music come share your favorite tunes.');
INSERT INTO "group" ("id", "name", "description") VALUES ('d1c428db-36af-4710-85f0-a81656d8453f', 'Fitness Freaks', 'A group for food lovers to share recipes and restaurant recommendations.');
INSERT INTO "group" ("id", "name", "description") VALUES ('b6e2fb1d-4405-4b04-b9cf-07947a3de202', 'Music Maniacs', 'A group for people who love discussing the latest in technology.');
INSERT INTO "group" ("id", "name", "description") VALUES ('23d5db36-be97-4b79-ac39-15d28b6b55b4', 'Foodies United', 'A group for people who love discussing the latest in technology.');
INSERT INTO "group" ("id", "name", "description") VALUES ('6fb40ba4-1698-4a70-9e03-bcf1d2b70bbb', 'Music Maniacs', 'Join us to share and discuss your favorite books.');
INSERT INTO "group" ("id", "name", "description") VALUES ('4e129738-93bd-463d-b510-28b29a89d549', 'Fitness Freaks', 'A place for fitness enthusiasts to share tips and motivate each other.');
INSERT INTO "group" ("id", "name", "description") VALUES ('159a76d3-bb8d-4f05-ab66-907c03e51307', 'Book Lovers', 'A group for people who love discussing the latest in technology.');
INSERT INTO "group" ("id", "name", "description") VALUES ('1117f41b-7be0-4a04-aa64-3d06c74a31d3', 'Foodies United', 'A place for fitness enthusiasts to share tips and motivate each other.');

INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('1fb7695b-0493-4f4f-915b-b259a8735232', 'd1c428db-36af-4710-85f0-a81656d8453f', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('f8d0434c-c76e-4cac-a1f3-9046e367382e', '1117f41b-7be0-4a04-aa64-3d06c74a31d3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('fef12afc-cd68-492a-a215-2bca3899bb71', 'b6e2fb1d-4405-4b04-b9cf-07947a3de202', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('7e123029-0a19-48b1-ac8e-379d8827a970', '6fb40ba4-1698-4a70-9e03-bcf1d2b70bbb', '5c49a0d7-5748-40eb-9661-51cfdc0a513a');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('ebfd3a38-46cd-47b0-b991-4991faf05dfa', '4e63e135-5ed9-4648-8b0f-91e8bb7731b7', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('48800643-3854-4149-98ee-1dd71edc5eb8', '164fa44f-cc72-4c3d-a350-51fb7ba57328', '5c49a0d7-5748-40eb-9661-51cfdc0a513a');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('edf03dc1-e787-4220-999c-4915ba3e8b9d', '23d5db36-be97-4b79-ac39-15d28b6b55b4', '108be0d3-df07-4082-8e3f-b540da493dcc');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('513c9d59-ff27-4f74-bb3b-1a6d881b5a79', '4e63e135-5ed9-4648-8b0f-91e8bb7731b7', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('efc4b0d4-1c0e-4893-b3f7-0612c701dd91', 'b6e2fb1d-4405-4b04-b9cf-07947a3de202', '108be0d3-df07-4082-8e3f-b540da493dcc');
INSERT INTO "group_member" ("id", "groupId", "userId") VALUES ('842dde78-e93f-4f92-b66d-80b88eadccf0', '4e129738-93bd-463d-b510-28b29a89d549', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a');

INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('1d791c60-cda9-4fdc-b801-885c864c1e81', 'Join us for a community cleanup event this Saturday', '4e129738-93bd-463d-b510-28b29a89d549', '5c49a0d7-5748-40eb-9661-51cfdc0a513a');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('d1cf0bd1-dc7c-428c-8000-27902ff7929d', 'Looking for a study group for the upcoming exams.', '1117f41b-7be0-4a04-aa64-3d06c74a31d3', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('9994ad14-8d31-4466-b12d-9b29584dfb25', 'Looking for a study group for the upcoming exams.', '4e63e135-5ed9-4648-8b0f-91e8bb7731b7', 'cfa96446-354a-41ae-a792-c528860dc797');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('a1226943-6fe6-45c4-b8de-2e2d89371f69', 'Looking for a study group for the upcoming exams.', 'b6e2fb1d-4405-4b04-b9cf-07947a3de202', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('1a6c9157-e386-4fff-a988-a4eac07eb985', 'Lets discuss the latest trends in digital marketing.', '164fa44f-cc72-4c3d-a350-51fb7ba57328', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('9808fef0-616d-4f6b-beb7-e5fd75dae0c2', 'Excited to meet everyone at the local tech meetup', '4e129738-93bd-463d-b510-28b29a89d549', '086581f3-4855-49fd-98f6-6b248844d6a5');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('cf250b91-646c-4ada-94b6-8f7e25ffa16b', 'Lets discuss the latest trends in digital marketing.', '66448338-d1c9-4de7-8ae0-372817320f45', 'cfa96446-354a-41ae-a792-c528860dc797');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('51a88c40-ce89-4ce3-ab59-7a0e15e43c41', 'Excited to meet everyone at the local tech meetup', '6fb40ba4-1698-4a70-9e03-bcf1d2b70bbb', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('7a7f5a90-f554-46c1-ad1d-a2e69d324cdc', 'Anyone interested in a weekend hiking trip', '6fb40ba4-1698-4a70-9e03-bcf1d2b70bbb', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a');
INSERT INTO "group_post" ("id", "content", "groupId", "userId") VALUES ('2ace46e0-7a1c-467b-bf86-2e2fafad3eec', 'Excited to meet everyone at the local tech meetup', '164fa44f-cc72-4c3d-a350-51fb7ba57328', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('2ac2de41-1d4a-4d6e-ae9b-3f4e79dd7fe9', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7', 'a1226943-6fe6-45c4-b8de-2e2d89371f69');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('6b70327f-9f46-4084-8e4c-73629bbed373', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1', '9808fef0-616d-4f6b-beb7-e5fd75dae0c2');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('e3ab7411-14ba-42a4-ae3b-ab0373e38d6b', '108be0d3-df07-4082-8e3f-b540da493dcc', 'd1cf0bd1-dc7c-428c-8000-27902ff7929d');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('be7113e5-bb6b-467f-9ac1-e9e8d738f5eb', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', '1d791c60-cda9-4fdc-b801-885c864c1e81');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('f4790e9b-8a1a-432e-b834-3acccee71beb', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', 'a1226943-6fe6-45c4-b8de-2e2d89371f69');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('f7f928f0-fda7-429d-a5f2-ee945f26b03e', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a', 'd1cf0bd1-dc7c-428c-8000-27902ff7929d');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('671c73b6-9d2c-413d-9ea0-08e24109775a', '086581f3-4855-49fd-98f6-6b248844d6a5', '9994ad14-8d31-4466-b12d-9b29584dfb25');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('548229e7-cda6-4c32-8bde-2b8e4666533a', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', '7a7f5a90-f554-46c1-ad1d-a2e69d324cdc');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('b1773ad8-7853-472a-af5d-9ae52b7872b6', 'cfa96446-354a-41ae-a792-c528860dc797', '9808fef0-616d-4f6b-beb7-e5fd75dae0c2');
INSERT INTO "group_post_like" ("id", "userId", "groupPostId") VALUES ('62adb34e-8564-4902-8a4c-6cdd16521034', '5c49a0d7-5748-40eb-9661-51cfdc0a513a', 'cf250b91-646c-4ada-94b6-8f7e25ffa16b');

INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('4850e8b6-0a16-4b21-ad0d-056755f0ac62', 'Loved the ideas shared in todays session', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', 'cf250b91-646c-4ada-94b6-8f7e25ffa16b');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('d0cb2b78-5943-44da-a20d-4fca429dcb41', 'Can someone help me with this project', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '7a7f5a90-f554-46c1-ad1d-a2e69d324cdc');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('5add5778-bfa8-4de3-867b-5f6b066bb201', 'Can someone help me with this project', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '51a88c40-ce89-4ce3-ab59-7a0e15e43c41');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('c9f5101a-8777-4e59-9691-5a28bec28232', 'Loved the ideas shared in todays session', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'a1226943-6fe6-45c4-b8de-2e2d89371f69');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('6f80e2fc-0a17-45b6-96ca-edfdad894cdc', 'Great discussion today learned a lot', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7', '51a88c40-ce89-4ce3-ab59-7a0e15e43c41');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('afcd779f-f452-4bf9-ab33-54750473a301', 'Great discussion today learned a lot', 'cfa96446-354a-41ae-a792-c528860dc797', 'a1226943-6fe6-45c4-b8de-2e2d89371f69');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('af28d06c-5e6e-4e7d-bdad-583aedd212a1', 'Does anyone have book recommendations', 'cfa96446-354a-41ae-a792-c528860dc797', '9994ad14-8d31-4466-b12d-9b29584dfb25');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('891111f1-54ff-46d7-8bd2-59f28115854f', 'Can someone help me with this project', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '1a6c9157-e386-4fff-a988-a4eac07eb985');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('36398186-92ee-46f2-8b20-ceecb5232b8c', 'Loved the ideas shared in todays session', 'cfa96446-354a-41ae-a792-c528860dc797', '9808fef0-616d-4f6b-beb7-e5fd75dae0c2');
INSERT INTO "group_post_comment" ("id", "content", "userId", "groupPostId") VALUES ('17d488cb-9c23-4d2b-957c-a2349bc410ec', 'Loved the ideas shared in todays session', 'cfa96446-354a-41ae-a792-c528860dc797', '9808fef0-616d-4f6b-beb7-e5fd75dae0c2');

INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('b3e03989-cc90-4003-8f41-3cb3a36dc5ac', 'Can someone recommend a good local gym', '108be0d3-df07-4082-8e3f-b540da493dcc', '5c49a0d7-5748-40eb-9661-51cfdc0a513a');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('9baa83b4-b81a-4302-b754-8f60371ad3eb', 'Hey are you free to meet up this weekend', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', 'd8e37b42-d15f-4cf0-a468-c9a1ee08b7c1');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('9a3a5fb0-6fb8-4c30-9926-409dee9d8ff9', 'Did you check out the new cafe that opened nearby', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('3f54eca7-8ada-47c2-b198-29f77186895f', 'Hey are you free to meet up this weekend', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a', '086581f3-4855-49fd-98f6-6b248844d6a5');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('035bf959-042b-4fc8-a07a-47baccdc6358', 'Anyone interested in a book club meeting next week', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('34ea2f3c-40ff-4792-ae0f-54a9018b87be', 'Can someone recommend a good local gym', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c', 'cfa96446-354a-41ae-a792-c528860dc797');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('fa6f998e-916d-4b09-a42d-6eb9e57a0d38', 'Anyone interested in a book club meeting next week', 'cfa96446-354a-41ae-a792-c528860dc797', '086581f3-4855-49fd-98f6-6b248844d6a5');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('34d9fa51-ff78-4bfa-a766-5e39eac47654', 'Lets organize a group hike this Saturday', 'cfa96446-354a-41ae-a792-c528860dc797', 'ac7f4835-b08e-4bc5-8b82-4299ce07bd8c');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('cada5e56-a08d-45ac-b912-c1ce34d5e1c6', 'Can someone recommend a good local gym', 'ab4b2ec1-678a-48f8-8341-734a6d4d1a1a', '5c49a0d7-5748-40eb-9661-51cfdc0a513a');
INSERT INTO "direct_message" ("id", "content", "senderId", "receiverId") VALUES ('23cb0ceb-f7fc-4469-9e62-66e11733e06c', 'Anyone interested in a book club meeting next week', '086581f3-4855-49fd-98f6-6b248844d6a5', 'a3834cb9-f715-4a55-8ca9-4c755e62fab7');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
