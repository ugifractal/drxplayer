use std::fs;
use std::env;
use std::path::Path;
use rocket_contrib::json::{Json, JsonValue};
use rocket::response::NamedFile;
use rocket::response::status::NotFound;


#[get("/videos")]
pub fn index() -> JsonValue {
  let files = get_list_files();
  
  json!({
    "status": "ok",
    "files": files,
  })
}

#[get("/videos/<index>")]
pub fn get(index: usize) -> Result<NamedFile, NotFound<String>>{
  let files = get_list_files();
  let file = &files[index];
  let dir = env::var("DEFAULT_FOLDER").unwrap();
  //let path = Path::new(&dir).join(file);
  let path = Path::new(&file);
  let uu = NamedFile::open(&path);
  println!("{:?}", uu);
  NamedFile::open(&path).map_err(|_| NotFound(format!("Bad path: {}", "")))
}

fn get_list_files() -> Vec<String>{
  let dir = env::var("DEFAULT_VIDEO_FOLDER").unwrap();
  let paths = fs::read_dir(dir).unwrap();
  let mut files = Vec::new();
  for path in paths {
    let name = path.unwrap().path().display().to_string();
    if (name.ends_with("mp4") || name.ends_with("avi")){
      files.push(name.to_string());
    }
    
    //println!("Name: {}", path.unwrap().path().display())
  }
  files
}