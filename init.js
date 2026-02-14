const pool = require("./db");

const createTables = async () => {
    const queries = [
        // Create users table
        `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `,

        // Create index for better query performance
        `
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        `,

        `
        CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
        `,
    ];

    try {
        console.log("Starting database initialization...");

        for (const query of queries) {
            await pool.query(query);
            console.log("✓ Query executed successfully");
        }

        console.log("✓ All tables created successfully!");
    } catch (error) {
        console.error("✗ Error creating tables:", error);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

// Run the initialization
createTables();
