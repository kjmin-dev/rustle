use std::env;
use tracing::{info, error};
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

    let addr = format!("{}:{}", host, port);
    let listener = match tokio::net::TcpListener::bind(&addr).await {
        Ok(listener) => listener,
        Err(err) => {
            if err.kind() == std::io::ErrorKind::AddrInUse {
                error!("Port {} is already in use. Try using a different port.", port);
            } else if err.kind() == std::io::ErrorKind::PermissionDenied {
                error!("Permission denied when binding to port {}. Try using a port number > 1024 or run with elevated privileges.", port);
            } else {
                error!("Failed to bind to {}: {:?}", addr, err);
            }
            std::process::exit(1);
        }
    };

    let local_addr = listener.local_addr().unwrap();
    let server = axum::serve(listener, app);

    info!("API Server is running on {}", local_addr);
    server.await.unwrap();
}
