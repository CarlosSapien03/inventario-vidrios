const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos' 
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas',
        details: error.message 
      });
    }

    res.json({
      message: 'Login exitoso',
      user: data.user,
      session: data.session
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
});

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos' 
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre || ''
        }
      }
    });

    if (error) {
      return res.status(400).json({ 
        error: 'Error al registrar usuario',
        details: error.message 
      });
    }

    res.json({
      message: 'Registro exitoso',
      user: data.user
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
});

// Ruta de logout
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ 
        error: 'Error al cerrar sesión',
        details: error.message 
      });
    }

    res.json({
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
});

// Verificar sesión actual
router.get('/session', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return res.status(401).json({ 
        error: 'No hay sesión activa' 
      });
    }

    res.json({
      session: data.session,
      user: data.session?.user || null
    });

  } catch (error) {
    console.error('Error al verificar sesión:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
});

module.exports = router;
