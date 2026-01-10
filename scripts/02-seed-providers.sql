-- Seed Provider Data for CardioParcours MVP

-- Cardiologists
INSERT INTO providers (name, type, speciality, phone, email, address, city, postal_code, available) VALUES
('Dr. Sophie Martin', 'cardiologist', 'Cardiologie - Insuffisance Cardiaque', '02 43 50 50 50', 's.martin@cardio-sarthe.fr', '123 rue de la Paix', 'Le Mans', '72000', true),
('Dr. Pierre Leblanc', 'cardiologist', 'Cardiologie', '02 43 51 51 51', 'p.leblanc@cardio-sarthe.fr', '456 avenue du Commerce', 'Alençon', '61000', true),
('Dr. Marie Moreau', 'cardiologist', 'Cardiologie - IC', '02 43 55 55 55', 'm.moreau@cardio-sarthe.fr', '789 rue de la Gare', 'Le Mans', '72000', true);

-- PSS Secretary
INSERT INTO providers (name, type, speciality, phone, email, address, city, postal_code, available) VALUES
('Secrétariat PSS', 'secretary', 'Coordination des soins', '02 43 52 52 52', 'contact@pss-sarthe.fr', '789 rue du Centre', 'Le Mans', '72000', true);

-- Specialized Nurses (IPA)
INSERT INTO providers (name, type, speciality, phone, email, address, city, postal_code, available) VALUES
('IPA Carole Dupont', 'ipa', 'Infirmière Spécialisée en IC', '02 43 53 53 53', 'c.dupont@ipa-sarthe.fr', '321 boulevard Saint-Michel', 'Le Mans', '72000', true),
('IPA Anne Moreau', 'ipa', 'Infirmière Coordinatrice', '02 43 56 56 56', 'a.moreau@ipa-sarthe.fr', '654 avenue de la République', 'Le Mans', '72000', true);

-- Cardiac Rehab Center
INSERT INTO providers (name, type, speciality, phone, email, address, city, postal_code, available) VALUES
('Centre SOSAN', 'center', 'Rééducation cardiaque', '02 43 54 54 54', 'info@sosan-sarthe.fr', '654 chemin du Stade', 'Le Mans', '72000', true);

-- Emergency
INSERT INTO providers (name, type, speciality, phone, email, address, city, postal_code, available) VALUES
('Urgences CHU', 'emergency', 'Urgences 24/7', '02 43 43 43 43', 'urgences@chu-sarthe.fr', 'Hôpital du Centre', 'Le Mans', '72000', true);

-- Insert sample decision trees
INSERT INTO decision_trees (name, description, category, version) VALUES
('Diagnostic d''Insuffisance Cardiaque', 'Arbre décisionnel pour le diagnostic basé sur ESC/ACC', 'diagnostic', '1.0'),
('Classification FEVG', 'Classification selon la fraction d''éjection du ventricule gauche', 'classification', '1.0'),
('Traitement IC Réduite', 'Parcours thérapeutique pour FEVG < 40%', 'treatment', '1.0'),
('Traitement IC Conservée', 'Parcours thérapeutique pour FEVG ≥ 50%', 'treatment', '1.0');

-- Insert sample titration pathways
INSERT INTO titration_pathways (name, drug_name, starting_dose, target_dose, titration_steps, monitoring_interval_days) VALUES
('ACE Inhibiteur', 'Enalapril', '2.5mg 1x/jour', '10mg 1x/jour', '[{\"step\": 1, \"dose\": \"2.5mg\"}, {\"step\": 2, \"dose\": \"5mg\"}, {\"step\": 3, \"dose\": \"10mg\"}]', 7),
('Bêta-bloquant', 'Bisoprolol', '1.25mg 1x/jour', '10mg 1x/jour', '[{\"step\": 1, \"dose\": \"1.25mg\"}, {\"step\": 2, \"dose\": \"2.5mg\"}, {\"step\": 3, \"dose\": \"5mg\"}, {\"step\": 4, \"dose\": \"10mg\"}]', 7),
('MRA', 'Spironolactone', '12.5mg 1x/jour', '50mg 1x/jour', '[{\"step\": 1, \"dose\": \"12.5mg\"}, {\"step\": 2, \"dose\": \"25mg\"}, {\"step\": 3, \"dose\": \"50mg\"}]', 3),
('SGLT2i', 'Empagliflozin', '10mg 1x/jour', '10mg 1x/jour', '[{\"step\": 1, \"dose\": \"10mg\"}]', 1);
