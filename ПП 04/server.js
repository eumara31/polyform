const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
const db = new sqlite3.Database('database.sqlite');

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        salary TEXT NOT NULL,
        requirements TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Helper function to run SQL queries
const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

// Routes
app.get('/', async (req, res) => {
    try {
        const jobs = await dbAll('SELECT * FROM jobs');
        res.render('index', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/admin', async (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/login');
    }
    try {
        const jobs = await dbAll('SELECT * FROM jobs');
        res.render('admin', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === '123') {
        req.session.isAdmin = true;
        res.redirect('/admin');
    } else {
        res.render('login', { error: 'Неверный пароль' });
    }
});

app.post('/jobs', async (req, res) => {
    if (!req.session.isAdmin) {
        return res.status(403).send('Forbidden');
    }
    
    const { title, description, salary, requirements, phone, email } = req.body;
    try {
        await dbRun(
            'INSERT INTO jobs (title, description, salary, requirements, phone, email) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, salary, requirements, phone, email]
        );
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.delete('/jobs/:id', async (req, res) => {
    if (!req.session.isAdmin) {
        return res.status(403).send('Forbidden');
    }
    
    try {
        await dbRun('DELETE FROM jobs WHERE id = ?', [req.params.id]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 