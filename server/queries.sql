-- Crear la tabla de Usuarios con validaciones y campo created_at
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar TEXT DEFAULT 'https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=Luna',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de creación
  CONSTRAINT unique_email UNIQUE (email)
);

-- Crear la tabla de Tareas con validaciones y campo created_at
CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de creación
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);
