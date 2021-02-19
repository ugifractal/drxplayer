#![feature(proc_macro_hygiene, decl_macro)]
#![feature(rustc_private)]


#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
extern crate dotenv;

use rocket_contrib::serve::{StaticFiles, Options};
use std::env;

pub mod handlers;
pub mod cors;

use crate::handlers::music_handler;
use crate::handlers::video_handler;
use crate::handlers::setting_handler;


fn main() {
    println!("Hello, world!");
    println!("static dir {:?}", env!("CARGO_MANIFEST_DIR"));
    let options = Options::Index | Options::DotFiles;// | Options::NormalizeDirs;
    dotenv::dotenv().expect("Failed to read .env file");
    let fe = env::var("FRONTEND_FOLDER").unwrap();
    let fe_build = env::var("FRONTEND_FOLDER").unwrap() + "/build"; 
    rocket::ignite()
        .attach(cors::CorsFairing)
        .mount("/", routes![
            music_handler::index, music_handler::get,
            video_handler::index, video_handler::get,
            setting_handler::set_brightness, setting_handler::get_brightness,
            ])
        .mount("/build", StaticFiles::from(fe_build).rank(-2))
        .mount("/ready", StaticFiles::from(fe).rank(-1))
        .mount("/", StaticFiles::from("public").rank(0))
        .launch();
}
