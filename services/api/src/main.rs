use std::env;
use tracing::{info};
use tracing_subscriber::EnvFilter;
mod router;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env()
                .or_else(|_| EnvFilter::try_new("info,axum_tracing_example=error,tower_http=warn"))
                .unwrap(),
        )
        .with_target(false)
        .compact()
        .init();

    let app = router::create_app();
    let host = env::var("HOST").unwrap_or("0.0.0.0".to_string());
    let port = env::var("PORT").unwrap_or("3000".to_string());

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind(format!("{}:{}", host, port))
        .await
        .unwrap();
    let local_addr = listener.local_addr().unwrap();
    let server = axum::serve(listener, app);

    info!("API Server is running on {}", local_addr);
    server.await.unwrap();
}
