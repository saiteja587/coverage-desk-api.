-- Coverage Desk — MySQL schema
-- Run this once in MySQL Workbench (or via the Aiven console's SQL editor)
-- after connecting to your Aiven MySQL service.

CREATE DATABASE IF NOT EXISTS coverage_desk
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE coverage_desk;

CREATE TABLE IF NOT EXISTS calls (
  id            VARCHAR(20)  PRIMARY KEY,
  call_date     DATE         NOT NULL,
  time_text     VARCHAR(40)  NOT NULL DEFAULT '',
  candidate     VARCHAR(200) NOT NULL DEFAULT '',
  company       VARCHAR(200) NOT NULL DEFAULT '',
  round_text    VARCHAR(100) NOT NULL DEFAULT '',
  duration      VARCHAR(40)  NOT NULL DEFAULT '',
  is_woi        TINYINT(1)   NOT NULL DEFAULT 0,
  assignee      VARCHAR(100) NOT NULL DEFAULT '',
  country       VARCHAR(20)  NOT NULL DEFAULT 'USA',
  doubts_json   TEXT,
  raw_text      TEXT,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_call_date (call_date),
  INDEX idx_candidate (candidate),
  INDEX idx_company (company)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS roster (
  id          VARCHAR(20)  PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  team        VARCHAR(100) NOT NULL,
  is_advanced TINYINT(1)   NOT NULL DEFAULT 0,
  updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notes (
  id          VARCHAR(20)  PRIMARY KEY,
  note_date   DATE         NOT NULL,
  note_text   TEXT         NOT NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_note_date (note_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS day_status (
  the_date    DATE         PRIMARY KEY,
  finalized   TINYINT(1)   NOT NULL DEFAULT 0
) ENGINE=InnoDB;
