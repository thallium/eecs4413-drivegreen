/*
DROP TABLE VisitEvent;

DROP TABLE POItem; DROP TABLE PO;
DROP TABLE Address;
DROP TABLE Item;
*/
 
/* create Item table*/

CREATE TABLE Item(
vid	VARCHAR(20) NOT NULL PRIMARY KEY, name VARCHAR(60) NOT NULL,
description VARCHAR(60) NOT NULL, brand VARCHAR(60) NOT NULL, model VARCHAR(60) NOT NULL,
quantity INT NOT NULL, price INT NOT NULL
);
 
/*insert data into item table*/
 
INSERT INTO ITEM (vid, name, description, brand, model, price, quantity) VALUES ('v001', 'electricsuv', 'a SUV built for utility and performance', 'Tesla', 'Model X', 87000, 21);
INSERT INTO ITEM (vid, name, description, brand, model, price, quantity) VALUES
('vv001', 'electricsuv', 'a fully electric, mid-size SUV', 'Tesla', 'Model Y', 99000, 15);
INSERT INTO ITEM (vid, name, description, brand, model, price, quantity) VALUES ('vd001', 'electricluxurysuv', 'a vehicle with a timeless and instantly recognizable design', 'Porsche', 'Taycan', 133000, 12);

