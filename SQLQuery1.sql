CREATE DATABASE ReseauMarketing_DDB;
GO
USE ReseauMarketing;
GO

CREATE TABLE clients (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nom NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE relations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    parrain_id INT NOT NULL,
    filleul_id INT NOT NULL
);
GO
CREATE TABLE achats (
    id INT IDENTITY(1,1) PRIMARY KEY,
    client_id INT NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    date_achat DATE
);
GO

INSERT INTO clients (nom) VALUES
('Alice'),
('Bob'),
('Charlie'),
('David'),
('Emma'),
('Frank'),
('Grace'),
('Henry');
GO
INSERT INTO relations (parrain_id, filleul_id) VALUES
(1,2),
(2,3),
(3,4),
(1,5),
(5,6),
(6,7),
(2,8),
(4,7),
(3,6),
(5,8);
GO


INSERT INTO achats (client_id, montant, date_achat) VALUES
(2,200,'2025-01-10'),
(3,150,'2025-01-11'),
(4,350,'2025-01-12'),
(5,100,'2025-01-13'),
(6,220,'2025-01-14'),
(7,180,'2025-01-15'),
(8,90,'2025-01-16'),
(3,120,'2025-01-17'),
(2,80,'2025-01-18'),
(4,200,'2025-01-19'),
(6,300,'2025-01-20'),
(5,140,'2025-01-21'),
(7,160,'2025-01-22'),
(8,210,'2025-01-23'),
(1,500,'2025-01-24');
GO



SELECT 
    p.nom AS parrain,
    f.nom AS filleul
FROM relations r
JOIN clients p ON r.parrain_id = p.id
JOIN clients f ON r.filleul_id = f.id;
