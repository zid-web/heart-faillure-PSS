-- CardioParcours Sarthe Database Schema
-- Phase 1 MVP

-- Clinical Decision Trees
CREATE TABLE IF NOT EXISTS decision_trees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  version VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BNP and Clinical Scores
CREATE TABLE IF NOT EXISTS clinical_scores (
  id SERIAL PRIMARY KEY,
  patient_id VARCHAR(50),
  score_type VARCHAR(50),
  value DECIMAL(10, 2),
  unit VARCHAR(50),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Provider Directory
CREATE TABLE IF NOT EXISTS providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  speciality VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Titration Pathway
CREATE TABLE IF NOT EXISTS titration_pathways (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  drug_name VARCHAR(100),
  starting_dose VARCHAR(50),
  target_dose VARCHAR(50),
  titration_steps TEXT,
  monitoring_interval_days INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Professional Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  profession VARCHAR(100),
  license_number VARCHAR(100),
  facility VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient Records (simplified for MVP)
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  diagnosis_date DATE,
  ejection_fraction DECIMAL(5, 2),
  comorbidities TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_providers_type ON providers(type);
CREATE INDEX idx_clinical_scores_type ON clinical_scores(score_type);
CREATE INDEX idx_patients_ef ON patients(ejection_fraction);
