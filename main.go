package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "github.com/jackc/pgx/v4"
)

func main() {
    // Параметры подключения к базе данных
    // Имена пользователей, пароли и имена баз данных должны совпадать с теми, что указаны в docker-compose.yml
    dbUser := "myuser"
    dbPassword := "mypassword"
    dbName := "mydatabase"
    dbHost := "localhost" // Или "127.0.0.1"
    dbPort := "5432"      // Порт, который вы пробросили в docker-compose.yml

    // Формируем строку подключения
    // Формат: "postgres://user:password@host:port/dbname?sslmode=disable"
    connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
        dbUser, dbPassword, dbHost, dbPort, dbName)

    // Устанавливаем соединение с базой данных
    var conn *pgx.Conn
    var err error
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second) // Таймаут для соединения
    defer cancel()

    for i := 0; i < 10; i++ { // Попытка подключения с задержкой
        conn, err = pgx.Connect(ctx, connStr)
        if err != nil {
            log.Printf("Не удалось подключиться к базе данных, попытка %d: %v", i+1, err)
            time.Sleep(2 * time.Second) // Ждем перед следующей попыткой
            continue
        }
        log.Println("Успешное подключение к базе данных!")
        break // Выходим из цикла при успешном подключении
    }

    if conn == nil {
        log.Fatalf("Не удалось подключиться к базе данных после нескольких попыток: %v", err)
    }
    defer conn.Close(context.Background()) // Закрываем соединение при выходе из функции

    // Пример выполнения запроса (например, проверка версии PostgreSQL)
    var version string
    err = conn.QueryRow(context.Background(), "SELECT version()").Scan(&version)
    if err != nil {
        log.Fatalf("Ошибка при выполнении запроса: %v", err)
    }
    fmt.Println("Версия PostgreSQL:", version)

    // Здесь вы можете добавить логику работы с базой данных:
    // - Создание таблиц
    // - Вставка данных
    // - Чтение данных
    // - Обновление/Удаление данных

    fmt.Println("Приложение успешно работает!")
}
