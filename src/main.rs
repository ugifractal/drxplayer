#![feature(proc_macro_hygiene, decl_macro)]
#![feature(rustc_private)]


#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
extern crate dotenv;

use rocket_contrib::serve::StaticFiles;
use std::env;

pub mod handlers;

use crate::handlers::music_handler;
use crate::handlers::video_handler;


fn main() {
    println!("Hello, world!");
    println!("static dir {:?}", env!("CARGO_MANIFEST_DIR"));
    dotenv::dotenv().expect("Failed to read .env file");  
    rocket::ignite()
        .mount("/", routes![
            music_handler::index, music_handler::get,
            video_handler::index, video_handler::get,
            ])
        .mount("/", StaticFiles::from("public"))
        .launch();
}
