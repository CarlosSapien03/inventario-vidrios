const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");

// Ruta de login
router.post("/login", async (req, res) => {
  try {
    const { nombre, apellido, password } = req.body;

    if (!nombre || !apellido || !password) {
      return res.status(400).json({
        error: "Nombre, apellido y contraseña son requeridos",
      });
    }

    const { data: usuarios, error: findError } = await supabase
      .from("usuarios")
      .select("id, nombre, apellido, password_hash")
      .eq("nombre", nombre)
      .eq("apellido", apellido)
      .limit(1);

    if (findError) {
      return res.status(500).json({ error: "Error al buscar usuario" });
    }

    const usuario = usuarios && usuarios[0];
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const ok = await bcrypt.compare(password, usuario.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      user: { id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido },
      session: { user: { id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido } },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// Ruta de registro
router.post("/register", async (req, res) => {
  try {
    const { password, nombre, apellido } = req.body;

    if (!nombre || !apellido || !password) {
      return res.status(400).json({
        error: "Nombre, apellido y contraseña son requeridos",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const { data: existentes, error: checkError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("nombre", nombre)
      .eq("apellido", apellido)
      .limit(1);

    if (checkError) {
      return res.status(500).json({ error: "Error al verificar usuario existente" });
    }

    if (existentes && existentes.length > 0) {
      return res.status(400).json({ error: "Ya existe un usuario con ese nombre y apellido" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const { data: inserted, error: insertError } = await supabase
      .from("usuarios")
      .insert({ nombre, apellido, password_hash: passwordHash })
      .select("id, nombre, apellido")
      .single();

    if (insertError) {
      return res.status(400).json({ error: "Error al registrar usuario" });
    }

    res.json({ message: "Registro exitoso", user: inserted });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// Ruta de logout
router.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({
        error: "Error al cerrar sesión",
        details: error.message,
      });
    }

    res.json({
      message: "Sesión cerrada exitosamente",
    });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// Verificar sesión actual
router.get("/session", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return res.status(401).json({
        error: "No hay sesión activa",
      });
    }

    res.json({
      session: data.session,
      user: data.session?.user || null,
    });
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
