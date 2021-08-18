-- ADD DATA TO USERS TABLE
INSERT INTO users (name, email, password)
VALUES ('Bob', 'bob@bob.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('Mary', 'mary@mary.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('Jane', 'jane@jane.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- ADD DATA TO PROPERTIES TABLE
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES(1,'Blank corner','description','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',85234,6,6,7,'Canada','651 Nami Road','Bohbatev','Alberta',83680);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES(2,'Habit mix','description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',46058,0,5,6,'Canada','1650 Hejto Center','Genwezuj','Newfoundland And Labrador',44583);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES(3,'Headed know','description','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',82640,0,5,5,'Canada','513 Powov Grove','Jaebvap','Ontario',38051);

-- ADD DATA TO RESERVATIONS TABLE
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11','2018-09-26',2,3);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2019-01-04','2019-02-01',2,2);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-10-01','2021-10-14',1,1);

-- INSERT DATA INTO PROPERTY REVIEWS TABLE
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1,1,1,1,'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2,2,2,4,'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3,3,3,5,'messages');