-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Bulan Mei 2024 pada 10.28
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `barangs`
--

CREATE TABLE `barangs` (
  `id_barang` int(11) NOT NULL,
  `nama_barang` varchar(255) DEFAULT NULL,
  `jenis` enum('jawa','sunda','betawi','papua','sulawesi','bali') DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `barangs`
--

INSERT INTO `barangs` (`id_barang`, `nama_barang`, `jenis`, `deskripsi`, `gambar`, `harga`, `createdAt`, `updatedAt`) VALUES
(1, 'baju batik', 'jawa', 'batik', 'image-1714366094649-Screenshot 2024-04-29 104048.png', 120000, '2024-04-29 04:45:28', '2024-04-29 04:48:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksis`
--

CREATE TABLE `detail_transaksis` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) DEFAULT NULL,
  `id_barang` int(11) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `detail_transaksis`
--

INSERT INTO `detail_transaksis` (`id_detail_transaksi`, `id_transaksi`, `id_barang`, `harga`, `jumlah`, `createdAt`, `updatedAt`) VALUES
(7, 7, 1, 120000, 5, '2024-05-04 06:54:20', '2024-05-04 06:54:20'),
(8, 2, 1, 120000, 1, '2024-05-15 11:45:49', '2024-05-15 11:45:49'),
(12, 3, 1, 120000, 9, '2024-05-15 12:43:49', '2024-05-15 12:43:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240429042544-create-user.js'),
('20240429043306-create-baju.js'),
('20240429043953-create-barang.js'),
('20240502010352-create-detail-transaksi.js'),
('20240502011632-create-transaksi.js'),
('20240515105423-create-transaksi.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksis`
--

CREATE TABLE `transaksis` (
  `id_transaksi` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `nama_pelanggan` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `status` enum('diproses','dikirim','diterima') DEFAULT NULL,
  `tgl_transaksi` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksis`
--

INSERT INTO `transaksis` (`id_transaksi`, `id_user`, `nama_pelanggan`, `alamat`, `status`, `tgl_transaksi`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'rere', 'malang kota', 'diproses', '2024-05-02 00:00:00', '2024-05-15 11:45:49', '2024-05-15 11:45:49'),
(3, 3, 'Niel', 'Kota Malang', 'diterima', '2024-05-02 00:00:00', '2024-05-15 11:53:19', '2024-05-15 12:43:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` enum('pelanggan','admin','manager') DEFAULT NULL,
  `tlp` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tgl_lahir` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nama_user`, `username`, `role`, `tlp`, `password`, `tgl_lahir`, `createdAt`, `updatedAt`) VALUES
(1, 'Chika', 'chika', 'manager', '08123456889', 'manager', '2005-08-23 00:00:00', '2024-04-29 04:29:48', '2024-05-01 04:44:03'),
(3, 'Rere', 'rere', 'admin', '08123486889', 'admin', '2001-08-23 00:00:00', '2024-05-01 03:40:08', '2024-05-01 03:40:08'),
(4, 'Nabila', 'nabila', 'manager', '086788765432', '12345', '2002-02-02 00:00:00', '2024-05-01 04:08:54', '2024-05-01 04:08:54'),
(7, 'Niel', 'nielaja', 'pelanggan', '081234567898', '111', '1995-01-01 00:00:00', '2024-05-01 04:30:04', '2024-05-01 04:30:04'),
(8, 'jasmine', 'pelanggan', 'pelanggan', '086788765432', 'jasmine', '1995-01-01 00:00:00', '2024-05-01 04:36:02', '2024-05-01 04:44:43'),
(9, 'bambang', 'rizal', 'admin', '0812345678', 'admin', '2003-08-09 00:00:00', '2024-05-01 04:46:26', '2024-05-04 10:55:30'),
(11, 'Rere', 'revarahayu', 'pelanggan', '08123486889', '12345', '2001-08-23 00:00:00', '2024-05-15 12:56:50', '2024-05-15 12:56:50');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `barangs`
--
ALTER TABLE `barangs`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indeks untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  ADD PRIMARY KEY (`id_detail_transaksi`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `barangs`
--
ALTER TABLE `barangs`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `detail_transaksis`
--
ALTER TABLE `detail_transaksis`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `transaksis`
--
ALTER TABLE `transaksis`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
