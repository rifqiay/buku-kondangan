-- Active: 1673150891911@@127.0.0.1@5432@kondanganApp


CREATE Table users(
    id VARCHAR PRIMARY KEY,
    nama VARCHAR(50),
    email VARCHAR(50),
    nomorTelepon VARCHAR(13),
    kota VARCHAR(50),
    password VARCHAR(255),
    photo VARCHAR(255)
);

CREATE Table uang(
    id VARCHAR PRIMARY KEY,
    nama VARCHAR(100),
    alamat VARCHAR(100),
    jumlah INT,
    users_id VARCHAR,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE Table barang(
    id VARCHAR PRIMARY KEY,
    nama VARCHAR(100),
    alamat VARCHAR(100),
    barang TEXT,
    users_id VARCHAR,
    FOREIGN KEY (users_id) REFERENCES users(id)
);