const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
    // Create jobs table
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

    // Insert sample data
    const jobs = [
        {
            title: 'Senior Backend Developer',
            description: 'Разработка высоконагруженных сервисов и API, оптимизация производительности, участие в архитектурных решениях',
            salary: 'от 250 000 руб.',
            requirements: 'Опыт разработки на Node.js от 3 лет, знание SQL/NoSQL, опыт работы с микросервисной архитектурой, понимание принципов REST и GraphQL',
            phone: '+7 (347) 258-88-64',
            email: 'welcome@ohranamedved.ru'
        },
        {
            title: 'Frontend Developer (React)',
            description: 'Разработка пользовательских интерфейсов, создание компонентов, оптимизация производительности фронтенда',
            salary: 'от 200 000 руб.',
            requirements: 'Опыт работы с React от 2 лет, знание TypeScript, опыт работы с Redux/MobX, понимание принципов оптимизации производительности',
            phone: '+7 (347) 258-88-64',
            email: 'welcome@ohranamedved.ru'
        },
        {
            title: 'DevOps Engineer',
            description: 'Настройка и поддержка CI/CD процессов, автоматизация деплоя, мониторинг и обеспечение отказоустойчивости систем',
            salary: 'от 280 000 руб.',
            requirements: 'Опыт работы с Docker, Kubernetes, AWS/GCP, знание Terraform, опыт настройки мониторинга (Prometheus, Grafana)',
            phone: '+7 (347) 258-88-64',
            email: 'welcome@ohranamedved.ru'
        },
        {
            title: 'Data Scientist',
            description: 'Разработка и внедрение алгоритмов машинного обучения, анализ данных, создание предсказательных моделей',
            salary: 'от 300 000 руб.',
            requirements: 'Опыт работы с Python, знание библиотек для ML (scikit-learn, TensorFlow, PyTorch), опыт работы с большими данными, понимание статистики',
            phone: '+7 (347) 258-88-64',
            email: 'welcome@ohranamedved.ru'
        },
        {
            title: 'QA Automation Engineer',
            description: 'Разработка и поддержка автоматизированных тестов, создание тестовых сценариев, обеспечение качества продукта',
            salary: 'от 180 000 руб.',
            requirements: 'Опыт автоматизации тестирования, знание Selenium/Cypress, опыт работы с CI/CD, понимание принципов тестирования',
            phone: '+7 (347) 258-88-64',
            email: 'welcome@ohranamedved.ru'
        }
    ];

    const stmt = db.prepare('INSERT INTO jobs (title, description, salary, requirements, phone, email) VALUES (?, ?, ?, ?, ?, ?)');
    
    jobs.forEach(job => {
        stmt.run(
            job.title,
            job.description,
            job.salary,
            job.requirements,
            job.phone,
            job.email
        );
    });

    stmt.finalize();
});

db.close(); 