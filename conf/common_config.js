// データベース接続情報
exports.connectionString = process.env.DATABASE_URL
        || "tcp://postgres:postgres@localhost:5432/rental_manage";
