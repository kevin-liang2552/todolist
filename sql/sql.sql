CREATE TABLE `tasks` (
  `id` VARCHAR(50) NOT NULL,
  `task` VARCHAR(255) NOT NULL,
  `status` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id`));
