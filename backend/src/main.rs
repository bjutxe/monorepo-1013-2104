use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;

// 受け取るJSONの構造体
#[derive(Deserialize)]
struct HelloInput {
	name: String,
}

// POST /api/hello エンドポイント
#[post("/api/hello")]
async fn say_hello(input: web::Json<HelloInput>) -> impl Responder {
	let response_message = format!("Hello, {}!", input.name);
	println!("Received name: {}", input.name);
	HttpResponse::Ok().json(serde_json::json!({ "message": response_message }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
	println!("Starting server at http://0.0.0.0:8080");
	HttpServer::new(|| {
		let cors = Cors::default()
			.allow_any_origin()
			.allow_any_method()
			.allow_any_header();
		
		App::new()
			.wrap(cors)
			.service(say_hello)
	})
	.bind(("0.0.0.0", 8080))?
	.run()
	.await
}
