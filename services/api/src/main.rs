use std::env;
use std::sync::Arc;
use tokio::sync::oneshot;
use tracing::{info, error, warn};
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

    // Channel for shutdown signal
    let (shutdown_tx, shutdown_rx) = oneshot::channel::<()>();
    let shutdown_tx = Arc::new(std::sync::Mutex::new(Some(shutdown_tx)));
    setup_signal_handlers(Arc::clone(&shutdown_tx));

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
    let server = axum::serve(listener, app).with_graceful_shutdown(async {
        // Wait for shutdown signal
        let _ = shutdown_rx.await;
    });

    info!("API Server is running on {}", local_addr);
    
    if let Err(err) = server.await {
        error!("Server error: {:?}", err);
    }
    info!("Server has been gracefully shut down");
}

fn setup_signal_handlers(shutdown_tx: Arc<std::sync::Mutex<Option<oneshot::Sender<()>>>>) {
    ctrlc::set_handler(move || {
        let mut tx_guard = shutdown_tx.lock().unwrap();
        if let Some(tx) = tx_guard.take() {
            info!("Received termination signal, shutting down gracefully...");
            let _ = tx.send(());
        } else {
            warn!("Forced shutdown initiated. Some operations may not complete properly.");
            std::process::exit(1);
        }
    }).expect("Error setting Ctrl-C handler");
}
