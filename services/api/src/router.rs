use axum::{Router, routing::{get}};

pub fn create_app() -> Router {
    Router::new()
        // 📌 Command
        // ...
        // 📌 Query
        .route("/", get(|| async { "Hello, World!" }))
        // ...
}