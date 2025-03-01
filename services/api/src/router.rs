use axum::{Router, routing::{get}};
use tower_http::trace::TraceLayer;

pub fn create_app() -> Router {
    Router::new()
        // 📌 Command
        // ...
        // 📌 Query
        .route("/", get(|| async { "Hello, World!" }))
        // ...
        .layer(TraceLayer::new_for_http())
}