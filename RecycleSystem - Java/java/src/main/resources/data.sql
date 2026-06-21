MERGE INTO users (name, email, password, balance, goal, role)
KEY(email)
VALUES ('Admin', 'try@gmail.com', '1234', 0, 0, 'ADMIN');
