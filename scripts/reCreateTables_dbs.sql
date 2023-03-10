DROP TABLE orders;
DROP TABLE drivers;
DROP TABLE clusters;
-- DROP TABLE users;

CREATE TABLE clusters (
name VARCHAR(255) PRIMARY KEY,
postcode VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO clusters VALUES
('A', '10'),
('B', '11'),
('C', '16');

CREATE TABLE drivers (
name VARCHAR(255) PRIMARY KEY,
cluster VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO drivers VALUES
('Moe', 'A'),
('Larry', 'B'),
('Curly', 'C');

CREATE TABLE orders (
voucher VARCHAR(255) PRIMARY KEY,
postcode_area VARCHAR(255),
postcode VARCHAR(255) NOT NULL,
scanned BOOLEAN DEFAULT FALSE
);

INSERT INTO orders VALUES
('A1A', '10', '10041'),
('B2B', '11', '11332'),
('C3C', '10', '10042'),
('D4D', '11', '11342'),
('E5E', '11', '11444'),
('F6F', '16', '16788'),
('G7G', '16', '16788'),
('H8H', '10', '10043'),
('I9I', '16', '16800'),
('J0J', '16', '16801');

-- CREATE TABLE users (
-- _id VARCHAR(255) PRIMARY KEY,
-- name VARCHAR(255) NOT NULL UNIQUE,
-- password VARCHAR(255) NOT NULL
-- );