const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 اطلاعات ورود پنل مدیریت
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "6219861953403473";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "talon-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// بررسی ورود ادمین
function requireAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({
      error: "دسترسی غیرمجاز"
    });
  }

  next();
}

// ورود
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {
    req.session.admin = true;

    return res.json({
      success: true,
      message: "ورود موفق بود"
    });
  }

  res.status(401).json({
    success: false,
    error: "نام کاربری یا رمز عبور اشتباه است"
  });
});

// خروج
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true
    });
  });
});

// بررسی وضعیت ورود
app.get("/api/me", (req, res) => {
  res.json({
    loggedIn: !!req.session.admin
  });
});

// ---------------- NEWS ----------------

app.get("/api/news", (req, res) => {
  res.json([]);
});

app.post("/api/news", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.put("/api/news/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.delete("/api/news/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

// ---------------- GAMES ----------------

app.get("/api/games", (req, res) => {
  res.json([]);
});

app.post("/api/games", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.put("/api/games/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.delete("/api/games/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

// ---------------- STANDINGS ----------------

app.get("/api/standings", (req, res) => {
  res.json([]);
});

app.post("/api/standings", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.put("/api/standings/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.delete("/api/standings/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

// ---------------- HONORS ----------------

app.get("/api/honors", (req, res) => {
  res.json([]);
});

app.post("/api/honors", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.put("/api/honors/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

app.delete("/api/honors/:id", requireAdmin, (req, res) => {
  res.json({
    success: true
  });
});

// ---------------- WEBSITE ----------------

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TALON running on port ${PORT}`);
});
